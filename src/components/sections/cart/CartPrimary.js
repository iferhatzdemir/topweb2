/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CartProduct from "@/components/shared/cart/CartProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import useSweetAlert from "@/hooks/useSweetAlert";
import { useLocale } from "@/hooks/useLocale";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import countTotalPrice from "@/libs/countTotalPrice";
import { useCartContext } from "@/providers/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/i18n/formatters";

const CartPrimary = () => {
  const { cartProducts: currentProducts, setCartProducts } = useCartContext();
  const creteAlert = useSweetAlert();
  const { t, locale } = useLocale('cart');
  const { t: tAlerts } = useLocale('alerts');
  const cartProducts = currentProducts;
  // stats
  const [updateProducts, setUpdateProducts] = useState(cartProducts);

  const [isUpdate, setIsUpdate] = useState(false);
  const [isClient, setIsisClient] = useState(false);
  const subTotalPrice = countTotalPrice(cartProducts);
  const vat = subTotalPrice ? 15 : 0;
  const formattedSubtotal = formatCurrency(subTotalPrice, locale);
  const formattedShipping = formatCurrency(vat, locale);
  const formattedVat = formatCurrency(0, locale);
  const formattedTotal = formatCurrency(subTotalPrice + vat, locale);
  const isCartProduct = cartProducts?.length || false;

  // update cart
  const handleUpdateCart = () => {
    addItemsToLocalstorage("cart", [...updateProducts]);
    setCartProducts([...updateProducts]);
    creteAlert("success", tAlerts('cartUpdated'));
    setIsUpdate(false);
  };
  useEffect(() => {
    setUpdateProducts([...cartProducts]);
    setIsisClient(true);
  }, [cartProducts]);
  return (
    <div className="liton__shoping-cart-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping-cart-inner">
              <div className="shoping-cart-table table-responsive">
                {isClient ? (
                  <table className="table">
                    <tbody>
                      {!isCartProduct ? (
                        <tr>
                          <td>
                            <Nodata text={t('emptyCart')} />
                          </td>
                        </tr>
                      ) : (
                        cartProducts?.map((product, idx) => (
                          <CartProduct
                            key={idx}
                            product={product}
                            updateProducts={updateProducts}
                            setUpdateProducts={setUpdateProducts}
                            setIsUpdate={setIsUpdate}
                          />
                        ))
                      )}

                      <tr className="cart-coupon-row">
                        <td colSpan="6">
                          <div className="cart-coupon">
                            <input
                              type="text"
                              name="cart-coupon"
                              placeholder={t('couponCode')}
                            />{" "}
                            <button
                              type="submit"
                              className="btn theme-btn-2 btn-effect-2"
                            >
                              {t('applyCoupon')}
                            </button>
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={handleUpdateCart}
                            type="submit"
                            className={`btn theme-btn-2  ${
                              isUpdate ? "" : "disabled"
                            }`}
                            disabled={isUpdate ? false : true}
                          >
                            {t('updateCart')}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>
              <div className="shoping-cart-total mt-50">
                <h4>{t('cartTotals')}</h4>
                {isClient ? (
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>{t('subtotal')}</td>
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
                          <strong>{formattedTotal}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
                <div className="btn-wrapper text-right">
                  <Link
                    href="/checkout"
                    className="theme-btn-1 btn btn-effect-1"
                    disabled={isUpdate ? false : true}
                  >
                    {t('proceedToCheckout')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPrimary;
