"use client";
import controlModal from "@/libs/controlModal";
import countDiscount from "@/libs/countDiscount";
import { useCartContext } from "@/providers/CartContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCommonContext } from "@/providers/CommonContext";
import moment from "moment";
import countCommentLength from "@/libs/countCommentLength";
import modifyNumber from "@/libs/modifyNumber";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency } from "@/i18n/formatters";
const ProductDetailsRight = ({ product }) => {
  // destructure current product
  const { id, title, price, reviews, disc, size, color } = product;
  // current Date

  // hooks
  const value = useCommonContext();
  const { addProductToCart } = useCartContext();
  const { addProductToWishlist } = useWishlistContext();
  // dom referance
  const inputRef = useRef(null);
  // states
  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState(color);
  const [currentSize, setCurrentSize] = useState(size?.toLowerCase());
  const [purchaseDate, setPurchaseDate] = useState(null);
  // varriables
  const { type } = value ? value : {};
  const { netPrice } = countDiscount(price, disc);
  const { locale, t } = useLocale('products');
  const pricing = useMemo(
    () => ({
      net: formatCurrency(netPrice, locale),
      base: formatCurrency(price, locale),
    }),
    [netPrice, price, locale]
  );
  const reviewsLength = countCommentLength(reviews);
  const purchaseDateMilliseconds = moment(purchaseDate)?.valueOf();
  const productToSave = {
    ...product,
    color: currentColor,
    size: currentSize,
    quantity,
    purchaseDate: purchaseDateMilliseconds,
  };

  useEffect(() => {
    const currentDate = Date.now();
    const calanderFormat = moment(currentDate).format("YYYY-MM-DD");
    setPurchaseDate(calanderFormat);
    const inputParent = inputRef.current;
    const input = inputParent.querySelector("input");

    setTimeout(() => {
      const increament = inputParent.querySelector(".inc");
      const decreament = inputParent.querySelector(".dec");
      increament.addEventListener("click", () => {
        setQuantity(parseInt(input.value));
      });
      decreament.addEventListener("click", () => {
        setQuantity(parseInt(input.value));
      });
    }, 500);
  }, []);
  return (
    <div className="modal-product-info shop-details-info pl-0" id="details">
      {/* ratings */}
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
          </li>{" "}
          <li className="review-total">
            <Link href="#"> ( {modifyNumber(reviewsLength)} Reviews )</Link>
          </li>
        </ul>
      </div>
      {/* title */}
      <h3>{title}</h3>
      {/* price */}
      <div className="product-price text-nowrap">
        <span>{pricing.net}</span> <del>{pricing.base}</del>
      </div>
      {/* description */}

      {/* category, availability */}
      <div className={`modal-product-meta ltn__product-details-menu-1  `}>
        <ul>
          <li
            onClick={() => {
              !type ? controlModal() : "";
            }}
          >
            <strong>Categories:</strong>{" "}
            <span>
              <Link href="/shop?category=fruits">Fruits</Link>{" "}
              <Link href="/shop?category=meat">Meat</Link>{" "}
              <Link href="/shop?category=fish">Fish</Link>{" "}
              <Link href="/shop?category=fried">Fried</Link>
            </span>
          </li>
        </ul>
      </div>
      {/* countdown */}

      {/* add to cart */}
      <div className="ltn__product-details-menu-2">
        <ul>
          <li>
            <div className="cart-plus-minus" ref={inputRef}>
              <input
                onChange={(e) =>
                  setQuantity(
                    !parseInt(e.target.value) ? 1 : parseInt(e.target.value)
                  )
                }
                type="text"
                value={quantity}
                name="qtybutton"
                className="cart-plus-minus-box"
              />
            </div>
          </li>{" "}
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                addProductToCart(productToSave);
              }}
              href="#"
              className="theme-btn-1 btn btn-effect-1"
              title={t('addToCart')}
              data-bs-toggle="modal"
              data-bs-target="#add_to_cart_modal"
            >
              <i className="fas fa-shopping-cart"></i>{' '}
              <span>{t('addToCart')}</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* add to wishlist and compare */}
      <div className="ltn__product-details-menu-3">
        <ul>
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                addProductToWishlist(productToSave);
              }}
              href="#"
              className=""
              title={t('addToWishlist')}
              data-bs-toggle="modal"
              data-bs-target="#liton_wishlist_modal"
            >
              <i className="far fa-heart"></i>{' '}
              <span>{t('addToWishlist')}</span>
            </Link>
          </li>{" "}
          <li>
            <Link
              href="#"
              className=""
              title="Compare"
              data-bs-toggle="modal"
              data-bs-target="#quick_view_modal"
            >
              <i className="fas fa-exchange-alt"></i> <span>Compare</span>
            </Link>
          </li>
        </ul>
      </div>
      <hr />
      {/* socials */}
      <div className="ltn__social-media">
        <ul>
          <li>Share:</li>{" "}
          <li>
            <Link href="https://www.facebook.com" title="Facebook">
              <i className="fab fa-facebook-f"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="https://x.com" title="Twitter">
              <i className="fab fa-twitter"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="https://www.linkedin.com" title="Linkedin">
              <i className="fab fa-linkedin"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="https://www.instagram.com" title="Instagram">
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
        </ul>
      </div>
      {/* checkout image */}
      {type ? (
        <>
          <hr />
          <div className="ltn__safe-checkout">
            <h5>Guaranteed Safe Checkout</h5>
            <Image
              src="/img/icons/payment-2.png"
              alt="Payment Image"
              height={35}
              width={350}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductDetailsRight;
