import { NextResponse } from "next/server";
import { calculateTotals } from "@/lib/checkout/calculateTotals";
import {
  createOrderRecord,
  getOrderById,
  getOrderByIdempotencyKey,
  saveOrder,
  applyOrderAction,
  resolveActionIdempotency,
  saveActionIdempotency,
} from "@/lib/checkout/orderStore";
import { orderActionSchema, orderPayloadSchema } from "@/lib/checkout/schemas";

const REQUIRED_IDEMPOTENCY_MESSAGE = "Missing Idempotency-Key header";

const parseBody = async (request) => {
  try {
    return await request.json();
  } catch (error) {
    return null;
  }
};

const badRequest = (message, issues) =>
  NextResponse.json({ error: message, issues }, { status: 400 });

const unprocessable = (issues) =>
  NextResponse.json({ error: "validation_error", issues }, { status: 422 });

export async function POST(request) {
  const idempotencyKey = request.headers.get("Idempotency-Key");
  if (!idempotencyKey) {
    return badRequest(REQUIRED_IDEMPOTENCY_MESSAGE);
  }

  const existing = getOrderByIdempotencyKey(idempotencyKey);
  if (existing) {
    return NextResponse.json(existing, { status: 200 });
  }

  const body = await parseBody(request);
  if (!body) {
    return badRequest("Invalid JSON body");
  }

  const parsed = orderPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return unprocessable(parsed.error.issues);
  }

  const payload = parsed.data;
  const totals = calculateTotals({
    items: payload.items,
    couponCode: payload.couponCode,
    shippingOptionId: payload.shippingOptionId,
    currency: payload.currency,
  });

  const orderId = crypto.randomUUID();
  const orderRecord = createOrderRecord({
    id: orderId,
    payload,
    totals,
    idempotencyKey,
  });

  saveOrder(orderRecord);

  return NextResponse.json(orderRecord, { status: 201 });
}

const ACTION_MAP = {
  cancel: "cancelled",
  refund: "refunded",
};

export async function PATCH(request) {
  const idempotencyKey = request.headers.get("Idempotency-Key");
  if (!idempotencyKey) {
    return badRequest(REQUIRED_IDEMPOTENCY_MESSAGE);
  }

  const cached = resolveActionIdempotency(idempotencyKey);
  if (cached) {
    return NextResponse.json(cached, { status: 200 });
  }

  const body = await parseBody(request);
  if (!body) {
    return badRequest("Invalid JSON body");
  }

  const parsed = orderActionSchema.safeParse(body);
  if (!parsed.success) {
    return unprocessable(parsed.error.issues);
  }

  const actionPayload = parsed.data;
  const order = getOrderById(actionPayload.orderId);
  if (!order) {
    return NextResponse.json({ error: "order_not_found" }, { status: 404 });
  }

  const statusToApply = ACTION_MAP[actionPayload.action];
  const nextOrder = applyOrderAction(order, statusToApply);
  saveActionIdempotency(idempotencyKey, nextOrder);

  return NextResponse.json(nextOrder, { status: 200 });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return badRequest("Missing order id");
  }
  const order = getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "order_not_found" }, { status: 404 });
  }
  return NextResponse.json(order, { status: 200 });
}
