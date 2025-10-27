const TODAY = () => new Date();

export const SUPPORTED_CURRENCY = "TRY";

export const coupons = [
  {
    code: "TRYWELCOME10",
    type: "percentage",
    percentage: 10,
    minSubtotal: 500,
    currency: SUPPORTED_CURRENCY,
    description: "Yeni müşterilere %10 indirim",
    startsAt: "2024-01-01T00:00:00.000Z",
    expiresAt: "2026-01-01T00:00:00.000Z",
  },
  {
    code: "FREESHIPTR",
    type: "shipping",
    currency: SUPPORTED_CURRENCY,
    minSubtotal: 250,
    description: "250₺ üzeri ücretsiz kargo",
    startsAt: "2024-01-01T00:00:00.000Z",
    expiresAt: "2025-12-31T23:59:59.000Z",
  },
  {
    code: "TRY50OFF",
    type: "fixed",
    amount: 50,
    currency: SUPPORTED_CURRENCY,
    minSubtotal: 400,
    description: "400₺ üzeri sepette 50₺ indirim",
    startsAt: "2024-06-01T00:00:00.000Z",
    expiresAt: "2025-06-01T00:00:00.000Z",
  },
];

const normaliseCode = (code) => (code ? code.trim().toUpperCase() : "");

export const findCouponByCode = (code) => {
  const normalized = normaliseCode(code);
  if (!normalized) return null;
  return coupons.find((coupon) => coupon.code === normalized) || null;
};

export const evaluateCoupon = (code, context) => {
  const { subtotal, currency = SUPPORTED_CURRENCY, now = TODAY() } = context;
  if (!code) {
    return { coupon: null, valid: false, reason: null, discount: 0, freeShipping: false };
  }

  const coupon = findCouponByCode(code);
  if (!coupon) {
    return { coupon: null, valid: false, reason: "notFound", discount: 0, freeShipping: false };
  }

  if (coupon.currency && coupon.currency !== currency) {
    return {
      coupon,
      valid: false,
      reason: "currencyMismatch",
      discount: 0,
      freeShipping: false,
    };
  }

  const startsAt = coupon.startsAt ? new Date(coupon.startsAt) : null;
  const expiresAt = coupon.expiresAt ? new Date(coupon.expiresAt) : null;
  if (startsAt && now < startsAt) {
    return { coupon, valid: false, reason: "inactive", discount: 0, freeShipping: false };
  }

  if (expiresAt && now > expiresAt) {
    return { coupon, valid: false, reason: "expired", discount: 0, freeShipping: false };
  }

  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      coupon,
      valid: false,
      reason: "minSubtotal",
      discount: 0,
      freeShipping: false,
    };
  }

  if (coupon.type === "shipping") {
    return { coupon, valid: true, reason: null, discount: 0, freeShipping: true };
  }

  if (coupon.type === "percentage") {
    const percent = coupon.percentage / 100;
    return {
      coupon,
      valid: true,
      reason: null,
      discount: subtotal * percent,
      freeShipping: false,
    };
  }

  if (coupon.type === "fixed") {
    return {
      coupon,
      valid: true,
      reason: null,
      discount: Math.min(coupon.amount, subtotal),
      freeShipping: false,
    };
  }

  return { coupon, valid: false, reason: "unsupported", discount: 0, freeShipping: false };
};
