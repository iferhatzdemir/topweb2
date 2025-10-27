import { defaultCmsClient } from "@/lib/cms-client";

const cms = defaultCmsClient;

const safeCall = async (promise, fallback) => {
  try {
    const result = await promise;
    return result ?? fallback;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[cms] fetch failed", error);
    }
    return fallback;
  }
};

export const listProducts = async (query = {}) => {
  return safeCall(
    cms.listProducts({ status: "PUBLISHED", take: 50, ...query }),
    []
  );
};

export const getProductById = async (id) => {
  if (!id) {
    return null;
  }
  return safeCall(cms.getProduct(id), null);
};

export const listCategories = async () => {
  return safeCall(cms.listCategories(), []);
};

export const listPages = async () => {
  return safeCall(cms.listPages(), []);
};

export const getPageBySlug = async (slug) => {
  if (!slug) {
    return null;
  }
  const pages = await listPages();
  return pages.find((page) => page.slug === slug) ?? null;
};

export const getHomePage = async () => {
  const pages = await listPages();
  return (
    pages.find((page) => page.slug === "home") ||
    pages.find((page) => page.slug === "anasayfa") ||
    pages[0] ||
    null
  );
};

const collectPageBlocks = (page, type) => {
  if (!page?.blocks) {
    return [];
  }
  return page.blocks.filter((block) =>
    type ? block.type?.toLowerCase()?.includes(type) : true
  );
};

const pickPrimaryMedia = (media = []) => {
  if (!Array.isArray(media)) {
    return null;
  }
  const primary = media.find((item) => item.isPrimary) ?? media[0];
  return primary?.media?.url ?? null;
};

export const mapProductSummary = (product) => {
  if (!product) {
    return null;
  }
  const [version] = product.versions ?? [];
  return {
    id: product.id,
    slug: product.slug,
    title: version?.title ?? "",
    summary: version?.summary ?? "",
    price: version?.price ?? 0,
    currency: version?.currency ?? "TRY",
    mediaUrl: pickPrimaryMedia(product.media),
    categories: (product.categories ?? []).map((pivot) => pivot.category),
    stock: (product.variants ?? []).reduce((total, variant) => {
      const quantity = (variant.stockItems ?? []).reduce(
        (sum, stock) => sum + (stock.quantity ?? 0) - (stock.reserved ?? 0),
        0
      );
      return total + (quantity ?? 0);
    }, 0),
    raw: product,
  };
};

export const getCategoryWithProducts = async (slug) => {
  const categories = await listCategories();
  const category = categories.find((item) => item.slug === slug) ?? null;
  if (!category) {
    return null;
  }
  const products = await listProducts();
  const filtered = products.filter((product) =>
    (product.categories ?? []).some((pivot) => pivot.category?.slug === slug)
  );
  return {
    category,
    products: filtered.map(mapProductSummary),
  };
};

export const listBlogPosts = async () => {
  const pages = await listPages();
  return pages
    .filter((page) => page.slug?.startsWith("blog"))
    .map((page) => ({
      id: page.id,
      slug: page.slug,
      title: page.title,
      excerpt: page.versions?.[0]?.body ?? "",
      blocks: collectPageBlocks(page),
      publishedAt: page.publishedAt,
    }));
};

export const getStaticPage = async (slug) => {
  return getPageBySlug(slug);
};

export const extractHeroBlock = (page) => {
  const heroBlocks = collectPageBlocks(page, "hero");
  return heroBlocks[0] ?? null;
};

export const extractContentBlocks = (page) => {
  const blocks = collectPageBlocks(page);
  return blocks.filter((block) => !block.type?.toLowerCase().includes("hero"));
};
