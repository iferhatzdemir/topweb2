/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import countDiscount from "@/libs/countDiscount";
import countTotalPrice from "@/libs/countTotalPrice";
import sliceText from "@/libs/sliceText";
import { useCartContext } from "@/providers/CartContext";
import { useProductContext } from "@/providers/ProductContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency } from "@/i18n/formatters";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const CartProduct = ({
  product,
  setUpdateProducts,
  updateProducts,
  setIsUpdate,
  isWishlist,
}) => {
  const { id, title, price, quantity: quantity1, image, disc, color } = product;
  // dom referance
  const inputRef = useRef(null);
  // hooks
  const { deleteProductFromCart, addProductToCart } = useCartContext();
  const { deleteProductFromWishlist } = useWishlistContext();
  const [quantity, setQuantity] = useState(quantity1);
  const { setCurrentProduct } = useProductContext();
  // variables
  const { netPrice } = countDiscount(price, disc);
  const totalPrice = countTotalPrice([{ ...product, quantity }]);
  const { t, locale } = useLocale('cart');

  const formattedUnitPrice = useMemo(
    () => formatCurrency(netPrice, locale),
    [netPrice, locale]
  );

  const formattedTotalPrice = useMemo(
    () => formatCurrency(totalPrice, locale),
    [totalPrice, locale]
  );
  const isQuantiy = quantity > 1;

  //   get quantity
  useEffect(() => {
    if (!isWishlist) {
      const inputParent = inputRef.current;
      const input = inputParent.querySelector("input");
      setTimeout(() => {
        const increament = inputParent.querySelector(".inc");
        const decreament = inputParent.querySelector(".dec");

        increament.addEventListener("click", () => {
          setQuantity(parseInt(input.value));
          setIsUpdate(true);
        });
        decreament.addEventListener("click", () => {
          setQuantity(parseInt(input.value));
          setIsUpdate(true);
        });
      }, 500);
    }
  }, [isWishlist]);
  // handle updated products
  useEffect(() => {
    if (!isWishlist) {
      const newUptedProducts = [...updateProducts]?.map((product) =>
        id === product?.id ? { ...product, quantity } : product
      );
      setUpdateProducts(newUptedProducts);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWishlist, quantity]);
  return (
    <tr onMouseEnter={() => setCurrentProduct(product)}>
      <td
        className="cart-product-remove"
        onClick={() =>
          isWishlist
            ? deleteProductFromWishlist(id, title)
            : deleteProductFromCart(id, title)
        }
      >
        x
      </td>
      <td className="cart-product-image">
        <Link href={`/products/${id}`}>
          <Image src={image} alt="#" height={1000} width={1000} />
        </Link>
      </td>
      <td className="cart-product-info">
        <h4>
          <Link href={`/products/${id}`}>{sliceText(title, 30)}</Link>
        </h4>
      </td>
      <td className="cart-product-price">{formattedUnitPrice}</td>
      {isWishlist ? (
        <td className="cart-product-stock">{t('inStock')}</td>
      ) : (
        <td className="cart-product-quantity">
          <div className="cart-plus-minus" ref={inputRef}>
            <input
              value={quantity}
              type="text"
              name="qtybutton"
              className="cart-plus-minus-box"
              onChange={(e) => {
                setQuantity(
                  !parseInt(e.target.value) ? 1 : parseInt(e.target.value)
                );
                setIsUpdate(true);
              }}
            />
          </div>
        </td>
      )}

      {isWishlist ? (
        <td
          className="cart-product-add-cart"
          onClick={() =>
            addProductToCart({
              ...product,
              quantity,
            })
          }
        >
          <Link
            className="submit-button-1"
            href="#"
            title="Sepete Ekle"
            data-bs-toggle="modal"
            data-bs-target="#add_to_cart_modal"
          >
            {t('addToCart')}
          </Link>
        </td>
      ) : (
        <td className="cart-product-subtotal">{formattedTotalPrice}</td>
      )}
    </tr>
  );
};

export default CartProduct;
