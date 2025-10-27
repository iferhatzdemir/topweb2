"use client";
import { useEffect } from "react";
import Header from "@/components/layout/headers/Header";
import HeaderContex from "@/providers/HeaderContex";
import CartContextProvider from "@/providers/CartContext";
import Footer from "@/components/layout/footers/Footer";
import FooterContexProvider from "@/providers/FooterContext";

import Preloader from "../others/Preloader";
import main from "@/libs/main";
import WishlistContextProvider from "@/providers/WshlistContext";
import ProductContext from "@/providers/ProductContext";

const PageWrapper = ({
  children,
  headerStyle,
  headerSize,
  headerTopStyle,
  isNotHeaderTop,
  headerTopBg,
  isHeaderRight,
  isStickyOnMobile,
  isTextWhite,
  navBg,
  isNotHeaderRight,
  isHeaderSupport,
  isNavbarAppointmentBtn,
  isNotTransparent,
  footerBg,
  isCommingSoon,
}) => {
  useEffect(() => {
    main();
  }, []);
  return (
    <div className="body-wrapper">
      {isCommingSoon ? (
        children
      ) : (
        <CartContextProvider>
          <WishlistContextProvider>
            <HeaderContex
              value={{
                headerStyle,
                headerSize,
                headerTopStyle,
                isNotHeaderTop,
                headerTopBg,
                isTextWhite,
                isStickyOnMobile,
                navBg,
                isHeaderRight,
                isNotHeaderRight,
                isHeaderSupport,
                isNavbarAppointmentBtn,
                isNotTransparent,
              }}
            >
              <Header />
            </HeaderContex>

            <ProductContext>{children}</ProductContext>
          </WishlistContextProvider>

          <FooterContexProvider value={{ footerBg }}>
            <Footer />
          </FooterContexProvider>
        </CartContextProvider>
      )}

      <Preloader />
    </div>
  );
};

export default PageWrapper;
