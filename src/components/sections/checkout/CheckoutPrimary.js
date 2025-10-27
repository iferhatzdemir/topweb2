/* eslint-disable jsx-a11y/role-supports-aria-props */
"use client";

import CheckoutProduct from "@/components/shared/checkout/CheckoutProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import countTotalPrice from "@/libs/countTotalPrice";
import getAllProducts from "@/libs/getAllProducts";
import { useCartContext } from "@/providers/CartContext";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useSweetAlert from "@/hooks/useSweetAlert";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency } from "@/i18n/formatters";

const paymnetImage3 = "/img/icons/payment-3.png";
const COUNTRY_KEYS = [
  "australia",
  "canada",
  "china",
  "morocco",
  "saudiArabia",
  "unitedKingdom",
  "unitedStates",
];

const CheckoutPrimary = () => {
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const creteAlert = useSweetAlert();
  const allProducts = getAllProducts();
  const searchParams = useSearchParams();
  const currentId = parseInt(searchParams.get("id"));
  const currentQuantity = parseInt(searchParams.get("quantity"));
  const currentColor = searchParams.get("color");
  const currentSize = searchParams.get("size");
  const { cartProducts: products } = useCartContext();
  const { locale, t } = useLocale('checkout');
  const { t: tAlerts } = useLocale('alerts');
  const { t: tButtons } = useLocale('buttons');
  const { t: tAuth } = useLocale('auth');

  const currentProduct = useMemo(
    () => ({
      ...allProducts?.find(({ id }) => id === currentId),
      quantity: currentQuantity,
      color: currentColor,
      size: currentSize,
    }),
    [allProducts, currentColor, currentId, currentQuantity, currentSize]
  );

  const isProducts = currentProduct?.title || products?.length ? true : false;
  const subtotal = countTotalPrice(
    currentId ? [{ ...currentProduct, quantity: currentQuantity }] : products
  );
  const shipping = 15;
  const formattedSubtotal = formatCurrency(subtotal, locale);
  const formattedShipping = formatCurrency(shipping, locale);
  const formattedVat = formatCurrency(0, locale);
  const formattedTotalPrice = formatCurrency(subtotal + shipping, locale);

  const handlePlaceOrder = () => {
    creteAlert("error", tAlerts('demoMode'));
    setIsPlaceOrder(false);
  };

  useEffect(() => {
    if (isProducts) {
      setIsPlaceOrder(true);
    }
  }, [isProducts]);

  return (
    <div className="ltn__checkout-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__checkout-inner">
              {/* login */}
              <div className="ltn__checkout-single-content ltn__returning-customer-wrap">
                <h5>
                  {t('returningCustomer')}{" "}
                  <Link
                    className="ltn__secondary-color"
                    href="#ltn__returning-customer-login"
                    data-bs-toggle="collapse"
                  >
                    {t('returningCustomerCta')}
                  </Link>
                </h5>
                <div
                  id="ltn__returning-customer-login"
                  className="collapse ltn__checkout-single-content-info"
                >
                  <div className="ltn_coupon-code-form ltn__form-box">
                    <p>{t('pleaseLoginAccount')}</p>
                    <form action="#">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-item input-item-name ltn__custom-icon">
                            <input
                              type="text"
                              name="ltn__name"
                              placeholder={t('placeholders.name')}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-item input-item-email ltn__custom-icon">
                            <input
                              type="email"
                              name="ltn__email"
                              placeholder={t('placeholders.email')}
                            />
                          </div>
                        </div>
                      </div>
                      <button className="btn theme-btn-1 btn-effect-1 text-uppercase">
                        {tButtons('login')}
                      </button>
                      <label className="input-info-save mb-0">
                        <input type="checkbox" name="agree" /> {tAuth('rememberMe')}
                      </label>
                      <p className="mt-30">
                        <Link href="/register">{t('lostPassword')}</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
              {/* coupon */}
              <div className="ltn__checkout-single-content ltn__coupon-code-wrap">
                <h5>
                  {t('haveCoupon')}{" "}
                  <Link
                    className="ltn__secondary-color"
                    href="#ltn__coupon-code"
                    data-bs-toggle="collapse"
                  >
                    {t('couponCodeCta')}
                  </Link>
                </h5>
                <div
                  id="ltn__coupon-code"
                  className="collapse ltn__checkout-single-content-info"
                >
                  <div className="ltn__coupon-code-form">
                    <p>{t('couponCodeMessage')}</p>
                    <form action="#">
                      <input
                        type="text"
                        name="coupon-code"
                        placeholder={t('couponCodePlaceholder')}
                      />
                      <button className="btn theme-btn-2 btn-effect-2 text-uppercase">
                        {tButtons('applyCoupon')}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* buyer info */}
              <div className="ltn__checkout-single-content mt-50">
                <h4 className="title-2">{t('billingDetails')}</h4>
                <div className="ltn__checkout-single-content-info">
                  <form action="#">
                    <h6>{t('personalInformation')}</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="text"
                            name="ltn__name"
                            placeholder={t('firstName')}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="text"
                            name="ltn__lastname"
                            placeholder={t('lastName')}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-email ltn__custom-icon">
                          <input
                            type="email"
                            name="ltn__email"
                            placeholder={t('emailAddress')}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-phone ltn__custom-icon">
                          <input
                            type="text"
                            name="ltn__phone"
                            placeholder={t('phoneNumber')}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-website ltn__custom-icon">
                          <input
                            type="text"
                            name="ltn__company"
                            placeholder={t('companyName')}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-website ltn__custom-icon">
                          <input
                            type="text"
                            name="ltn__companyAddress"
                            placeholder={t('companyAddress')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <h6>{t('country')}</h6>
                        <div className="input-item">
                          <select className="nice-select">
                            <option>{t('selectCountry')}</option>
                            {COUNTRY_KEYS.map((country) => (
                              <option key={country}>{t(`countries.${country}`)}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <h6>{t('address')}</h6>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-item">
                              <input
                                type="text"
                                placeholder={t('houseNumberAndStreet')}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-item">
                              <input
                                type="text"
                                placeholder={t('apartmentOptional')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <h6>{t('townCity')}</h6>
                        <div className="input-item">
                          <input type="text" placeholder={t('city')} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <h6>{t('state')}</h6>
                        <div className="input-item">
                          <input type="text" placeholder={t('state')} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <h6>{t('zip')}</h6>
                        <div className="input-item">
                          <input type="text" placeholder={t('zip')} />
                        </div>
                      </div>
                    </div>
                    <p>
                      <label className="input-info-save mb-0">
                        <input type="checkbox" name="agree" /> {t('createAccount')}
                      </label>
                    </p>
                    <h6>{t('orderNotes')}</h6>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <textarea
                        name="ltn__message"
                        placeholder={t('orderNotesPlaceholder')}
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* payment methods */}
          <div className="col-lg-6">
            <div className="ltn__checkout-payment-method mt-50">
              <h4 className="title-2">{t('paymentMethod')}</h4>

              <div id="checkoutAccordion" className="accordion">
                {/* <!-- card --> */}
                <div className="card ">
                  <h5
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseOne"
                    aria-expanded="false"
                  >
                    {t('checkPayments')}
                  </h5>
                  <div
                    id="chechoutCollapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>
                        {t('checkPaymentsDescription', {
                          storeName: 'Store Name',
                          storeAddress:
                            'Store Street, Store Town, Store State / County, Store Postcode',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h5
                    className="ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseTwo"
                    aria-expanded="true"
                  >
                    {t('cashOnDelivery')}{" "}
                    <Image
                      src="/img/icons/cash.png"
                      alt={t('cashOnDelivery')}
                      width={131}
                      height={110}
                    />
                  </h5>
                  <div
                    id="chechoutCollapseTwo"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>{t('cashOnDeliveryDescription')}</p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h5
                    className="ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseThree"
                    aria-expanded="false"
                  >
                    {t('applePay')}{" "}
                    <Image
                      src="/img/icons/applepay.png"
                      alt={t('applePay')}
                      width={131}
                      height={110}
                    />
                  </h5>
                  <div
                    id="chechoutCollapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>{t('applePayDescription')}</p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h5
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseFour"
                    aria-expanded="false"
                  >
                    {t('paypal')}{" "}
                    <Image
                      src={paymnetImage3}
                      width={319}
                      height={110}
                      style={{ maxWidth: "131px" }}
                      alt={t('paypal')}
                    />
                  </h5>
                  <div
                    id="chechoutCollapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>{t('paypalDescription')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ltn__payment-note mt-30 mb-30">
                <p>{t('privacyPolicyMessage')}</p>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                type="submit"
                disabled={isPlaceOrder ? false : true}
              >
                {t('placeOrderButton')}
              </button>
            </div>
          </div>
          {/* product to buy */}
          <div className="col-lg-6">
            {!isProducts ? (
              <Nodata text={t('noProduct')} />
            ) : (
              <div className="shoping-cart-total mt-50">
                <h4 className="title-2">{t('cartTotals')}</h4>
                <table className="table">
                  <tbody>
                    {currentProduct?.title ? (
                      <CheckoutProduct product={currentProduct} />
                    ) : (
                      products?.map((product, idx) => (
                        <CheckoutProduct key={idx} product={product} />
                      ))
                    )}

                    <tr>
                      <td>{t('cartSubtotal')}</td>
                      <td>{formattedSubtotal}</td>
                    </tr>
                    <tr>
                      <td>{t('shippingHandling')}</td>
                      <td>{formattedShipping}</td>
                    </tr>
                    <tr>
                      <td>{t('vat')}</td>
                      <td>{formattedVat}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>{t('orderTotal')}</strong>
                      </td>
                      <td>
                        <strong>{formattedTotalPrice}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPrimary;
