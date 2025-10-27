"use client";
import CartStatusModal from "@/components/shared/modals/CartStatusModal";
import ProductDetailsQuick from "@/components/shared/modals/ProductDetailsQuick";
import WishlistStatusModal from "@/components/shared/modals/WishlistStatusModal";
import getAllProducts from "@/libs/getAllProducts";
import React, { createContext, useContext, useState } from "react";
const productContext = createContext(null);
const ProductContext = ({ children }) => {
  const products = getAllProducts();
  const [currentProduct, setCurrentProduct] = useState(products[0]);
  return (
    <productContext.Provider value={{ currentProduct, setCurrentProduct }}>
      {children}
      <ProductDetailsQuick product={currentProduct} />
      <CartStatusModal product={currentProduct} />
      <WishlistStatusModal product={currentProduct} />
    </productContext.Provider>
  );
};
export const useProductContext = () => {
  return useContext(productContext);
};
export default ProductContext;
