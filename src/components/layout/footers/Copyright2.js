"use client";
import { useFooterContex } from "@/providers/FooterContext";
import Link from "next/link";
import React from "react";
import { useLocale } from "@/hooks/useLocale";

const Copyright2 = () => {
  const { footerBg } = useFooterContex();
  const { t, locale } = useLocale('footer');
  const currentYear = new Date().getFullYear();

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
