import React from "react";
import HeaderCartShow from "./HeaderCartShow";
import Link from "next/link";

const HeaderRight2 = () => {
  return (
    <div className="col">
      {/* <!-- header-options --> */}
      <div className="ltn__header-options">
        <ul>
          <li className="d-none">
            {/* <!-- ltn__currency-menu --> */}
            <div className="ltn__drop-menu ltn__currency-menu">
              <ul>
                <li>
                  <Link href="#" className="dropdown-toggle">
                    <span className="active-currency">USD</span>
                  </Link>
                  <ul>
                    <li>
                      <Link href="#">USD - US Dollar</Link>
                    </li>
                    <li>
                      <Link href="#">CAD - Canada Dollar</Link>
                    </li>
                    <li>
                      <Link href="#">EUR - Euro</Link>
                    </li>
                    <li>
                      <Link href="#">GBP - British Pound</Link>
                    </li>
                    <li>
                      <Link href="#">INR - Indian Rupee</Link>
                    </li>
                    <li>
                      <Link href="#">BDT - Bangladesh Taka</Link>
                    </li>
                    <li>
                      <Link href="#">JPY - Japan Yen</Link>
                    </li>
                    <li>
                      <Link href="#">AUD - Australian Dollar</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>{" "}
          <li className="d-lg-none">
            {/* <!-- header-search-1 --> */}
            <div className="header-search-wrap">
              <div className="header-search-1">
                <div className="search-icon">
                  <i className="icon-search  for-search-show"></i>
                  <i className="icon-cancel  for-search-close"></i>
                </div>
              </div>
              <div className="header-search-1-form">
                <form id="#" method="get" action="#">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search here..."
                  />
                  <button type="submit">
                    <span>
                      <i className="icon-search"></i>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </li>{" "}
          <li className="d-none---">
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
          </li>{" "}
          <li style={{ marginRight: 0 }}>
            {/* <!-- mini-cart 2 --> */}
            <HeaderCartShow />
          </li>{" "}
          <li className="d-none">
            {/* <!-- Mobile Menu Button --> */}
            <div className="mobile-menu-toggle d-lg-none d-none">
              <Link
                href="#ltn__utilize-mobile-menu"
                className="ltn__utilize-toggle"
              >
                <svg viewBox="0 0 800 600">
                  <path
                    d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                    id="top"
                  ></path>
                  <path d="M300,320 L540,320" id="middle"></path>
                  <path
                    d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                    id="bottom"
                    transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                  ></path>
                </svg>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderRight2;
