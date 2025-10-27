"use client";
import React from "react";
import Navbar from "./Navbar";
import { useHeaderContex } from "@/providers/HeaderContex";

const HeaderBottom = () => {
  const { navBg } = useHeaderContex();
  return (
    <div
      className={`header-bottom-area ltn__border-top ltn__header-sticky ${
        navBg === "secondary"
          ? "ltn__sticky-bg-secondary ltn__secondary-bg menu-color-white"
          : "ltn__sticky-bg-white"
      }    section-bg-1  d-none d-lg-block`}
    >
      <div className="container">
        <div className="row">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
