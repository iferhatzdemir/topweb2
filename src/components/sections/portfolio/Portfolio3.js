import getAllPortfolios from "@/libs/getAllPortfolios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Portfolio3 = ({ pb }) => {
  const portfolio = getAllPortfolios()?.filter(({ id }) => id > 22 && id < 29);

  return (
    <div
      className={`ltn__img-slider-area ltn__img-slider-2 section-bg-1 pt-115  ${
        pb ? pb : "pb-250"
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h6 className="section-subtitle ltn__secondary-color">
                {"//"} Portfolio
              </h6>
              <h1 className="section-title">
                We Have Done<span>.</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row ltn__image-slider-2-active slick-arrow-1 slick-arrow-1-inner">
          {portfolio?.map(({ img }, idx) => (
            <div key={idx} className="col-lg-12">
              <div className="ltn__img-slide-item-2">
                <Link href={img} data-rel="lightcase:myCollection">
                  <Image src={img} alt="Image" width={800} height={562} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio3;
