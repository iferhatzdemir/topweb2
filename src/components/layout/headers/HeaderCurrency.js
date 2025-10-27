import Link from "next/link";
import React from "react";

const HeaderCurrency = () => {
  return (
    <div className="ltn__drop-menu ltn__currency-menu">
      <ul>
        <li>
          <Link href="#" className="dropdown-toggle">
            <span className="active-currency">USD</span>
          </Link>
          <ul>
            <li>
              <Link href="/login">USD - US Dollar</Link>
            </li>
            <li>
              <Link href="/wishlist">CAD - Canada Dollar</Link>
            </li>
            <li>
              <Link href="/register">EUR - Euro</Link>
            </li>
            <li>
              <Link href="/account">GBP - British Pound</Link>
            </li>
            <li>
              <Link href="/wishlist">INR - Indian Rupee</Link>
            </li>
            <li>
              <Link href="/wishlist">BDT - Bangladesh Taka</Link>
            </li>
            <li>
              <Link href="/wishlist">JPY - Japan Yen</Link>
            </li>
            <li>
              <Link href="/wishlist">AUD - Australian Dollar</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default HeaderCurrency;
