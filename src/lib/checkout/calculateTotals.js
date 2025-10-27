import countDiscount from "@/libs/countDiscount";
import { evaluateCoupon, SUPPORTED_CURRENCY } from "./coupons";
import { calculateVat } from "./taxes";
import { findShippingOption, defaultShippingOption } from "./shippingOptions";

const normaliseItems = (items = []) =>
  items.map((item) => ({
    id: item.id,
    title: item.title,
    quantity: Number(item.quantity || 0),
    price: Number(item.price || 0),
    disc: item.disc || item.discount || 0,
    sku: item.sku,
    variantId: item.variantId || item.variant || null,
  }));

const calculateSubtotal = (items) =>
  items.reduce((total, item) => {
    const { netPrice } = countDiscount(item.price, item.disc);
    return total + netPrice * item.quantity;
  }, 0);

export const calculateTotals = ({
  items = [],
  couponCode = null,
  shippingOptionId,
  currency = SUPPORTED_CURRENCY,
}) => {
  const normalisedItems = normaliseItems(items);
  const subtotal = Number(calculateSubtotal(normalisedItems).toFixed(2));
  const evaluation = evaluateCoupon(couponCode, { subtotal, currency });
  const discount = evaluation.valid
    ? Number((evaluation.discount || 0).toFixed(2))
    : 0;

  const shippingOption = findShippingOption(shippingOptionId);
  const shippingCost = evaluation.valid && evaluation.freeShipping
    ? 0
    : Number((shippingOption.cost || 0).toFixed(2));

  const taxableAmount = Math.max(subtotal - discount, 0);
  const { amount: vatAmount, rate: vatRate } = calculateVat(taxableAmount);
  const total = Number((taxableAmount + vatAmount + shippingCost).toFixed(2));

  return {
    currency,
    subtotal,
    discount,
    shipping: shippingCost,
    taxableAmount,
    vat: vatAmount,
    vatRate,
    total,
    coupon: evaluation.coupon
      ? {
          ...evaluation.coupon,
          valid: evaluation.valid,
          reason: evaluation.reason,
        }
      : null,
    couponValid: evaluation.valid,
    couponReason: evaluation.reason,
    shippingOption: shippingOption || defaultShippingOption,
    items: normalisedItems,
  };
};
