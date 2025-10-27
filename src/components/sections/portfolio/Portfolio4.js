import getAllPortfolios from "@/libs/getAllPortfolios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Portfolio4 = () => {
  const prortfolio = getAllPortfolios()?.filter(({ id }) => id > 18 && id < 24);
  return (
    <div className="ltn__img-slider-area">
      <div className="container-fluid">
        <div className="row ltn__image-slider-4-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all">
          {prortfolio?.map(({ img }, idx) => (
            <div className="col-lg-12" key={idx}>
              <div className="ltn__img-slide-item-4">
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

export default Portfolio4;
