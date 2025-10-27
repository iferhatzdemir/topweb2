"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/client";

const FooterCompany = () => {
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
        <h4 className="footer-title">{t('company.title')}</h4>
        <div className="footer-menu">
          <ul>
            <li>
              <Link href="/about">{t('company.about')}</Link>
            </li>
            <li>
              <Link href="/blogs">{t('company.blog')}</Link>
            </li>
            <li>
              <Link href="/shop">{t('company.allProducts')}</Link>
            </li>
            <li>
              <Link href="/locations">{t('company.locationsMap')}</Link>
            </li>
            <li>
              <Link href="/faq">{t('company.faq')}</Link>
            </li>
            <li>
              <Link href="/contact">{t('company.contactUs')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterCompany;
