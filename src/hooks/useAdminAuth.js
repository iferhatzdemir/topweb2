"use client";

import { useMemo } from "react";
import { useAdminAuthContext } from "@/providers/admin/AdminAuthProvider";

export const useAdminAuth = () => {
  const context = useAdminAuthContext();

  return useMemo(
    () => ({
      ready: context.ready,
      user: context.user,
      login: context.login,
      logout: context.logout,
      hasPermission: context.hasPermission,
      permissions: context.permissions,
    }),
    [context.ready, context.user, context.login, context.logout, context.hasPermission, context.permissions]
  );
};
