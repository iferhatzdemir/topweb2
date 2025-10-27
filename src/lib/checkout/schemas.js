import { z } from "@/lib/zod-lite";

export const checkoutItemSchema = z.object({
  id: z.string().nonempty("Ürün kimliği gerekli"),
  title: z.string().nonempty("Ürün adı gerekli"),
  price: z.number(),
  quantity: z.number(),
  disc: z.number().optional(),
  sku: z.string().optional(),
  variantId: z.string().optional(),
});

export const addressSchema = z.object({
  firstName: z.string().nonempty("Ad gerekli"),
  lastName: z.string().nonempty("Soyad gerekli"),
  phone: z.string().nonempty("Telefon gerekli"),
  email: z.string().optional(),
  line1: z.string().nonempty("Adres satırı gerekli"),
  line2: z.string().optional(),
  city: z.string().nonempty("Şehir gerekli"),
  state: z.string().optional(),
  postalCode: z.string().nonempty("Posta kodu gerekli"),
  country: z.string().nonempty("Ülke gerekli"),
});

export const customerSchema = z.object({
  type: z.enum(["guest", "member"]),
  email: z.string().email("Geçerli e-posta girin"),
  firstName: z.string().nonempty("Ad gerekli"),
  lastName: z.string().nonempty("Soyad gerekli"),
  phone: z.string().nonempty("Telefon gerekli"),
  accountId: z.string().optional(),
});

export const paymentSchema = z.object({
  provider: z.enum(["iyzico", "paytr", "stripe"]),
  method: z.string().optional(),
  requires3DS: z.boolean().optional(),
});

export const orderMetadataSchema = z.object({
  notes: z.string().optional(),
  saveAddress: z.boolean().optional(),
});

export const orderPayloadSchema = z.object({
  currency: z.enum(["TRY"]),
  couponCode: z.string().optional(),
  shippingOptionId: z.string().nonempty("Kargo seçimi gerekli"),
  items: z.array(checkoutItemSchema).min(1, "En az bir ürün gerekli"),
  customer: customerSchema,
  billingAddress: addressSchema,
  shippingAddress: addressSchema,
  payment: paymentSchema,
  metadata: orderMetadataSchema.optional(),
});

export const orderActionSchema = z.object({
  orderId: z.string().nonempty("Sipariş kimliği gerekli"),
  action: z.enum(["cancel", "refund"]),
});
