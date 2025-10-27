import Image from "next/image";
import Link from "next/link";
import React from "react";

const HotDeal3 = () => {
  return (
    <div className="ltn__call-to-action-area ltn__call-to-action-4 section-bg-1 pt-110 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <Image src="/img/banner/11.png" height={1000} width={500} alt="#" />
          </div>
          <div className="col-lg-7">
            <div className="call-to-action-inner call-to-action-inner-4 text-color-white--- text-center---">
              <div className="section-title-area ltn__section-title-2 text-center---">
                <h6 className="ltn__secondary-color">Todays Hot Deals</h6>
                <h1 className="section-title">
                  Original Stock Honey <br /> Combo Package
                </h1>
              </div>
              <div
                className="ltn__countdown ltn__countdown-3 bg-white--"
                data-countdown="2026/12/28"
              ></div>
              <div className="btn-wrapper animated">
                <Link
                  href="/shop"
                  className="theme-btn-1 btn btn-effect-1 text-uppercase"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotDeal3;
