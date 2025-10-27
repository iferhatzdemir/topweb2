import Link from "next/link";
import React from "react";

const FooterServices2 = () => {
  return (
    <div className="col-xl-2 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-menu-widget clearfix">
        <h4 className="footer-title">Services.</h4>
        <div className="footer-menu">
          <ul>
            <li>
              <Link href="/order-tracking">Order tracking</Link>
            </li>
            <li>
              <Link href="/wishlist">Wish List</Link>
            </li>
            <li>
              <Link href="/login">Giriş Yap</Link>
            </li>
            <li>
              <Link href="/account">My account</Link>
            </li>
            <li>
              <Link href="/about">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/about">Promotional Offers</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterServices2;
