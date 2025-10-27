"use client";
import Image from "next/image";
const logoImage1 = "/img/logo.png";
const logoImage2 = "/img/logo-2.png";

import Link from "next/link";
import { useHeaderContex } from "@/providers/HeaderContex";

const Logo = ({ sticky }) => {
  const {
    headerStyle,
    headerSize,
    isNotHeaderTop,
    navBg,
    isHeaderSupport,
    isTextWhite,
  } = useHeaderContex();

  return (
    <div className={sticky ? "sticky-logo" : "col"}>
      <div
        className={`${
          !isHeaderSupport && (headerStyle === 3 || headerStyle === 5)
            ? ""
            : "site-logo-wrap"
        }`}
        style={{ height: "100%" }}
      >
        <div className="site-logo">
          <Link href="/">
            <Image
              src={
                navBg === "secondary" && sticky
                  ? logoImage2
                  : headerStyle === 2 || isTextWhite
                  ? logoImage2
                  : logoImage1
              }
              alt="Logo"
              width={154}
              height={42}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logo;
