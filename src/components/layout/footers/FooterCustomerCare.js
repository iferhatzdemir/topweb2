"use client";
import Link from "next/link";
import React from "react";
import { useLocale } from "@/hooks/useLocale";

const FooterCustomerCare = () => {
  const { t } = useLocale('footer');

  return (
    <div className="col-xl-2 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-menu-widget clearfix">
        <h4 className="footer-title">{t('customerCare.title')}</h4>
        <div className="footer-menu">
          <ul>
            <li>
              <Link href="/login">{t('customerCare.login')}</Link>
            </li>
            <li>
              <Link href="/account">{t('customerCare.myAccount')}</Link>
            </li>
            <li>
              <Link href="/wishlist">{t('customerCare.wishList')}</Link>
            </li>
            <li>
              <Link href="/order-tracking">{t('customerCare.orderTracking')}</Link>
            </li>
            <li>
              <Link href="/faq">{t('customerCare.faq')}</Link>
            </li>
            <li>
              <Link href="/contact">{t('customerCare.contactUs')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterCustomerCare;
