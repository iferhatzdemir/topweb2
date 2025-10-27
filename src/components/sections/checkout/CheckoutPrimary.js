/* eslint-disable jsx-a11y/role-supports-aria-props */
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import CheckoutProduct from "@/components/shared/checkout/CheckoutProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import getAllProducts from "@/libs/getAllProducts";
import { useCartContext } from "@/providers/CartContext";
import useSweetAlert from "@/hooks/useSweetAlert";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency, formatDate } from "@/i18n/formatters";
import {
  loadAddressBook,
  persistAddressBook,
  createAddressFromForm,
} from "@/lib/checkout/addressBook";
import { calculateTotals } from "@/lib/checkout/calculateTotals";
import { evaluateCoupon, SUPPORTED_CURRENCY } from "@/lib/checkout/coupons";
import { defaultShippingOption, shippingOptions } from "@/lib/checkout/shippingOptions";

const paymentImage = "/img/icons/payment-3.png";

const initialBilling = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  companyAddress: "",
  country: "TR",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
};

const initialShipping = {
  label: "shipping",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "TR",
};

const PAYMENT_PROVIDERS = [
  { id: "iyzico", translationKey: "paymentProviders.iyzico.name" },
  { id: "paytr", translationKey: "paymentProviders.paytr.name" },
  { id: "stripe", translationKey: "paymentProviders.stripe.name" },
];

const PAYMENT_PROVIDER_DESCRIPTIONS = {
  iyzico: "paymentProviders.iyzico.description",
  paytr: "paymentProviders.paytr.description",
  stripe: "paymentProviders.stripe.description",
};

const PAYMENT_METHODS = [
  { id: "credit_card", labelKey: "creditCard" },
  { id: "debit_card", labelKey: "debitCard" },
];

const couponReasonToAlertKey = {
  notFound: "couponInvalid",
  expired: "couponExpired",
  minSubtotal: "couponMinSubtotal",
  currencyMismatch: "couponCurrencyMismatch",
  inactive: "couponInactive",
  unsupported: "couponInvalid",
};

const mapAddressToForm = (address) => ({
  label: address.label || "saved",
  firstName: address.firstName || "",
  lastName: address.lastName || "",
  phone: address.phone || "",
  email: address.email || "",
  line1: address.line1 || "",
  line2: address.line2 || "",
  city: address.city || "",
  state: address.state || "",
  postalCode: address.postalCode || "",
  country: address.country || "TR",
});

const buildAddressPayload = (address) => ({
  firstName: address.firstName,
  lastName: address.lastName,
  phone: address.phone,
  email: address.email,
  line1: address.line1,
  line2: address.line2,
  city: address.city,
  state: address.state,
  postalCode: address.postalCode,
  country: address.country,
});

