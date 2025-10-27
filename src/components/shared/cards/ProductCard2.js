import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard2 = ({ product }) => {
  const { title, price, disc, image, id } = product;
  const { netPrice } = countDiscount(price, disc);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);

  return (
    <div className="ltn__small-product-item">
      <div className="small-product-item-img">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt="Image"
            // placeholder="blur"
            width={1000}
            height={1000}
          />
        </Link>
      </div>
      <div className="small-product-item-info">
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
                <i className="fas fa-star-half-alt"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="far fa-star"></i>
              </Link>
            </li>
          </ul>
        </div>
        <h2 className="product-title">
          <Link href={`/products/${id}`}>
            {title.length > 18 ? title.slice(0, 18) : title}
          </Link>
        </h2>
        <div className="product-price">
          <span>${netPriceModified}</span> <del>${priceModified}</del>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
