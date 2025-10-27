"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import TipTapEditor from "@/components/admin/TipTapEditor";
import AccessGate from "@/components/admin/AccessGate";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { z } from "@/lib/zod-lite";
import styles from "./new.module.css";

const pageSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalı."),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir."),
  status: z.enum(["draft", "review", "published"]),
  summary: z.string().min(16, "Özet için en az 16 karakter girin."),
  heroImage: z.string().optional(),
  body: z.string().min(8, "Metin içeriği ekleyin."),
});

const statusOptions = [
  { value: "draft", label: "Taslak" },
  { value: "review", label: "İncelemede" },
  { value: "published", label: "Yayınlandı" },
];

const NewContentPage = () => {
  const { hasPermission } = useAdminAuth();
  const [formState, setFormState] = useState({
    title: "",
    slug: "",
    status: "draft",
    summary: "",
    heroImage: "",
    body: "",
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [preview, setPreview] = useState(null);

  const availableStatuses = useMemo(() => {
    if (hasPermission("content.publish")) {
      return statusOptions;
    }
    return statusOptions.filter((option) => option.value !== "published");
  }, [hasPermission]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleBodyChange = (value) => {
    setFormState((prev) => ({ ...prev, body: value }));
    setErrors((prev) => ({ ...prev, body: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedback("");

    const result = pageSchema.safeParse(formState);
    if (!result.success) {
      const issueMap = result.error.issues.reduce(
        (acc, issue) => ({ ...acc, [issue.path.at(-1)]: issue.message }),
        {}
      );
      setErrors(issueMap);
      return;
    }

    const payload = {
      ...result.data,
      updatedAt: new Date().toISOString(),
    };

    setPreview(payload);
    setFeedback("İçerik taslağı başarıyla kaydedildi. Yayına hazır olduğunda CMS API'sine gönderebilirsiniz.");
  };

  return (
    <AccessGate
      permission="content.write"
      fallback={(
        <div className={styles.denied}>
          <Card variant="outlined">
            <h1>İçerik oluşturma izniniz yok</h1>
            <p>Yeni sayfa oluşturmak için content.write iznine ihtiyaç vardır.</p>
          </Card>
        </div>
      )}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1>Yeni İçerik Sayfası</h1>
            <p>Token bazlı bileşenler ve TipTap editörü ile içeriğinizi hazırlayın.</p>
          </div>
          <Button variant="primary" tone="solid" onClick={handleSubmit}>
            Taslağı Kaydet
          </Button>
        </header>

        {feedback ? (
          <div className={styles.feedback} role="status">
            {feedback}
          </div>
        ) : null}

        <form className={styles.form} onSubmit={handleSubmit}>
          <section className={styles.grid}>
            <Card variant="elevated" className={styles.column}>
              <div className={styles.formGrid}>
                <Input
                  label="Başlık"
                  name="title"
                  value={formState.title}
                  onChange={handleChange("title")}
                  placeholder="Örn. Sezon Kampanya Açılışı"
                  error={errors.title}
                />
                <Input
                  label="Slug"
                  name="slug"
                  value={formState.slug}
                  onChange={handleChange("slug")}
                  placeholder="sezon-kampanya"
                  error={errors.slug}
                />
                <label className={styles.selectLabel}>
                  <span>Durum</span>
                  <select value={formState.status} onChange={handleChange("status")}>
                    {availableStatuses.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <Input
                  label="Özet"
                  name="summary"
                  as="textarea"
                  rows={4}
                  value={formState.summary}
                  onChange={handleChange("summary")}
                  placeholder="Kısa açıklama"
                  error={errors.summary}
                />
                <Input
                  label="Hero görsel URL"
                  name="heroImage"
                  value={formState.heroImage}
                  onChange={handleChange("heroImage")}
                  placeholder="https://cdn.example.com/hero.jpg"
                  error={errors.heroImage}
                />
              </div>
            </Card>

            <Card variant="elevated" className={styles.column} title="İçerik Gövdesi">
              <TipTapEditor value={formState.body} onChange={handleBodyChange} />
              {errors.body ? <p className={styles.errorText}>{errors.body}</p> : null}
            </Card>
          </section>

          <footer className={styles.formFooter}>
            <Button
              variant="neutral"
              tone="ghost"
              type="button"
              onClick={() =>
                setFormState({
                  title: "",
                  slug: "",
                  status: "draft",
                  summary: "",
                  heroImage: "",
                  body: "",
                })
              }
            >
              Formu temizle
            </Button>
            <AccessGate permission="content.publish">
              <Button variant="primary" tone="outline" type="submit">
                Yayın için sırala
              </Button>
            </AccessGate>
          </footer>
        </form>

        {preview ? (
          <Card variant="outlined" className={styles.preview} title="Taslak Önizlemesi">
            <dl>
              <div>
                <dt>Başlık</dt>
                <dd>{preview.title}</dd>
              </div>
              <div>
                <dt>Slug</dt>
                <dd>/{preview.slug}</dd>
              </div>
              <div>
                <dt>Durum</dt>
                <dd>{preview.status}</dd>
              </div>
              <div>
                <dt>Özet</dt>
                <dd>{preview.summary}</dd>
              </div>
              <div>
                <dt>Hero görsel</dt>
                <dd>{preview.heroImage || "-"}</dd>
              </div>
            </dl>
            <pre>{JSON.stringify(preview, null, 2)}</pre>
          </Card>
        ) : null}
      </div>
    </AccessGate>
  );
};

export default NewContentPage;
