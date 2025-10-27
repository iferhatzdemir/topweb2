"use client";

import { usePathname } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { AdminAuthProvider } from "@/providers/admin/AdminAuthProvider";
import styles from "./layout.module.css";

const AdminLayout = ({ children }) => (
  <AdminAuthProvider>
    <AdminLayoutSurface>{children}</AdminLayoutSurface>
  </AdminAuthProvider>
);

const AdminLayoutSurface = ({ children }) => {
  const pathname = usePathname();
  const isLoginRoute = pathname === "/admin/login";

  if (isLoginRoute) {
    return <div className={styles.authLayout}>{children}</div>;
  }

  return <AdminShell>{children}</AdminShell>;
};

export default AdminLayout;
