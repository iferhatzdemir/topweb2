"use client";

import Image from "next/image";
import Link from "next/link";
import IndexMain from "@/components/layout/main/IndexMain";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useCmsBlocks, useCmsHero, useCmsHomePage } from "@/lib/cms/hooks";
import styles from "./HomeCmsContent.module.css";

const FALLBACK_IMAGE = "/img/slider/23.png";

const ensureArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (value && typeof value === "object") {
    return Object.values(value);
  }
  return [];
};

const BlockCard = ({ block }) => {
  const content = block?.content ?? {};
  const items = ensureArray(content.items ?? content.features);

  return (
    <Card
      key={block.id}
      title={content.title || block.code}
      subtitle={content.subtitle || content.description}
      padding="lg"
    >
      {content.body ? (
        <p className={styles.blockBody}>{content.body}</p>
      ) : null}
      {items.length ? (
        <div className={styles.blockList}>
          {items.map((item, index) => (
            <Badge key={index} variant="outline">
              {typeof item === "string" ? item : item?.label || item?.title}
            </Badge>
          ))}
        </div>
      ) : null}
    </Card>
  );
};

const HeroSection = ({ block }) => {
  const content = block?.content ?? {};
  const cta = ensureArray(content.actions ?? content.cta).map((action) => ({
    label: action?.label || action?.text,
    href: action?.href || action?.url || "#",
    tone: action?.variant === "secondary" ? "outline" : "solid",
  }));
  const heroImage = content.image || content.mediaUrl || FALLBACK_IMAGE;

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {content.eyebrow ? (
          <span className={styles.heroEyebrow}>{content.eyebrow}</span>
        ) : null}
        <h1 className={styles.heroTitle}>{content.title || "Broccoli Store"}</h1>
        {content.body ? (
          <p className={styles.heroBody}>{content.body}</p>
        ) : null}
        <div className={styles.heroActions}>
          {cta.length ? (
            cta.map((action, index) => (
              <Button
                key={index}
                as={Link}
                href={action.href}
                tone={action.tone}
                size="lg"
              >
                {action.label || "Keşfet"}
              </Button>
            ))
          ) : (
            <Button as={Link} href="/shop" size="lg">
              Mağazayı İncele
            </Button>
          )}
        </div>
      </div>
      <div className={styles.heroImageWrapper}>
        <Image
          src={heroImage}
          alt={content.alt || content.title || "Hero görseli"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </section>
  );
};

const StatusBadge = ({ isValidating }) => (
  <span className={styles.statusBadge}>
    {isValidating ? "(yenileniyor)" : ""}
  </span>
);

const HomeCmsContent = ({ initialPage }) => {
  const { data: page, error, isLoading, isValidating } = useCmsHomePage(
    initialPage,
    { initialData: initialPage }
  );
  const heroBlock = useCmsHero(page);
  const blocks = useCmsBlocks(page);

  if (!page && isLoading) {
    return (
      <section className={styles.loading}>
        <h2>Mağaza içeriği yükleniyor…</h2>
        <p>CMS ile bağlantı kuruluyor.</p>
      </section>
    );
  }

  if (!page && error) {
    return (
      <section className={styles.error}>
        <h2>CMS verileri alınamadı</h2>
        <p>
          Yönetim panelinden içerik yayınlandığından ve `NEXT_PUBLIC_CMS_API_URL`
          değerinin doğru tanımlandığından emin olun.
        </p>
      </section>
    );
  }

  if (!page) {
    return <IndexMain />;
  }

  return (
    <main className={styles.root}>
      <HeroSection block={heroBlock} />
      <header>
        <h2 className={styles.blockTitle}>
          Güncel Vitrin Bölümleri
          <StatusBadge isValidating={isValidating} />
        </h2>
      </header>
      {blocks.length ? (
        <div className={styles.blocksGrid}>
          {blocks.map((block) => (
            <BlockCard key={block.id} block={block} />
          ))}
        </div>
      ) : (
        <section className={styles.empty}>
          <p>Henüz yayınlanmış vitrin bloğu bulunmuyor.</p>
        </section>
      )}
    </main>
  );
};

export default HomeCmsContent;
