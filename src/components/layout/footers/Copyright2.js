"use client";
import { useFooterContex } from "@/providers/FooterContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/client";

const Copyright2 = () => {
  const { footerBg } = useFooterContex();
  const [currentLocale, setCurrentLocale] = useState('tr');
  const { t } = useTranslation(currentLocale, 'footer');
  const currentYear = new Date().getFullYear();

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
    <div
      className={`ltn__copyright-area ltn__copyright-2 ${
        footerBg === "light" ? "section-bg-1 border-top" : "section-bg-2"
      } ${footerBg === "dark" ? "ltn__border-top-2" : ""}  plr--5 `}
    >
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="ltn__copyright-design clearfix">
              <p>
                {t('copyright.text', { year: currentYear })}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-12 align-self-center">
            <div className="ltn__copyright-menu text-end">
              <ul>
                <li>
                  <Link href="#">Terms & Conditions</Link>
                </li>{" "}
                <li>
                  <Link href="#">Claim</Link>
                </li>{" "}
                <li>
                  <Link href="#">Privacy & Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright2;
