"use client";
import ButtonOpenMobileMenu from "@/components/shared/buttons/ButtonOpenMobileMenu";
import { useCartContext } from "@/providers/CartContext";
import { useHeaderContex } from "@/providers/HeaderContex";
import Link from "next/link";
import React from "react";
import HeaderCurrency from "./HeaderCurrency";
import countTotalPrice from "@/libs/countTotalPrice";
import HeaderCartShow from "./HeaderCartShow";

const HeaderRight = () => {
  const { headerStyle } = useHeaderContex();
  const { cartProducts } = useCartContext();
  const totalProduct = cartProducts?.length;
  const totalPrice = countTotalPrice(cartProducts);
  return (
    <div
      className={`ltn__header-options  ${
        headerStyle === 3 ? "col" : "ltn__header-options-2"
      }`}
    >
      {headerStyle === 3 ? <HeaderCurrency /> : ""}
      {/* <!-- header-search-1 --> */}{" "}
      <div className="header-search-wrap">
        <div className="header-search-1">
          <div className="search-icon">
            <i className="icon-search for-search-show"></i>
            <i className="icon-cancel  for-search-close"></i>
          </div>
        </div>
        <div className="header-search-1-form">
          <form id="#" method="get" action="#">
            <input type="text" name="search" placeholder="Search here..." />
            <button type="submit">
              <span>
                <i className="icon-search"></i>
              </span>
            </button>
          </form>
        </div>
      </div>
      {/* <!-- user-menu --> */}
      <div className="ltn__drop-menu user-menu">
        <ul>
          <li>
            <Link href="#">
              <i className="icon-user"></i>
            </Link>
            <ul>
              <li>
                <Link href="/login">Sign in</Link>
              </li>
              <li>
                <Link href="/register">Kayıt Ol</Link>
              </li>
              <li>
                <Link href="/account">My Account</Link>
              </li>
              <li>
                <Link href="/wishlist">Wishlist</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {/* <!-- mini-cart --> */}
      {<HeaderCartShow />}
      {/* <!-- mini-cart --> */}
      {/* <!-- Mobile Menu Button --> */}
      <ButtonOpenMobileMenu />
    </div>
  );
};

export default HeaderRight;
