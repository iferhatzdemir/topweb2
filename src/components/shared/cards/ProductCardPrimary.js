"use client";
import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import { useProductContext } from "@/providers/ProductContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCardPrimary = ({ product, isShowDisc }) => {
  const { title, price, disc, image, id, status, color } = product
    ? product
    : {};
  const { setCurrentProduct } = useProductContext();
  const { netPrice } = countDiscount(price, disc);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);
  const { addProductToCart } = useCartContext();
  const { addProductToWishlist } = useWishlistContext();

  return (
    <div
      className="ltn__product-item ltn__product-item-3 text-center"
      onMouseEnter={() => setCurrentProduct(product)}
    >
      <div className="product-img">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt="#"
            width={1000}
            height={1000}
            // placeholder="blur"
          />
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
        <div className="product-hover-action">
          <ul>
            <li>
              <Link
                href="#"
                title="Hızlı Görünüm"
                data-bs-toggle="modal"
                data-bs-target="#quick_view_modal"
              >
                <i className="far fa-eye"></i>
              </Link>
            </li>{" "}
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
                title="Sepete Ekle"
                data-bs-toggle="modal"
                data-bs-target="#add_to_cart_modal"
              >
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>{" "}
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  addProductToWishlist({ ...product, quantity: 1 });
                }}
                href="#"
                title="Favorilere Ekle"
                data-bs-toggle="modal"
                data-bs-target="#liton_wishlist_modal"
              >
                <i className="far fa-heart"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="product-info">
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
          <Link href={`/products/${id}`}>{title}</Link>
        </h2>
        <div className="product-price">
          <span>${netPriceModified}</span> <del>${priceModified}</del>
        </div>
      </div>
    </div>
  );
};

export default ProductCardPrimary;
