"use client";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AccessGate from "@/components/admin/AccessGate";
import { CONTENT_PAGES } from "@/lib/admin/mockData";
import styles from "./pages.module.css";

const statusVariant = (status) => {
  switch (status) {
    case "published":
      return "success";
    case "review":
      return "muted";
    default:
      return "outline";
  }
};

const statusLabel = {
  published: "Yayınlandı",
  review: "İncelemede",
  draft: "Taslak",
};

const ContentPages = () => {
  const filters = [
    {
      key: "status",
      label: "Durum",
      options: [
        { value: "published", label: "Yayınlandı" },
        { value: "review", label: "İncelemede" },
        { value: "draft", label: "Taslak" },
      ],
    },
    {
      key: "type",
      label: "Tür",
      options: Array.from(new Set(CONTENT_PAGES.map((page) => page.type))).map((type) => ({
        value: type,
        label: type,
      })),
    },
  ];

  const columns = [
    {
      key: "title",
      label: "Başlık",
      render: (value, row) => (
        <div className={styles.titleCell}>
          <span className={styles.title}>{value}</span>
          <span className={styles.subMeta}>{row.type}</span>
        </div>
      ),
    },
    {
      key: "slug",
      label: "Slug",
      render: (value) => <code className={styles.code}>/{value}</code>,
    },
    {
      key: "status",
      label: "Durum",
      render: (value) => <Badge variant={statusVariant(value)}>{statusLabel[value]}</Badge>,
    },
    {
      key: "updatedAt",
      label: "Güncellenme",
      render: (value) =>
        new Intl.DateTimeFormat("tr-TR", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(value)),
    },
    {
      key: "author",
      label: "Sorumlu",
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      render: (_value, row) => (
        <div className={styles.actions}>
          <AccessGate permission="content.write">
            <Button size="sm" variant="neutral" tone="ghost">
              Düzenle
            </Button>
          </AccessGate>
          <AccessGate permission="content.publish">
            <Button size="sm" variant="neutral" tone="ghost">
              Yayınla
            </Button>
          </AccessGate>
        </div>
      ),
    },
  ];

  const rows = CONTENT_PAGES.map((page) => ({ ...page, actions: null }));

  return (
    <AccessGate
      permission="content.read"
      fallback={(
        <div className={styles.denied}>
          <Card variant="outlined">
            <h1>İçerik listesine erişim yok</h1>
            <p>Bu bölümü görüntülemek için content.read iznine ihtiyaç vardır.</p>
          </Card>
        </div>
      )}
    >
      <div className={styles.container}>
        <header className={styles.header}>
        <div>
          <h1>İçerik Sayfaları</h1>
          <p>Duruma göre filtreleyin, slug ve sorumluya göre arayın.</p>
        </div>
        <AccessGate permission="content.write">
          <Button variant="primary" tone="solid" href="/admin/content/pages/new" as="a">
            Yeni sayfa
          </Button>
        </AccessGate>
      </header>

      <Card variant="outlined" className={styles.summary}>
        <p>
          Toplam {CONTENT_PAGES.length} sayfa · {CONTENT_PAGES.filter((page) => page.status === "draft").length} taslak ·
          {" "}
          {CONTENT_PAGES.filter((page) => page.status === "review").length} incelemede içerik
        </p>
      </Card>

        <AdminDataTable
          columns={columns}
          rows={rows}
          filters={filters}
          searchableKeys={["title", "slug", "author"]}
          defaultSort={{ key: "updatedAt", direction: "desc" }}
        />
      </div>
    </AccessGate>
  );
};

export default ContentPages;
