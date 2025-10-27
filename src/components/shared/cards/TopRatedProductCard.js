import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopRatedProductCard = ({ product, isShowDisc }) => {
  const { title, price, disc, image, id } = product;
  const { netPrice } = countDiscount(price, disc);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);

  return (
    <div className="top-rated-product-item clearfix">
      <div className="top-rated-product-img">
        <Link href={`/products/${id}`}>
          <Image src={image} alt="#" width={1000} height={1000} />
        </Link>
      </div>
      <div className="top-rated-product-info">
        <div className="product-ratting">
          <ul>
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>
          </ul>
        </div>
        <h6>
          <Link href={`/products/${id}`}>{sliceText(title, 25)}</Link>
        </h6>
        <div className="product-price">
          <span>${netPriceModified}</span>
          <del>${priceModified}</del>
        </div>
      </div>
    </div>
  );
};

export default TopRatedProductCard;
