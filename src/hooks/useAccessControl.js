"use client";

import { useMemo } from "react";
import { useAdminAuth } from "./useAdminAuth";

export const useAccessControl = () => {
  const { hasPermission, permissions } = useAdminAuth();

  const canAccess = useMemo(
    () => ({
      has: (permission) => hasPermission(permission),
      any: (required) => required.some((item) => hasPermission(item)),
      all: (required) => required.every((item) => hasPermission(item)),
      permissions,
    }),
    [hasPermission, permissions]
  );

  return canAccess;
};
