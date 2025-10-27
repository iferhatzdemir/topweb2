"use client";
import Link from "next/link";
import React from "react";
import { useLocale } from "@/hooks/useLocale";

const FooterCompany = () => {
  const { t } = useLocale('footer');

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
