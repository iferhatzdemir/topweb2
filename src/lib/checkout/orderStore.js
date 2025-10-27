import { defaultShippingOption, findShippingOption } from "./shippingOptions";

const DEFAULT_STATUS = "requires_action";
const STATUS_TRANSITIONS = {
  requires_action: ["confirmed", "cancelled"],
  confirmed: ["refunded", "cancelled"],
  cancelled: [],
  refunded: [],
};

const ensureStore = () => {
  if (!globalThis.__CHECKOUT_ORDER_STORE__) {
    globalThis.__CHECKOUT_ORDER_STORE__ = {
      orders: new Map(),
      idempotencyMap: new Map(),
      actionIdempotencyMap: new Map(),
    };
  }
  return globalThis.__CHECKOUT_ORDER_STORE__;
};

const requires3DSForTotal = (total) => total >= 500;

export const createOrderRecord = ({
  id,
  payload,
  totals,
  idempotencyKey,
}) => {
  const createdAt = new Date().toISOString();
  const requires3DS = requires3DSForTotal(totals.total);
  const status = requires3DS ? DEFAULT_STATUS : "confirmed";
  const redirectUrl = requires3DS
    ? `https://secure.${payload.payment.provider}.com/3ds/redirect/${id}`
    : null;

  return {
    id,
    createdAt,
    updatedAt: createdAt,
    status,
    totals,
    idempotencyKey,
    currency: totals.currency,
    payment: {
      provider: payload.payment.provider,
      method: payload.payment.method || "credit_card",
      requires3DS,
      redirectUrl,
    },
    customer: payload.customer,
    billingAddress: payload.billingAddress,
    shippingAddress: payload.shippingAddress,
    shippingOption: findShippingOption(payload.shippingOptionId) || defaultShippingOption,
    coupon: totals.coupon,
    metadata: payload.metadata || {},
    items: totals.items,
  };
};

export const getOrderStore = () => ensureStore();

export const saveOrder = (order) => {
  const store = ensureStore();
  store.orders.set(order.id, order);
  store.idempotencyMap.set(order.idempotencyKey, order.id);
  return order;
};

export const getOrderById = (id) => ensureStore().orders.get(id) || null;

export const getOrderByIdempotencyKey = (key) => {
  const store = ensureStore();
  const orderId = store.idempotencyMap.get(key);
  return orderId ? store.orders.get(orderId) : null;
};

const transitionOrder = (order, status) => {
  const next = { ...order, status, updatedAt: new Date().toISOString() };
  const store = ensureStore();
  store.orders.set(order.id, next);
  return next;
};

export const applyOrderAction = (order, action) => {
  if (!order) return null;
  const allowed = STATUS_TRANSITIONS[order.status] || [];
  if (!allowed.includes(action)) {
    return order;
  }

  if (action === "confirmed") {
    return transitionOrder(order, "confirmed");
  }
  if (action === "cancelled") {
    return transitionOrder(order, "cancelled");
  }
  if (action === "refunded") {
    return transitionOrder(order, "refunded");
  }
  return order;
};

export const resolveActionIdempotency = (key) => {
  const store = ensureStore();
  return store.actionIdempotencyMap.get(key) || null;
};

export const saveActionIdempotency = (key, payload) => {
  const store = ensureStore();
  store.actionIdempotencyMap.set(key, payload);
  return payload;
};
