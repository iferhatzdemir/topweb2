"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency } from "@/i18n/formatters";
import { useCmsCategory, useCmsCategories } from "@/lib/cms/hooks";
import styles from "./CategoryPageContent.module.css";

const ProductCard = ({ product, locale }) => {
  if (!product) {
    return null;
  }
  const priceLabel = formatCurrency(product.price, locale, {
    currency: product.currency || "TRY",
  });

  return (
    <Card
      variant="outline"
      title={product.title}
      subtitle={product.summary}
      padding="lg"
      actions={
        <Button as={Link} href={`/products/${product.id}`} size="sm">
          İncele
        </Button>
      }
    >
      <div className={styles.productMeta}>
        <div className={styles.productMedia}>
          {product.mediaUrl ? (
            <Image
              src={product.mediaUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          ) : null}
        </div>
        <span className={styles.productPrice}>{priceLabel}</span>
        <div className={styles.controls}>
          {(product.categories ?? []).map((category) => (
            <Badge key={category?.id} variant="outline">
              {category?.name}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

const CategoryPageContent = ({ slug, initialData }) => {
  const { locale } = useLocale();
  const { data: categoryData, isLoading, error } = useCmsCategory(
    slug,
    initialData,
    { initialData }
  );
  const { data: categories } = useCmsCategories();

  if (isLoading && !categoryData) {
    return (
      <section className={styles.empty}>
        <p>Kategori ürünleri yükleniyor…</p>
      </section>
    );
  }

  if (!categoryData || error) {
    return (
      <section className={styles.empty}>
        <p>
          {error
            ? "Kategori verileri alınamadı."
            : "Seçili kategori için ürün bulunamadı."}
        </p>
      </section>
    );
  }

  const { category, products } = categoryData;

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{category?.name || "Kategori"}</h1>
          {category?.slug ? (
            <Badge variant="muted">{category.slug}</Badge>
          ) : null}
        </div>
        {category?.description ? (
          <p className={styles.subtitle}>{category.description}</p>
        ) : null}
        <div className={styles.controls}>
          {(categories || []).map((item) => (
            <Button
              key={item.id}
              as={Link}
              href={`/categories/${item.slug}`}
              tone={item.slug === slug ? "solid" : "outline"}
              size="sm"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </header>
      {products?.length ? (
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      ) : (
        <section className={styles.empty}>
          <p>Bu kategoride yayınlanmış ürün bulunmuyor.</p>
        </section>
      )}
    </section>
  );
};

export default CategoryPageContent;