const CheckoutPrimary = () => {
  const creteAlert = useSweetAlert();
  const allProducts = getAllProducts();
  const searchParams = useSearchParams();
  const { cartProducts } = useCartContext();
  const { locale, t } = useLocale("checkout");
  const { t: tAlerts } = useLocale("alerts");
  const { t: tButtons } = useLocale("buttons");
  const { t: tAuth } = useLocale("auth");

  const currentId = parseInt(searchParams.get("id"), 10);
  const currentQuantity = parseInt(searchParams.get("quantity"), 10) || 1;
  const currentColor = searchParams.get("color");
  const currentSize = searchParams.get("size");

  const currentProduct = useMemo(() => {
    if (!currentId) return null;
    const base = allProducts?.find(({ id }) => id === currentId);
    if (!base) return null;
    return {
      ...base,
      quantity: currentQuantity,
      color: currentColor,
      size: currentSize,
    };
  }, [allProducts, currentId, currentQuantity, currentColor, currentSize]);

  const items = useMemo(() => {
    if (currentProduct) {
      return [
        {
          id: String(currentProduct.id),
          title: currentProduct.title,
          quantity: currentQuantity,
          price: currentProduct.price,
          disc: currentProduct.disc,
        },
      ];
    }

    return (cartProducts || []).map((product) => ({
      id: String(product.id),
      title: product.title,
      quantity: product.quantity,
      price: product.price,
      disc: product.disc,
    }));
  }, [cartProducts, currentProduct, currentQuantity]);

  const [billing, setBilling] = useState({ ...initialBilling });
  const [shipping, setShipping] = useState({ ...initialShipping });
  const [useDifferentShipping, setUseDifferentShipping] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState("guest");
  const [accountId, setAccountId] = useState("");
  const [addressBook, setAddressBook] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [saveAddress, setSaveAddress] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponCode, setCouponCode] = useState(null);
  const [couponReason, setCouponReason] = useState(null);
  const [shippingOptionId, setShippingOptionId] = useState(defaultShippingOption.id);
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState("iyzico");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit_card");
  const [notes, setNotes] = useState("");
  const [orderResult, setOrderResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (checkoutMode === "member") {
      const stored = loadAddressBook();
      setAddressBook(stored);
      if (stored.length) {
        const first = stored[0];
        setSelectedAddressId(first.id);
        setUseDifferentShipping(true);
        setShipping(mapAddressToForm(first));
      }
    } else {
      setSaveAddress(false);
      setSelectedAddressId(null);
      setUseDifferentShipping(false);
      setShipping({ ...initialShipping });
    }
  }, [checkoutMode]);

  const totals = useMemo(
    () =>
      calculateTotals({
        items,
        couponCode,
        shippingOptionId,
        currency: SUPPORTED_CURRENCY,
      }),
    [items, couponCode, shippingOptionId]
  );

  const estimatedDeliveryDate = useMemo(() => {
    const days = totals?.shippingOption?.days ?? 0;
    const date = new Date();
    date.setDate(date.getDate() + Math.max(days, 0));
    return date;
  }, [totals?.shippingOption?.days]);

  const formattedSubtotal = formatCurrency(totals.subtotal, locale);
  const formattedDiscount = formatCurrency(totals.discount, locale);
  const formattedShipping = formatCurrency(totals.shipping, locale);
  const formattedVat = formatCurrency(totals.vat, locale);
  const formattedTotal = formatCurrency(totals.total, locale);

  const isProducts = items.length > 0;

  const handleBillingChange = (field) => (event) => {
    setBilling((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleShippingChange = (field) => (event) => {
    setShipping((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSelectSavedAddress = (id) => {
    setSelectedAddressId(id);
    const selected = addressBook.find((address) => address.id === id);
    if (selected) {
      setUseDifferentShipping(true);
      setShipping(mapAddressToForm(selected));
    }
  };

  const handleApplyCoupon = (event) => {
    event.preventDefault();
    if (!couponInput) {
      setCouponCode(null);
      setCouponReason(null);
      return;
    }
    const evaluation = evaluateCoupon(couponInput, {
      subtotal: totals.subtotal,
      currency: SUPPORTED_CURRENCY,
    });
    if (evaluation.valid && evaluation.coupon) {
      setCouponCode(evaluation.coupon.code);
      setCouponReason(null);
      creteAlert("success", tAlerts("couponApplied"));
    } else {
      setCouponCode(null);
      setCouponReason(evaluation.reason);
      const alertKey = couponReasonToAlertKey[evaluation.reason] || "couponInvalid";
      creteAlert("error", tAlerts(alertKey));
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode(null);
    setCouponInput("");
    setCouponReason(null);
  };

  const createIdempotencyKey = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random()}`;
  };

  const buildItemsPayload = () =>
    totals.items.map((item) => ({
      id: String(item.id),
      title: item.title,
      price: Number(item.price),
      quantity: Number(item.quantity),
      disc: item.disc,
    }));

  const buildCustomerPayload = () => ({
    type: checkoutMode,
    email: billing.email,
    firstName: billing.firstName,
    lastName: billing.lastName,
    phone: billing.phone,
    accountId: checkoutMode === "member" && accountId ? accountId : undefined,
  });

  const handlePlaceOrder = async () => {
    if (!isProducts) {
      creteAlert("error", tAlerts("orderFailed"));
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const shippingAddressPayload = useDifferentShipping
      ? buildAddressPayload(shipping)
      : buildAddressPayload({ ...billing });

    const payload = {
      currency: SUPPORTED_CURRENCY,
      couponCode: couponCode || undefined,
      shippingOptionId,
      items: buildItemsPayload(),
      customer: buildCustomerPayload(),
      billingAddress: buildAddressPayload({ ...billing }),
      shippingAddress: shippingAddressPayload,
      payment: {
        provider: selectedPaymentProvider,
        method: selectedPaymentMethod,
      },
      metadata: {
        notes: notes || undefined,
        saveAddress: checkoutMode === "member" && saveAddress,
      },
    };

    try {
      const response = await fetch("/api/checkout/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": createIdempotencyKey(),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "order_failed");
      }

      setOrderResult(data);
      if (checkoutMode === "member" && saveAddress && useDifferentShipping) {
        const nextBook = [...addressBook, createAddressFromForm(shipping)];
        setAddressBook(nextBook);
        persistAddressBook(nextBook);
      }

      if (data?.payment?.requires3DS) {
        creteAlert("warning", tAlerts("orderRequires3DS"));
      } else {
        creteAlert("success", tAlerts("orderPlaced"));
      }
    } catch (error) {
      setErrorMessage(error.message);
      creteAlert("error", tAlerts("orderFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderAction = async (action) => {
    if (!orderResult) return;

    try {
      const response = await fetch("/api/checkout/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": createIdempotencyKey(),
        },
        body: JSON.stringify({ orderId: orderResult.id, action }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "order_failed");
      }
      setOrderResult(data);
      if (action === "cancel") {
        creteAlert("success", tAlerts("orderCancelled"));
      } else {
        creteAlert("success", tAlerts("orderRefunded"));
      }
    } catch (error) {
      creteAlert("error", tAlerts("orderFailed"));
    }
  };

  const canCancelOrder = orderResult && !["cancelled", "refunded"].includes(orderResult.status);
  const canRefundOrder = orderResult && orderResult.status === "confirmed";

  return (
    <div className="ltn__checkout-area mb-105">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="ltn__checkout-inner">
              <div className="ltn__checkout-single-content">
                <h5>{t("checkoutModeLabel")}</h5>
                <div className="d-flex gap-3 flex-wrap">
                  <button
                    type="button"
                    className={`btn btn-sm ${
                      checkoutMode === "guest" ? "theme-btn-1" : "btn-outline-secondary"
                    }`}
                    onClick={() => setCheckoutMode("guest")}
                  >
                    {t("checkoutGuest")}
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${
                      checkoutMode === "member" ? "theme-btn-1" : "btn-outline-secondary"
                    }`}
                    onClick={() => setCheckoutMode("member")}
                  >
                    {t("checkoutMember")}
                  </button>
                </div>
                <p className="mt-2 small text-muted">
                  {checkoutMode === "guest"
                    ? t("checkoutGuestHint")
                    : t("checkoutMemberHint")}
                </p>
                {checkoutMode === "member" && (
                  <p className="mt-2">
                    <Link
                      className="ltn__secondary-color"
                      href="#ltn__returning-customer-login"
                      data-bs-toggle="collapse"
                    >
                      {t("returningCustomerCta")}
                    </Link>
                  </p>
                )}
              </div>

              {checkoutMode === "member" && (
                <div className="ltn__checkout-single-content ltn__returning-customer-wrap">
                  <div
                    id="ltn__returning-customer-login"
                    className="collapse ltn__checkout-single-content-info"
                  >
                    <div className="ltn_coupon-code-form ltn__form-box">
                      <p>{t("pleaseLoginAccount")}</p>
                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-item input-item-name ltn__custom-icon">
                              <input
                                type="text"
                                name="member_email"
                                placeholder={t("placeholders.email")}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-item input-item-name ltn__custom-icon">
                              <input
                                type="password"
                                name="member_password"
                                placeholder={t("placeholders.password")}
                              />
                            </div>
                          </div>
                        </div>
                        <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="button">
                          {tButtons("login")}
                        </button>
                        <label className="input-info-save mb-0">
                          <input type="checkbox" name="remember" /> {tAuth("rememberMe")}
                        </label>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              <div className="ltn__checkout-single-content ltn__coupon-code-wrap">
                <h5>{t("haveCoupon")}</h5>
                <div className="ltn__checkout-single-content-info">
                  <form className="ltn__coupon-code-form" onSubmit={handleApplyCoupon}>
                    <p>{t("couponCodeMessage")}</p>
                    <div className="d-flex gap-2 flex-wrap">
                      <input
                        type="text"
                        name="coupon-code"
                        value={couponInput}
                        onChange={(event) => setCouponInput(event.target.value.toUpperCase())}
                        placeholder={t("couponCodePlaceholder")}
                      />
                      <button className="btn theme-btn-2 btn-effect-2 text-uppercase" type="submit">
                        {tButtons("applyCoupon")}
                      </button>
                      {couponCode && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={handleRemoveCoupon}
                        >
                          {t("removeCoupon")}
                        </button>
                      )}
                    </div>
                    {couponReason && (
                      <p className="text-danger mt-2 small">
                        {t(`couponReasons.${couponReason}`)}
                      </p>
                    )}
                    {couponCode && (
                      <p className="text-success mt-2 small">
                        {t("couponAppliedMessage", { code: couponCode })}
                      </p>
                    )}
                  </form>
                </div>
              </div>

              <div className="ltn__checkout-single-content mt-50">
                <h4 className="title-2">{t("billingDetails")}</h4>
                <div className="ltn__checkout-single-content-info">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          placeholder={t("firstName")}
                          value={billing.firstName}
                          onChange={handleBillingChange("firstName")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          placeholder={t("lastName")}
                          value={billing.lastName}
                          onChange={handleBillingChange("lastName")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-email ltn__custom-icon">
                        <input
                          type="email"
                          placeholder={t("emailAddress")}
                          value={billing.email}
                          onChange={handleBillingChange("email")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-phone ltn__custom-icon">
                        <input
                          type="text"
                          placeholder={t("phoneNumber")}
                          value={billing.phone}
                          onChange={handleBillingChange("phone")}
                        />
                      </div>
                    </div>
                    {checkoutMode === "member" && (
                      <div className="col-md-6">
                        <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="text"
                            placeholder={t("accountIdPlaceholder")}
                            value={accountId}
                            onChange={(event) => setAccountId(event.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-6">
                      <div className="input-item input-item-website ltn__custom-icon">
                        <input
                          type="text"
                          placeholder={t("companyName")}
                          value={billing.company}
                          onChange={handleBillingChange("company")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-website ltn__custom-icon">
                        <input
                          type="text"
                          placeholder={t("companyAddress")}
                          value={billing.companyAddress}
                          onChange={handleBillingChange("companyAddress")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <h6>{t("country")}</h6>
                      <div className="input-item">
                        <select
                          className="nice-select"
                          value={billing.country}
                          onChange={handleBillingChange("country")}
                        >
                          <option value="TR">{t("countries.turkey")}</option>
                          <option value="US">{t("countries.unitedStates")}</option>
                          <option value="GB">{t("countries.unitedKingdom")}</option>
                          <option value="DE">{t("countries.germany")}</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <h6>{t("address")}</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-item">
                            <input
                              type="text"
                              placeholder={t("houseNumberAndStreet")}
                              value={billing.line1}
                              onChange={handleBillingChange("line1")}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-item">
                            <input
                              type="text"
                              placeholder={t("apartmentOptional")}
                              value={billing.line2}
                              onChange={handleBillingChange("line2")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <h6>{t("townCity")}</h6>
                      <div className="input-item">
                        <input
                          type="text"
                          placeholder={t("city")}
                          value={billing.city}
                          onChange={handleBillingChange("city")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <h6>{t("state")}</h6>
                      <div className="input-item">
                        <input
                          type="text"
                          placeholder={t("state")}
                          value={billing.state}
                          onChange={handleBillingChange("state")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <h6>{t("zip")}</h6>
                      <div className="input-item">
                        <input
                          type="text"
                          placeholder={t("zip")}
                          value={billing.postalCode}
                          onChange={handleBillingChange("postalCode")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ltn__checkout-single-content mt-50">
                <h4 className="title-2">{t("shippingAddress")}</h4>
                <div className="ltn__checkout-single-content-info">
                  <div className="mb-3">
                    <label className="d-flex align-items-center gap-2">
                      <input
                        type="radio"
                        name="shipping-mode"
                        checked={!useDifferentShipping}
                        onChange={() => setUseDifferentShipping(false)}
                      />
                      <span>{t("sameAsBilling")}</span>
                    </label>
                    <label className="d-flex align-items-center gap-2">
                      <input
                        type="radio"
                        name="shipping-mode"
                        checked={useDifferentShipping}
                        onChange={() => setUseDifferentShipping(true)}
                      />
                      <span>{t("differentShipping")}</span>
                    </label>
                  </div>

                  {checkoutMode === "member" && addressBook.length > 0 && (
                    <div className="mb-3">
                      <h6>{t("addressBookTitle")}</h6>
                      <div className="d-flex flex-column gap-2">
                        {addressBook.map((address) => (
                          <label
                            key={address.id}
                            className="d-flex align-items-center justify-content-between gap-3 border rounded p-3"
                          >
                            <span>
                              <input
                                type="radio"
                                className="me-2"
                                checked={selectedAddressId === address.id}
                                onChange={() => handleSelectSavedAddress(address.id)}
                              />
                              <strong>{t(`addressLabels.${address.label || "saved"}`)}</strong>
                              <small className="d-block text-muted">
                                {address.line1}, {address.city}
                              </small>
                            </span>
                            <span className="text-muted small">{address.phone}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {useDifferentShipping && (
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="text"
                            placeholder={t("firstName")}
                            value={shipping.firstName}
                            onChange={handleShippingChange("firstName")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="text"
                            placeholder={t("lastName")}
                            value={shipping.lastName}
                            onChange={handleShippingChange("lastName")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-phone ltn__custom-icon">
                          <input
                            type="text"
                            placeholder={t("phoneNumber")}
                            value={shipping.phone}
                            onChange={handleShippingChange("phone")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-email ltn__custom-icon">
                          <input
                            type="email"
                            placeholder={t("emailAddress")}
                            value={shipping.email}
                            onChange={handleShippingChange("email")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-item">
                          <input
                            type="text"
                            placeholder={t("houseNumberAndStreet")}
                            value={shipping.line1}
                            onChange={handleShippingChange("line1")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-item">
                          <input
                            type="text"
                            placeholder={t("apartmentOptional")}
                            value={shipping.line2}
                            onChange={handleShippingChange("line2")}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-item">
                          <input
                            type="text"
                            placeholder={t("city")}
                            value={shipping.city}
                            onChange={handleShippingChange("city")}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-item">
                          <input
                            type="text"
                            placeholder={t("state")}
                            value={shipping.state}
                            onChange={handleShippingChange("state")}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-item">
                          <input
                            type="text"
                            placeholder={t("zip")}
                            value={shipping.postalCode}
                            onChange={handleShippingChange("postalCode")}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-item">
                          <input
                            type="text"
                            placeholder={t("country")}
                            value={shipping.country}
                            onChange={handleShippingChange("country")}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {checkoutMode === "member" && (
                    <div className="mt-3">
                      <label className="input-info-save">
                        <input
                          type="checkbox"
                          checked={saveAddress}
                          onChange={(event) => setSaveAddress(event.target.checked)}
                        />
                        {t("saveAddressToBook")}
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="ltn__checkout-single-content mt-50">
                <h4 className="title-2">{t("shippingOptionsTitle")}</h4>
                <div className="ltn__checkout-single-content-info d-flex flex-column gap-2">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`border rounded p-3 d-flex justify-content-between align-items-start gap-3 ${
                        shippingOptionId === option.id ? "border-2" : ""
                      }`}
                    >
                      <span>
                        <input
                          type="radio"
                          className="me-2"
                          name="shipping-option"
                          checked={shippingOptionId === option.id}
                          onChange={() => setShippingOptionId(option.id)}
                        />
                        <strong>{t(option.label)}</strong>
                        <small className="d-block text-muted">
                          {t(option.description, { days: option.days })}
                        </small>
                      </span>
                      <span className="fw-bold">
                        {option.cost === 0
                          ? t("freeShipping")
                          : formatCurrency(option.cost, locale)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="ltn__checkout-single-content mt-50">
                <h4 className="title-2">{t("paymentMethod")}</h4>
                <div className="ltn__checkout-single-content-info">
                  <div className="d-flex flex-column gap-3">
                    {PAYMENT_PROVIDERS.map((provider) => (
                      <label
                        key={provider.id}
                        className={`border rounded p-3 d-flex flex-column gap-1 ${
                          selectedPaymentProvider === provider.id ? "border-2" : ""
                        }`}
                      >
                        <span className="d-flex justify-content-between align-items-center">
                          <span>
                            <input
                              type="radio"
                              className="me-2"
                              name="payment-provider"
                              checked={selectedPaymentProvider === provider.id}
                              onChange={() => setSelectedPaymentProvider(provider.id)}
                            />
                            <strong>{t(provider.translationKey)}</strong>
                          </span>
                        </span>
                        <small className="text-muted">
                          {t(PAYMENT_PROVIDER_DESCRIPTIONS[provider.id])}
                        </small>
                      </label>
                    ))}
                  </div>

                  <div className="mt-3">
                    <h6>{t("paymentMethodChoice")}</h6>
                    <div className="d-flex gap-3 flex-wrap">
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          className={`btn btn-sm ${
                            selectedPaymentMethod === method.id
                              ? "theme-btn-1"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          {t(method.labelKey)}
                        </button>
                      ))}
                    </div>
                    <p className="small text-muted mt-2">
                      {t("payment3dsDescription")}
                    </p>
                  </div>

                  <div className="ltn__payment-note mt-30 mb-30">
                    <p>{t("privacyPolicyMessage")}</p>
                  </div>
                  <textarea
                    className="w-100"
                    rows={3}
                    placeholder={t("orderNotesPlaceholder")}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {!isProducts ? (
              <Nodata text={t("noProduct") || ""} />
            ) : (
              <div className="shoping-cart-total mt-50">
                <h4 className="title-2">{t("orderSummary")}</h4>
                <table className="table">
                  <tbody>
                    {currentProduct ? (
                      <CheckoutProduct product={currentProduct} />
                    ) : (
                      (cartProducts || []).map((product, index) => (
                        <CheckoutProduct key={index} product={product} />
                      ))
                    )}
                    <tr>
                      <td>{t("cartSubtotal")}</td>
                      <td>{formattedSubtotal}</td>
                    </tr>
                    <tr>
                      <td>{t("discount")}</td>
                      <td>{formattedDiscount}</td>
                    </tr>
                    <tr>
                      <td>{t("shippingHandling")}</td>
                      <td>{formattedShipping}</td>
                    </tr>
                    <tr>
                      <td>{t("vat")}</td>
                      <td>{formattedVat}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>{t("total")}</strong>
                      </td>
                      <td>
                        <strong>{formattedTotal}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="border rounded p-3 mb-3">
                  <p className="mb-1">
                    <strong>{t("estimatedDelivery")}: </strong>
                    {formatDate(estimatedDeliveryDate, locale)}
                  </p>
                  <p className="mb-0 small text-muted">
                    {t("shippingOptionSelected", {
                      option: t(totals.shippingOption?.label || "standardShipping"),
                    })}
                  </p>
                </div>

                <div className="text-center mb-3">
                  <Image src={paymentImage} alt="payment" width={131} height={110} />
                  <p className="small text-muted mt-2">{t("securePayment")}</p>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="btn theme-btn-1 btn-effect-1 text-uppercase w-100"
                  type="button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("processingOrder") : tButtons("placeOrder")}
                </button>
                {errorMessage && (
                  <p className="text-danger small mt-2">{errorMessage}</p>
                )}

                {orderResult && (
                  <div className="border rounded p-3 mt-4">
                    <h6>{t("orderConfirmation")}</h6>
                    <p className="mb-1">
                      {t("orderNumber")}: <strong>{orderResult.id}</strong>
                    </p>
                    <p className="mb-1">
                      {t("orderDate")}: {formatDate(orderResult.createdAt, locale)}
                    </p>
                    <p className="mb-1">
                      {t("orderStatusLabel")}: {t(`orderStatuses.${orderResult.status}`)}
                    </p>
                    {orderResult.payment?.requires3DS && orderResult.payment?.redirectUrl && (
                      <p className="mt-2">
                        <Link
                          className="ltn__secondary-color"
                          href={orderResult.payment.redirectUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("complete3ds")}
                        </Link>
                      </p>
                    )}
                    <div className="d-flex gap-2 mt-3">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleOrderAction("cancel")}
                        disabled={!canCancelOrder}
                      >
                        {t("cancelOrder")}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleOrderAction("refund")}
                        disabled={!canRefundOrder}
                      >
                        {t("requestRefund")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPrimary;
