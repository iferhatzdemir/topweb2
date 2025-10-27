"use client";

import { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import AccessGate from "@/components/admin/AccessGate";
import { BLOCK_LIBRARY, BLOCK_SAMPLE_PAYLOAD } from "@/lib/admin/mockData";
import { z } from "@/lib/zod-lite";
import styles from "./blocks.module.css";

const blockFieldSchema = z.object({
  key: z.string().min(1, "Alan anahtarı boş olamaz."),
  label: z.string().min(1, "Etiket zorunludur."),
  type: z.enum(["text", "textarea", "media", "link", "repeatable"]),
  required: z.boolean().optional(),
});

const blockDefinitionSchema = z.object({
  id: z.string().min(1, "Blok kimliği zorunlu."),
  label: z.string().min(1, "Blok etiketi zorunlu."),
  component: z.string().min(1, "Bileşen adı zorunlu."),
  fields: z.array(blockFieldSchema).min(1, "En az bir alan tanımlayın."),
});

const blockLibrarySchema = z.array(blockDefinitionSchema).min(1, "En az bir blok tanımlayın.");

const blockPayloadSchema = z.object({
  blocks: z
    .array(
      z.object({
        id: z.string().min(1, "Blok id gerekli"),
        label: z.string().min(1, "Etiket gerekli"),
        component: z.string().min(1, "Bileşen adı gerekli"),
      })
    )
    .min(1, "En az bir blok içeriği sağlayın."),
});

const BlocksEditorPage = () => {
  const [libraryText, setLibraryText] = useState(JSON.stringify(BLOCK_LIBRARY, null, 2));
  const [payloadText, setPayloadText] = useState(JSON.stringify(BLOCK_SAMPLE_PAYLOAD, null, 2));
  const [libraryErrors, setLibraryErrors] = useState([]);
  const [payloadErrors, setPayloadErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const computedLibrary = useMemo(() => {
    try {
      const parsed = JSON.parse(libraryText);
      return Array.isArray(parsed) ? parsed : BLOCK_LIBRARY;
    } catch (error) {
      return BLOCK_LIBRARY;
    }
  }, [libraryText]);

  const handleValidate = () => {
    const libraryIssues = [];
    const payloadIssues = [];
    setSuccessMessage("");

    try {
      const parsedLibrary = JSON.parse(libraryText);
      const libraryResult = blockLibrarySchema.safeParse(parsedLibrary);
      if (!libraryResult.success) {
        libraryIssues.push(...libraryResult.error.issues.map((issue) => issue.message));
      }
    } catch (error) {
      libraryIssues.push("Blok şeması JSON formatında olmalı.");
    }

    try {
      const parsedPayload = JSON.parse(payloadText);
      const payloadResult = blockPayloadSchema.safeParse(parsedPayload);
      if (!payloadResult.success) {
        payloadIssues.push(...payloadResult.error.issues.map((issue) => issue.message));
      }
    } catch (error) {
      payloadIssues.push("İçerik blok JSON'u okunamadı.");
    }

    setLibraryErrors(libraryIssues);
    setPayloadErrors(payloadIssues);

    if (!libraryIssues.length && !payloadIssues.length) {
      setSuccessMessage("Blok şeması ve içerik örneği doğrulandı.");
    }
  };

  const handleBeautify = () => {
    try {
      setLibraryText(JSON.stringify(JSON.parse(libraryText), null, 2));
      setPayloadText(JSON.stringify(JSON.parse(payloadText), null, 2));
      setSuccessMessage("JSON metinleri biçimlendirildi.");
    } catch (error) {
      setSuccessMessage("");
      const message = "JSON biçimlendirilirken hata oluştu. Geçerli JSON sağlayın.";
      setLibraryErrors([message]);
      setPayloadErrors([message]);
    }
  };

  return (
    <AccessGate permission="blocks.manage" fallback={<p>Blok düzenleme izni gerekli.</p>}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1>Blok Düzenleyici</h1>
            <p>JSON şemasıyla blok komponentlerini tanımlayın ve içerik örnekleriyle test edin.</p>
          </div>
          <div className={styles.headerActions}>
            <Button variant="neutral" tone="ghost" onClick={handleBeautify}>
              JSON biçimlendir
            </Button>
            <Button variant="primary" tone="solid" onClick={handleValidate}>
              Şemayı doğrula
            </Button>
          </div>
        </header>

        {successMessage ? <div className={styles.success}>{successMessage}</div> : null}

        <section className={styles.layout}>
          <Card variant="elevated" className={styles.column} title="Blok Tanımları">
            <textarea
              className={styles.textarea}
              value={libraryText}
              onChange={(event) => setLibraryText(event.target.value)}
              spellCheck={false}
              aria-label="Blok şeması"
            />
            {libraryErrors.length ? (
              <div className={styles.errorList} role="alert">
                {libraryErrors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </Card>

          <Card variant="elevated" className={styles.column} title="İçerik Örneği">
            <textarea
              className={styles.textarea}
              value={payloadText}
              onChange={(event) => setPayloadText(event.target.value)}
              spellCheck={false}
              aria-label="Blok içerik örneği"
            />
            {payloadErrors.length ? (
              <div className={styles.errorList} role="alert">
                {payloadErrors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </Card>

          <Card variant="outlined" className={styles.column} title="Analiz">
            <div className={styles.analysis}>
              {computedLibrary.map((block) => (
                <div key={block.id} className={styles.analysisRow}>
                  <div>
                    <strong>{block.label}</strong>
                    <p>{block.fields?.length ?? 0} alan · bileşen: {block.component}</p>
                  </div>
                  <Badge variant="muted">{block.id}</Badge>
                </div>
              ))}
            </div>
            <Input
              label="Önerilen içerik sayısı"
              type="number"
              defaultValue={BLOCK_SAMPLE_PAYLOAD.blocks.length}
              helperText="Blok kombinasyonlarını planlamak için kullanılır."
            />
          </Card>
        </section>
      </div>
    </AccessGate>
  );
};

export default BlocksEditorPage;
