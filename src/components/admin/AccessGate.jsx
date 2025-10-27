"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";

const AccessGate = ({ anyOf, allOf, permission, fallback = null, children }) => {
  const { ready, user, hasPermission } = useAdminAuth();

  if (!ready) {
    return null;
  }

  if (!user) {
    return fallback;
  }

  if (permission && !hasPermission(permission)) {
    return fallback;
  }

  if (anyOf && anyOf.length && !anyOf.some((item) => hasPermission(item))) {
    return fallback;
  }

  if (allOf && allOf.length && !allOf.every((item) => hasPermission(item))) {
    return fallback;
  }

  return children;
};

export default AccessGate;
