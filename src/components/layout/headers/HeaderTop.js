"use client";
import { useHeaderContex } from "@/providers/HeaderContex";
import Link from "next/link";
import React from "react";
import { useLocale } from "@/hooks/useLocale";

const HeaderTop = () => {
  const { headerStyle, headerSize, headerTopBg } = useHeaderContex();
  const { t, locale: currentLocale } = useLocale('header');

  return (
    <div
      className={`ltn__header-top-area ${
        headerStyle === 2 || headerStyle === 4 || headerTopBg === "dark"
          ? "top-area-color-white "
          : ""
      } ${headerSize === "lg" ? "plr--9" : ""}`}
    >
      <div
        className={` ${headerSize === "lg" ? "container-fluid" : "container"}`}
      >
        <div className="row">
          <div className="col-md-7">
            <div className="ltn__top-bar-menu">
              <ul>
                {" "}
                <li>
                  <Link href="/locations">
                    <i className="icon-placeholder"></i> {t('topBar.address')}
                  </Link>
                </li>{" "}
                <li>
                  <Link href={`mailto:${t('topBar.email')}?Subject=Flower%20greetings%20to%20you`}>
                    <i className="icon-mail"></i> {t('topBar.email')}
                  </Link>
                </li>{" "}
              </ul>
            </div>
          </div>
          <div className="col-md-5">
            <div className="top-bar-right text-end">
              <div className="ltn__top-bar-menu">
                <ul>
                  <li>
                    {/* <!-- ltn__social-media --> */}
                    <div className="ltn__social-media">
                      <ul>
                        <li>
                          <Link
                            href="https://www.facebook.com"
                            title="Facebook"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                        </li>{" "}
                        <li>
                          <Link href="https://x.com" title="Twitter">
                            <i className="fa-brands fa-x-twitter"></i>
                          </Link>
                        </li>{" "}
                        <li>
                          <Link
                            href="https://www.instagram.com"
                            title="Instagram"
                          >
                            <i className="fab fa-instagram"></i>
                          </Link>
                        </li>{" "}
                        <li>
                          <Link
                            href="https://www.dribbble.com"
                            title="Dribbble"
                          >
                            <i className="fab fa-dribbble"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
