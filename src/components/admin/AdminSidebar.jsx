"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AccessGate from "./AccessGate";
import Button from "@/components/ui/Button";
import styles from "./AdminSidebar.module.css";

const NAV_SECTIONS = [
  {
    id: "overview",
    label: "Genel",
    items: [
      {
        id: "dashboard",
        label: "Gösterge Paneli",
        href: "/admin/dashboard",
        icon: "📊",
        permission: "dashboard.view",
      },
    ],
  },
  {
    id: "content",
    label: "İçerik",
    items: [
      {
        id: "content-pages",
        label: "Sayfa Listesi",
        href: "/admin/content/pages",
        icon: "🗂️",
        permission: "content.read",
      },
      {
        id: "content-new",
        label: "Yeni İçerik",
        href: "/admin/content/pages/new",
        icon: "📝",
        permission: "content.write",
      },
      {
        id: "blocks",
        label: "Blok Düzenleyici",
        href: "/admin/blocks",
        icon: "🧩",
        permission: "blocks.manage",
      },
    ],
  },
  {
    id: "experience",
    label: "Deneyim",
    items: [
      {
        id: "media",
        label: "Medya Merkezi",
        href: "/admin/media",
        icon: "🖼️",
        permission: "media.manage",
      },
      {
        id: "menus",
        label: "Menü Yönetimi",
        href: "/admin/menus",
        icon: "📑",
        permission: "menus.manage",
      },
    ],
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const { user } = useAdminAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navSections = useMemo(() => NAV_SECTIONS, []);

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.brandRow}>
        <div>
          <span className={styles.brandTitle}>Rose Admin</span>
          <span className={styles.brandSubtitle}>Gül kurusu teması</span>
        </div>
        <Button
          variant="neutral"
          tone="ghost"
          size="sm"
          className={styles.toggleButton}
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-label={isCollapsed ? "Navigasyonu genişlet" : "Navigasyonu daralt"}
        >
          {isCollapsed ? "☰" : "⟨"}
        </Button>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.avatar} aria-hidden="true">
          {user?.name?.[0] ?? "?"}
        </div>
        <div>
          <p className={styles.profileName}>{user?.name}</p>
          <p className={styles.profileRole}>{user?.role}</p>
        </div>
      </div>

      <nav className={styles.navigation} aria-label="Yönetim menüsü">
        {navSections.map((section) => (
          <div className={styles.section} key={section.id}>
            <p className={styles.sectionLabel}>{section.label}</p>
            <ul className={styles.linkList}>
              {section.items.map((item) => (
                <AccessGate key={item.id} permission={item.permission}>
                  <li>
                    <Link
                      href={item.href}
                      className={
                        pathname === item.href
                          ? `${styles.navLink} ${styles.active}`
                          : styles.navLink
                      }
                    >
                      <span aria-hidden="true" className={styles.icon}>
                        {item.icon}
                      </span>
                      <span className={styles.linkLabel}>{item.label}</span>
                    </Link>
                  </li>
                </AccessGate>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
