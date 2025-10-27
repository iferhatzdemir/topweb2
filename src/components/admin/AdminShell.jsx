"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import styles from "./AdminShell.module.css";

const AdminShell = ({ children }) => {
  const { ready, user } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!user && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [ready, user, pathname, router]);

  if (!ready) {
    return (
      <div className={styles.loadingState} role="status" aria-live="polite">
        <div className={styles.spinner} aria-hidden="true" />
        <p>Yönetim paneli hazırlanıyor...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <div className={styles.mainArea}>
        <AdminTopbar />
        <main className={styles.contentArea}>{children}</main>
      </div>
    </div>
  );
};

export default AdminShell;
