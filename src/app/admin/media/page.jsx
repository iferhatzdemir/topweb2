"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import AccessGate from "@/components/admin/AccessGate";
import { MEDIA_LIBRARY } from "@/lib/admin/mockData";
import styles from "./media.module.css";

const formatFileSize = (bytes) => {
  if (bytes >= 1_000_000) {
    return `${(bytes / 1_000_000).toFixed(1)} MB`;
  }
  if (bytes >= 1_000) {
    return `${(bytes / 1_000).toFixed(1)} KB`;
  }
  return `${bytes} B`;
};

const MediaManagerPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("all");

  const availableTags = useMemo(() => {
    const tagSet = new Set();
    MEDIA_LIBRARY.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet);
  }, []);

  const filteredMedia = useMemo(() => {
    return MEDIA_LIBRARY.filter((item) => {
      const matchesType =
        filter === "all" ? true : item.type.startsWith(filter) || item.type === filter;
      const matchesTag = tagFilter === "all" ? true : item.tags.includes(tagFilter);
      const matchesSearch = searchTerm
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesType && matchesTag && matchesSearch;
    });
  }, [filter, tagFilter, searchTerm]);

  return (
    <AccessGate
      permission="media.manage"
      fallback={(
        <div className={styles.denied}>
          <Card variant="outlined">
            <h1>Medya erişimi yok</h1>
            <p>Bu bölümü görmek için medya yönetimi izni gereklidir.</p>
          </Card>
        </div>
      )}
    >
      <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Medya Merkezi</h1>
          <p>İmzalı URL üretin, varyantları kontrol edin ve etiketlere göre filtreleyin.</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="primary" tone="solid">Yeni medya yükle</Button>
          <Button variant="neutral" tone="ghost">İmzalı URL oluştur</Button>
        </div>
      </header>

      <div className={styles.filters}>
        <Input
          className={styles.search}
          placeholder="Dosya adı ara"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <label>
          <span>Tür</span>
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">Tümü</option>
            <option value="image">Görsel</option>
            <option value="video">Video</option>
            <option value="application">SVG/Diğer</option>
          </select>
        </label>
        <label>
          <span>Etiket</span>
          <select value={tagFilter} onChange={(event) => setTagFilter(event.target.value)}>
            <option value="all">Tümü</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className={styles.grid}>
        {filteredMedia.map((item) => (
          <Card key={item.id} className={styles.mediaCard}>
            <div className={styles.cardHeader}>
              <h2>{item.name}</h2>
              <Badge variant="outline">{item.type}</Badge>
            </div>
            <p className={styles.meta}>Boyut: {formatFileSize(item.size)}</p>
            <p className={styles.meta}>
              Yüklendi: {new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" }).format(new Date(item.uploadedAt))}
            </p>
            <div className={styles.tags}>
              {item.tags.map((tag) => (
                <Badge key={tag} variant="muted">
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className={styles.variants}>
              <span>Varyantlar:</span>
              <ul>
                {item.variants.map((variant) => (
                  <li key={variant}>{variant}</li>
                ))}
              </ul>
            </div>
            <div className={styles.cardActions}>
              <Button variant="neutral" tone="ghost" size="sm">
                Ön izleme
              </Button>
              <Button variant="neutral" tone="outline" size="sm">
                İndir
              </Button>
            </div>
          </Card>
        ))}
      </section>
      </div>
    </AccessGate>
  );
};

export default MediaManagerPage;
