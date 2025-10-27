import Image from "next/image";
import Link from "next/link";
import React from "react";

const PortfolionCard = ({ portfolioSingle }) => {
  const { id, title, img, dep } = portfolioSingle;

  return (
    <div className="ltn__img-slide-item-3">
      <Link href={`${img.src}`} data-rel="lightcase:myCollection">
        <Image src={img} alt="Image" placeholder="blur" />
      </Link>
      <div className="ltn__img-slide-info">
        <div className="ltn__img-slide-info-brief">
          <h6>
            {"//"} {dep}
          </h6>
          <h1>
            <Link href={`/portfolio/${id}`}>{title}</Link>
          </h1>
        </div>
        <div className="btn-wrapper">
          <Link
            href={`/portfolio/${id}`}
            className="btn theme-btn-1 btn-effect-1"
          >
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolionCard;
