import countDiscount from "@/libs/countDiscount";
import sliceText from "@/libs/sliceText";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency } from "@/i18n/formatters";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

const TopRatedProductCard = ({ product, isShowDisc }) => {
  const { title, price, disc, image, id } = product;
  const { netPrice } = countDiscount(price, disc);
  const { locale } = useLocale('products');
  const pricing = useMemo(
    () => ({
      net: formatCurrency(netPrice, locale),
      base: formatCurrency(price, locale),
    }),
    [netPrice, price, locale]
  );

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
          <span>{pricing.net}</span>
          <del>{pricing.base}</del>
        </div>
      </div>
    </div>
  );
};

export default TopRatedProductCard;
