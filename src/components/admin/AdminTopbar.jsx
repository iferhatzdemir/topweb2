"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AccessGate from "./AccessGate";
import styles from "./AdminTopbar.module.css";

const QUICK_FILTERS = [
  { id: "draft", label: "Taslaklar", permission: "content.read" },
  { id: "review", label: "İncelemede", permission: "content.read" },
  { id: "publish", label: "Yayın Bekleyen", permission: "content.publish" },
];

const AdminTopbar = () => {
  const router = useRouter();
  const { user, logout } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("draft");

  const lastLogin = useMemo(() => {
    if (!user?.lastLoginAt) return "";
    return new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(user.lastLoginAt));
  }, [user?.lastLoginAt]);

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <div>
          <h1 className={styles.title}>Hoş geldiniz, {user?.name?.split(" ")[0]} 👋</h1>
          <p className={styles.subtitle}>Son giriş: {lastLogin || "--"}</p>
        </div>
      </div>
      <div className={styles.center}>
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="İçerik, medya veya menü ara"
          aria-label="Yönetim araması"
          className={styles.search}
        />
        <div className={styles.quickFilters} role="tablist" aria-label="Hızlı filtreler">
          {QUICK_FILTERS.map((filter) => (
            <AccessGate key={filter.id} permission={filter.permission}>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.id}
                className={
                  activeFilter === filter.id
                    ? `${styles.filterButton} ${styles.filterActive}`
                    : styles.filterButton
                }
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            </AccessGate>
          ))}
        </div>
      </div>
      <div className={styles.actions}>
        <AccessGate permission="content.write">
          <Button
            variant="primary"
            tone="solid"
            size="sm"
            onClick={() => router.push("/admin/content/pages/new")}
          >
            Yeni içerik
          </Button>
        </AccessGate>
        <Badge variant="outline">{user?.role}</Badge>
        <Button variant="neutral" tone="ghost" size="sm" onClick={logout}>
          Çıkış
        </Button>
      </div>
    </header>
  );
};

export default AdminTopbar;
