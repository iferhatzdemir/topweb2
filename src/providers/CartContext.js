"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
const cart1 = "/img/product/1.png";
const cart2 = "/img/product/2.png";
const cart3 = "/img/product/3.png";
const cart4 = "/img/product/4.png";

const demoProducts = [
  {
    id: 1,
    title: "Wheel Bearing Retainer",
    image: cart1,
    price: 65,
    quantity: 1,
  },
  {
    id: 2,
    title: "Brake Conversion Kit",
    image: cart2,
    price: 85,
    quantity: 1,
  },
  {
    id: 3,
    title: "OE Replica Wheels",
    image: cart3,
    price: 92,
    quantity: 1,
  },
  {
    id: 4,
    title: "Shock Mount Insulator",
    image: cart4,
    price: 68,
    quantity: 1,
  },
];
const cartContext = createContext(null);
const CartContextProvider = ({ children }) => {
  const [cartStatus, setCartStatus] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const creteAlert = useSweetAlert();
  useEffect(() => {
    const cartProductFromLocalStorage = getItemsFromLocalstorage("cart");

    if (!cartProductFromLocalStorage) {
      setCartProducts(demoProducts);
      addItemsToLocalstorage("cart", demoProducts);
    } else [setCartProducts(cartProductFromLocalStorage)];
  }, []);
  // add  product = localstorage cart
  const addProductToCart = (currentProduct, isDecreament, isTotalQuantity) => {
    const { id: currentId, title: currentTitle } = currentProduct;

    const modifyableProduct = cartProducts?.find(
      ({ id, title }) => id === currentId && title === currentTitle
    );
    const previousQuantity = modifyableProduct?.quantity;
    const currentQuantity = currentProduct?.quantity;

    let currentProducts;
    if (isTotalQuantity) {
      currentProducts = cartProducts?.map((product) =>
        product.id === currentId &&
        product?.title === currentTitle &&
        isTotalQuantity
          ? {
              ...product,
              quantity: currentProduct.quantity,
            }
          : product
      );

      if (previousQuantity < currentQuantity) {
        // creteAlert("success", "Success! Quantity increased.");
        setCartStatus("incresed");
      } else if (previousQuantity > currentQuantity) {
        // creteAlert("success", "Success! Quantity decreased.");
        setCartStatus("decreased");
      }
    } else {
      const isAlreadyExist = modifyableProduct ? true : false;

      if (isAlreadyExist) {
        currentProducts = cartProducts?.map((product) =>
          product.id === currentId &&
          product?.title === currentTitle &&
          isDecreament
            ? {
                ...product,
                quantity: product.quantity - currentProduct?.quantity,
              }
            : product.id === currentId && product?.title === currentTitle
            ? {
                ...product,
                quantity: product.quantity + currentProduct?.quantity,
              }
            : product
        );
        if (isDecreament) {
          // creteAlert("success", "Success! Quantity decreased.");
          setCartStatus("decreased");
        } else {
          // creteAlert("success", "Success! Quantity increased.");
          setCartStatus("increased");
        }
      } else {
        currentProducts = [...cartProducts, currentProduct];

        // creteAlert("success", "Success! added to cart.");
        setCartStatus("added");
      }
    }
    setCartProducts(currentProducts);
    addItemsToLocalstorage("cart", currentProducts);
  };

  // delete product = localstorage cart
  const deleteProductFromCart = (currentId, currentTitle) => {
    const currentProducts = cartProducts?.filter(
      ({ id, title }) => id !== currentId || title !== currentTitle
    );
    setCartProducts(currentProducts);
    addItemsToLocalstorage("cart", currentProducts);
    creteAlert("success", "Success! deleted from cart.");
    setCartStatus("deleted");
  };
  return (
    <cartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProductToCart,
        deleteProductFromCart,
        cartStatus,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export const useCartContext = () => {
  const value = useContext(cartContext);
  return value;
};
export default CartContextProvider;
