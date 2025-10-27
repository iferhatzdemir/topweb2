"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/shared/buttons/ButtonSecondary";
import Nodata from "@/components/shared/no-data/Nodata";
import countDiscount from "@/libs/countDiscount";
import countTotalPrice from "@/libs/countTotalPrice";
import { useCartContext } from "@/providers/CartContext";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency } from "@/i18n/formatters";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const HeaderCart = () => {
  const { cartProducts, deleteProductFromCart } = useCartContext();
  const { t, locale } = useLocale('cart');
  const totalProduct = cartProducts?.length;
  const totalPrice = countTotalPrice(cartProducts);
  const formattedTotalPrice = formatCurrency(totalPrice, locale);
  const freeShippingMessage = useMemo(
    () => t('freeShippingOver', { amount: formatCurrency(100, locale) }),
    [locale, t]
  );
  return (
    <div
      id="ltn__utilize-cart-menu"
      className="ltn__utilize ltn__utilize-cart-menu"
    >
      <div className="ltn__utilize-menu-inner ltn__scrollbar">
        <div className="ltn__utilize-menu-head">
          <span className="ltn__utilize-menu-title">{t('title')}</span>
          <button className="ltn__utilize-close">×</button>
        </div>
        <div className="mini-cart-product-area ltn__scrollbar">
          {!totalProduct ? (
            <Nodata text={t('emptyCart')} />
          ) : (
            cartProducts?.map(
              ({ id, title, image, price, quantity, disc }, idx) => {
                const { netPrice } = countDiscount(price, disc);
                const formattedUnitPrice = formatCurrency(netPrice, locale);
                return (
                  <div key={idx} className="mini-cart-item clearfix">
                    <div className="mini-cart-img">
                      <Link href={`/products/${id}`}>
                        <Image
                          src={image}
                          alt="Image"
                          width={1000}
                          height={1000}
                        />
                      </Link>
                      <span
                        onClick={() => deleteProductFromCart(id, title)}
                        className="mini-cart-item-delete"
                      >
                        <i className="icon-cancel"></i>
                      </span>
                    </div>
                    <div className="mini-cart-info">
                      <h6>
                        <Link href={`/products/${id}`}>
                          {" "}
                          {title?.length > 22 ? title?.slice(0, 22) : title}
                        </Link>
                      </h6>
                      <span className="mini-cart-quantity">
                        {t('unitPriceWithQuantity', {
                          count: quantity,
                          price: formattedUnitPrice,
                        })}
                      </span>
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>
        <div className="mini-cart-footer">
          <div className="mini-cart-sub-total">
            <h5>
              {t('subtotal')}: <span>{formattedTotalPrice}</span>
            </h5>
          </div>
          <div className="btn-wrapper">
            <ButtonPrimary text={t('viewCart')} path={'/cart'} />
            <ButtonSecondary text={t('proceedToCheckout')} path={'/checkout'} />
          </div>
          <p>{freeShippingMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
