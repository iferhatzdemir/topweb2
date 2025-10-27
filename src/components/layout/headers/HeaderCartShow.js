import countTotalPrice from "@/libs/countTotalPrice";
import { useCartContext } from "@/providers/CartContext";
import { useHeaderContex } from "@/providers/HeaderContex";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency } from "@/i18n/formatters";
import Link from "next/link";
import React, { useMemo } from "react";

const HeaderCartShow = () => {
  const { headerStyle } = useHeaderContex();
  const { cartProducts } = useCartContext();
  const { locale } = useLocale('cart');
  const totalProduct = cartProducts?.length;
  const totalPrice = countTotalPrice(cartProducts);
  const formattedTotalPrice = useMemo(
    () => formatCurrency(totalPrice, locale),
    [totalPrice, locale]
  );
  return (
    <>
      {totalProduct || totalProduct === 0 ? (
        <div
          className={`mini-cart-icon   ${
            headerStyle === 5 ? "mini-cart-icon-2" : ""
          }`}
        >
          <Link href="#ltn__utilize-cart-menu" className="ltn__utilize-toggle">
            <span className={headerStyle === 5 ? "mini-cart-icon" : ""}>
              <i className="icon-shopping-cart"></i> <sup>{totalProduct}</sup>
            </span>
            {headerStyle === 5 ? (
              <h6>
                <span>Your Cart</span>{" "}
                <span className="ltn__secondary-color">
                  {formattedTotalPrice}
                </span>
              </h6>
            ) : (
              ""
            )}
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HeaderCartShow;
