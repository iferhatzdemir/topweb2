"use client";

import countDiscount from "@/libs/countDiscount";
import sliceText from "@/libs/sliceText";
import { useCartContext } from "@/providers/CartContext";
import { useProductContext } from "@/providers/ProductContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency } from "@/i18n/formatters";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const ProductCardPrimary2 = ({ product, isShowDisc }) => {
  const {
    title,
    desc,
    price,
    disc,
    image,
    id,
    status,
    color,
    run,
    model,
    type,
  } = product;
  const { setCurrentProduct } = useProductContext();
  const { netPrice } = countDiscount(price, disc);
  const { addProductToCart } = useCartContext();
  const { addProductToWishlist } = useWishlistContext();
  const { locale, t } = useLocale('products');

  const pricing = useMemo(() => ({
    net: formatCurrency(netPrice, locale),
    base: formatCurrency(price, locale),
  }), [netPrice, price, locale]);

  const quickViewLabel = t('quickView');
  const addToCartLabel = t('addToCart');
  const addToWishlistLabel = t('addToWishlist');
  return (
    <div
      className="ltn__product-item ltn__product-item-3"
      onMouseEnter={() => setCurrentProduct(product)}
    >
      <div className="product-img">
        <Link href={`/products/${id}`}>
          <Image src={image} alt="#" width={1000} height={1000} />
        </Link>
        {status || isShowDisc ? (
          <div className="product-badge">
            <ul>
              {isShowDisc ? (
                <li className="sale-badge">-{disc}%</li>
              ) : status === "sale" ? (
                <li className="new-badge">{status}</li>
              ) : (
                <li className="sale-badge">{status}</li>
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="product-info">
        <h2 className="product-title">
          <Link href={`/products/${id}`}>{title}</Link>
        </h2>
        <div className="product-ratting">
          <ul>
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fas fa-star-half-alt"></i>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="far fa-star"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="product-price">
          <span>{pricing.net}</span>
          <del>{pricing.base}</del>
        </div>

        <div className="product-brief">
          <p>{sliceText(desc, 140)}</p>
        </div>
        <div className="product-hover-action">
          <ul>
            <li>
              <Link
                href="#"
                title={quickViewLabel}
                data-bs-toggle="modal"
                data-bs-target="#quick_view_modal"
              >
                <i className="far fa-eye"></i>
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  addProductToCart({
                    ...product,
                    quantity: 1,
                    color: color,
                  });
                }}
                href="#"
                title={addToCartLabel}
                data-bs-toggle="modal"
                data-bs-target="#add_to_cart_modal"
              >
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  addProductToWishlist({ ...product, quantity: 1 });
                }}
                href="#"
                title={addToWishlistLabel}
                data-bs-toggle="modal"
                data-bs-target="#liton_wishlist_modal"
              >
                <i className="far fa-heart"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductCardPrimary2;
