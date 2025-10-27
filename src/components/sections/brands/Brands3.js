import Image from "next/image";
import React from "react";

const Brands3 = ({ type }) => {
  const brands = [
    "/img/brand-logo/1.png",
    "/img/brand-logo/2.png",
    "/img/brand-logo/3.png",
    "/img/brand-logo/4.png",
    "/img/brand-logo/5.png",
    "/img/brand-logo/3.png",
  ];
  return (
    <div
      className={`ltn__brand-logo-area ltn__brand-logo-1 section-bg-6 ${
        type === 2 ? "border-bottom" : ""
      } border-top  pt-35 pb-35 plr--9`}
    >
      <div className="container-fluid">
        <div className="row ltn__brand-logo-active">
          {brands?.map((brand, idx) => (
            <div key={idx} className="col-lg-12">
              <div className="ltn__brand-logo-item">
                <Image src={brand} alt="Brand Logo" width={160} height={128} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands3;
