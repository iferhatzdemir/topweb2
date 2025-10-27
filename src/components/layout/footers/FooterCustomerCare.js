"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/client";

const FooterCustomerCare = () => {
  const [currentLocale, setCurrentLocale] = useState('tr');
  const { t } = useTranslation(currentLocale, 'footer');

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
    const locale = getCookie('i18next') || 'tr';
    setCurrentLocale(locale);
  }, []);

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
