import Image from "next/image";
import Link from "next/link";
import React from "react";

const OfferCard = ({ offer }) => {
  const { title, subTitle, image, category, title2 } = offer;
  return (
    <div className="ltn__banner-item ltn__banner-style-3">
      <div className="ltn__banner-img">
        <Link href="/shop">
          <Image src={image} alt="Image" placeholder="blur" />
        </Link>
      </div>
      <div className="ltn__banner-info">
        <div className="product-price ltn__secondary-color">
          <strong>
            <span>{subTitle}</span>
          </strong>
        </div>
        <h2 className="white-color text-capitalize">
          <Link href="/shop">
            {title} <br />
            {title2}
          </Link>
        </h2>
      </div>
      <div className="banner-button">
        <Link href={`/shop?category=${category}`}>
          <i className="fas fa-arrow-right"></i>{" "}
        </Link>
      </div>
    </div>
  );
};

export default OfferCard;
