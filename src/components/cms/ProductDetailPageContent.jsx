"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency, formatDate } from "@/i18n/formatters";
import {
  mapProductSummary,
  listProducts,
} from "@/lib/cms/queries";
import { useCmsProduct } from "@/lib/cms/hooks";
import { useSWRLite } from "@/lib/swr-lite/useSWRLite";
import styles from "./ProductDetailPageContent.module.css";

const ensureMediaList = (product) => {
  const media = product?.media ?? [];
  if (!Array.isArray(media) || !media.length) {
    return [];
  }
  return media.map((entry) => entry.media?.url).filter(Boolean);
};

const RelatedProducts = ({ productId, locale }) => {
  const { data: related } = useSWRLite(
    ["cms", "products", "related"],
    async () => {
      const items = await listProducts({ take: 12 });
      return items
        .filter((item) => item.id !== productId)
        .map(mapProductSummary)
        .slice(0, 4);
    },
    { staleTime: 1000 * 60 * 10 }
  );

  if (!related?.length) {
    return null;
  }

  return (
    <section>
      <h2>Benzer Ürünler</h2>
      <div className={styles.relatedGrid}>
        {related.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            subtitle={product.summary}
            actions={
              <Button as={Link} href={`/products/${product.id}`} size="sm">
                İncele
              </Button>
            }
          >
            <div className={styles.productMeta}>
              <div className={styles.thumbnail}>
                {product.mediaUrl ? (
                  <Image
                    src={product.mediaUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : null}
              </div>
              <span className={styles.productPrice}>
                {formatCurrency(product.price, locale, {
                  currency: product.currency,
                })}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

const ProductDetailPageContent = ({ productId, initialData }) => {
  const { locale } = useLocale();
  const { data: product, isLoading, error } = useCmsProduct(productId, initialData, {
    initialData,
  });

  if (isLoading && !product) {
    return (
      <section className={styles.empty}>
        <p>Ürün bilgileri yükleniyor…</p>
      </section>
    );
  }

  if (!product || error) {
    return (
      <section className={styles.empty}>
        <p>
          {error
            ? "Ürün detayları alınamadı."
            : "Aradığınız ürün yayınlanmamış olabilir."}
        </p>
      </section>
    );
  }

  const [version] = product.versions ?? [];
  const mediaList = ensureMediaList(product);
  const gallery = mediaList.length ? mediaList : ["/img/product/1.png"];
  const summary = mapProductSummary(product);
  const priceLabel = formatCurrency(version?.price ?? 0, locale, {
    currency: version?.currency ?? "TRY",
  });

  return (
    <article className={styles.root}>
      <section className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.heroImage}>
            <Image
              src={gallery[0]}
              alt={version?.title || "Ürün görseli"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          {gallery.length > 1 ? (
            <div className={styles.thumbnailStrip}>
              {gallery.slice(1, 6).map((imageUrl, index) => (
                <div key={index} className={styles.thumbnail}>
                  <Image
                    src={imageUrl}
                    alt={`${version?.title || "Ürün"} ${index + 2}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.details}>
          <div>
            <h1>{version?.title || product.slug}</h1>
            {version?.summary ? (
              <p className={styles.description}>{version.summary}</p>
            ) : null}
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>{priceLabel}</span>
            <Badge variant={summary?.stock > 0 ? "success" : "muted"}>
              {summary?.stock > 0 ? "Stokta" : "Tedarik Ediliyor"}
            </Badge>
          </div>
          <div className={styles.metaList}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Yayın Tarihi</span>
              <span>{formatDate(product.publishedAt, locale) || "-"}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Kategori</span>
              <div className={styles.controls}>
                {(summary?.categories ?? []).map((category) => (
                  <Badge key={category?.id} variant="outline">
                    {category?.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Button as={Link} href="/cart" size="lg">
            Sepete Ekle
          </Button>
        </div>
      </section>
      <section>
        <h2>Ürün Açıklaması</h2>
        <div className={styles.description}>
          {version?.description ? (
            <div dangerouslySetInnerHTML={{ __html: version.description }} />
          ) : (
            <p>Ürün açıklaması hazırlanıyor.</p>
          )}
        </div>
      </section>
      <RelatedProducts productId={product.id} locale={locale} />
    </article>
  );
};

export default ProductDetailPageContent;
