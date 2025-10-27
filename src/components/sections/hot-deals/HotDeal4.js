import Image from "next/image";
import Link from "next/link";
import React from "react";

const HotDeal4 = () => {
  return (
    <div className="ltn__banner-area mt-120">
      <div className="container">
        <div className="row  justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="ltn__banner-item">
              <div className="ltn__banner-img">
                <Link href="/shop">
                  <Image
                    src="/img/banner/1.jpg"
                    width={740}
                    height={500}
                    alt="Banner Image"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="ltn__banner-item">
              <div className="ltn__banner-img">
                <Link href="/shop">
                  <Image
                    src="/img/banner/2.jpg"
                    width={740}
                    height={500}
                    alt="Banner Image"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="ltn__banner-item">
              <div className="ltn__banner-img">
                <Link href="/shop">
                  <Image
                    src="/img/banner/3.jpg"
                    width={740}
                    height={500}
                    alt="Banner Image"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotDeal4;
