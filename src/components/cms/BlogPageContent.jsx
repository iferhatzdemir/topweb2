"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useLocale } from "@/hooks/useLocale";
import { formatDate } from "@/i18n/formatters";
import { useCmsBlogPosts } from "@/lib/cms/hooks";
import styles from "./BlogPageContent.module.css";

const sanitizeHtml = (html) => {
  if (!html) {
    return "";
  }
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const BlogCard = ({ post, locale }) => {
  const excerpt = sanitizeHtml(post.excerpt).slice(0, 160);
  return (
    <Card
      key={post.id}
      title={post.title}
      subtitle={formatDate(post.publishedAt, locale)}
      actions={
        <Button as={Link} href={`/blogs/${post.slug}`} size="sm">
          Yazıyı Aç
        </Button>
      }
      padding="lg"
    >
      <div className={styles.postContent}>
        <p className={styles.postExcerpt}>
          {excerpt ? `${excerpt}…` : "İçerik kısa açıklaması hazırlanıyor."}
        </p>
        <div className={styles.postMeta}>
          <Badge variant="outline">Blog</Badge>
          <span>{(post.blocks ?? []).length} blok</span>
        </div>
      </div>
    </Card>
  );
};

const BlogPageContent = ({ initialPosts }) => {
  const { locale } = useLocale();
  const { data: posts, isLoading } = useCmsBlogPosts(initialPosts, {
    initialData: initialPosts,
  });

  if (isLoading && !posts?.length) {
    return (
      <section className={styles.empty}>
        <p>Blog yazıları yükleniyor…</p>
      </section>
    );
  }

  if (!posts?.length) {
    return (
      <section className={styles.empty}>
        <p>Henüz yayınlanmış blog içeriği bulunmuyor.</p>
      </section>
    );
  }

  return (
    <section className={styles.root}>
      <div className={styles.intro}>
        <h1>Blog</h1>
        <p>
          Mağazamızdan güncel içerikler, tarifler ve sürdürülebilir yaşam ipuçları.
        </p>
      </div>
      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
};

export default BlogPageContent;
