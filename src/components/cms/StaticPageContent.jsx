"use client";

import { useCmsStaticPage } from "@/lib/cms/hooks";
import styles from "./StaticPageContent.module.css";

const StaticPageContent = ({ slug, initialPage }) => {
  const { data: page, isLoading, error } = useCmsStaticPage(slug, initialPage, {
    initialData: initialPage,
  });

  if (isLoading && !page) {
    return (
      <section className={styles.empty}>
        <p>Sayfa yükleniyor…</p>
      </section>
    );
  }

  if (!page || error) {
    return (
      <section className={styles.empty}>
        <p>İstenen içerik bulunamadı veya yayınlanmamış olabilir.</p>
      </section>
    );
  }

  const [version] = page.versions ?? [];

  return (
    <article className={styles.root}>
      <header className={styles.header}>
        <h1>{version?.title || page.title}</h1>
        {page.seo?.description ? <p>{page.seo.description}</p> : null}
      </header>
      <section className={styles.body}>
        {version?.body ? (
          <div dangerouslySetInnerHTML={{ __html: version.body }} />
        ) : (
          <p>İçerik hazırlanıyor.</p>
        )}
      </section>
    </article>
  );
};

export default StaticPageContent;
