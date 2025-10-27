"use client";
import HeaderTop from "./HeaderTop";
import Logo from "./Logo";
import Navbar from "./Navbar";
import HeaderRight from "./HeaderRight";
import MobileMenu from "./MobileMenu";
import HeaderCart from "./HeaderCart";
import { useHeaderContex } from "@/providers/HeaderContex";
import ButtonOpenMobileMenu from "@/components/shared/buttons/ButtonOpenMobileMenu";
import HeaderSearch from "./HeaderSearch";
import HeaderRight2 from "./HeaderRight2";
import MobileMenuShow from "./MobileMenuShow";
import HeaderBottom from "./HeaderBottom";

const Header = () => {
  const {
    headerStyle,
    headerSize,
    isNotHeaderTop,
    isNotHeaderRight,
    isNotTransparent,
    isTextWhite,
    isStickyOnMobile,
  } = useHeaderContex();
  return (
    <>
      <header
        className={`ltn__header-area    ${
          headerStyle === 2
            ? "ltn__header-4 ltn__header-6 ltn__header-transparent gradient-color-2"
            : headerStyle === 3
            ? isNotHeaderRight
              ? "ltn__header-4 "
              : "ltn__header-4 ltn__header-7 "
            : headerStyle === 4
            ? "ltn__header-4 ltn__header-6 "
            : headerStyle === 5
            ? "ltn__header-3 section-bg-6"
            : isNotTransparent
            ? "ltn__header-5"
            : " ltn__header-transparent ltn__header-5  "
        } ${isTextWhite ? "gradient-color-2" : ""}`}
      >
        {/* <!-- ltn__header-top-area start --> */}
        {isNotHeaderTop ? "" : <HeaderTop />}

        {/* <!-- ltn__header-top-area end --> */}

        {/* <!-- ltn__header-middle-area start --> */}
        <div
          className={`ltn__header-middle-area  
            ${headerStyle === 5 ? "" : "ltn__header-sticky"} ${
            isStickyOnMobile ? "sticky-active-into-mobile" : ""
          }  
            ${
              headerStyle === 5
                ? ""
                : headerStyle === 2 || isTextWhite
                ? "ltn__sticky-bg-black"
                : "ltn__sticky-bg-white "
            }  
            ${
              isNotHeaderRight
                ? "ltn__logo-right-menu-option"
                : headerStyle === 5
                ? ""
                : headerStyle === 3
                ? ""
                : "ltn__logo-right-menu-option "
            }  ${headerSize === "lg" ? "plr--9" : ""}`}
        >
          <div
            className={headerSize === "lg" ? "container-fluid" : "container"}
          >
            <div className="row">
              {/* logo */}
              <Logo />
              {/* navbar */}
              {headerStyle === 5 ? (
                <>
                  <HeaderSearch />{" "}
                </>
              ) : (
                <Navbar />
              )}
              {/* header right */}

              {isNotHeaderRight ? (
                <ButtonOpenMobileMenu />
              ) : headerStyle === 2 && headerSize === "lg" ? (
                <HeaderRight />
              ) : headerStyle === 2 || headerStyle === 4 ? (
                <ButtonOpenMobileMenu />
              ) : headerStyle === 5 ? (
                <HeaderRight2 />
              ) : (
                <HeaderRight />
              )}
            </div>
          </div>
        </div>
        {/* <!-- ltn__header-bottom --> */}
        {headerStyle === 5 ? <HeaderBottom /> : ""}
      </header>
      <HeaderCart />
      <MobileMenu />
      <div className="ltn__utilize-overlay"></div>
      {headerStyle === 5 ? <MobileMenuShow /> : ""}
    </>
  );
};

export default Header;
