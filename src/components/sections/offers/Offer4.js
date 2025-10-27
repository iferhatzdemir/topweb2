import Image from "next/image";
import Link from "next/link";
import React from "react";

const Offer4 = ({ mt, mb }) => {
  return (
    <div className={`ltn__banner-area ${mb ? mb : ""}  ${mt ? mt : "mt-120"}`}>
      <div className="container">
        <div className="row ltn__custom-gutter--- justify-content-center">
          <div className="col-lg-6 col-md-6">
            <div className="ltn__banner-item">
              <div className="ltn__banner-img">
                <Link href="/shop">
                  <Image
                    src="/img/banner/13.png"
                    height={1000}
                    width={1000}
                    alt="Banner Image"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="ltn__banner-item">
                  <div className="ltn__banner-img">
                    <Link href="/shop">
                      <Image
                        src="/img/banner/14.png"
                        height={1000}
                        width={1000}
                        alt="Banner Image"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="ltn__banner-item">
                  <div className="ltn__banner-img">
                    <Link href="/shop">
                      <Image
                        src="/img/banner/15.png"
                        height={1000}
                        width={1000}
                        alt="Banner Image"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer4;
