"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "admin-auth-state";

const ROLE_PERMISSIONS = {
  superadmin: [
    "*",
    "dashboard.view",
    "content.read",
    "content.write",
    "content.publish",
    "media.manage",
    "menus.manage",
    "blocks.manage",
    "users.manage",
  ],
  "content-admin": [
    "dashboard.view",
    "content.read",
    "content.write",
    "content.publish",
    "media.manage",
    "menus.manage",
    "blocks.manage",
  ],
  editor: ["dashboard.view", "content.read", "content.write"],
  author: ["dashboard.view", "content.read"],
  "media-manager": ["dashboard.view", "media.manage"],
  analyst: ["dashboard.view"],
};

const DEMO_ACCOUNTS = [
  {
    email: "admin@rosecommerce.dev",
    password: "Admin123!",
    name: "Süper Yönetici",
    role: "superadmin",
    avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  {
    email: "icerik@rosecommerce.dev",
    password: "Content123!",
    name: "İçerik Yöneticisi",
    role: "content-admin",
    avatar: "https://www.gravatar.com/avatar/11111111111111111111111111111111?d=identicon",
  },
  {
    email: "editor@rosecommerce.dev",
    password: "Editor123!",
    name: "Kıdemli Editör",
    role: "editor",
    avatar: "https://www.gravatar.com/avatar/22222222222222222222222222222222?d=identicon",
  },
];

const AdminAuthContext = createContext(undefined);

const resolvePermissions = (role) => {
  const permissions = ROLE_PERMISSIONS[role] || [];
  if (permissions.includes("*")) {
    const deduped = new Set(Object.values(ROLE_PERMISSIONS).flat());
    deduped.delete("*");
    return Array.from(deduped);
  }
  return Array.from(new Set(permissions));
};

const persistState = (payload) => {
  if (typeof window === "undefined") return;
  if (!payload) {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

const reviveState = () => {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.email || !parsed?.role) return null;
    return parsed;
  } catch (error) {
    return null;
  }
};

export const AdminAuthProvider = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const restored = reviveState();
    if (restored) {
      setUser(restored);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    persistState(user);
  }, [user, ready]);

  const login = useCallback(async ({ email, password }) => {
    const account = DEMO_ACCOUNTS.find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password
    );

    if (!account) {
      return {
        success: false,
        error: "E-posta veya şifre hatalı.",
      };
    }

    const payload = {
      ...account,
      permissions: resolvePermissions(account.role),
      lastLoginAt: new Date().toISOString(),
    };
    setUser(payload);

    return {
      success: true,
      data: payload,
    };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const hasPermission = useCallback(
    (permission) => {
      if (!permission) return true;
      if (!user?.permissions) return false;
      return user.permissions.includes(permission);
    },
    [user]
  );

  const value = useMemo(
    () => ({
      ready,
      user,
      login,
      logout,
      hasPermission,
      permissions: user?.permissions ?? [],
    }),
    [ready, user, login, logout, hasPermission]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuthContext = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuthContext must be used within AdminAuthProvider");
  }
  return context;
};
