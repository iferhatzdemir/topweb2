"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import ProductDetailsPrimary from "@/components/sections/product-details/ProductDetailsPrimary";
import Products5 from "@/components/sections/products/Products5";
import CommonContext from "@/providers/CommonContext";

const ProductDetailsMain = ({ title, text, type, isNotSidebar }) => {
  return (
    <main>
      <HeroPrimary
        title={title ? title : "Product Details"}
        text={text ? text : "Product Details"}
        type={3}
      />
      <CommonContext value={{ type, isNotSidebar }}>
        <ProductDetailsPrimary />
      </CommonContext>
      <Products5 isRelated={true} title="Related Products" tag="// Foods" />
      <Features4 />
    </main>
  );
};

export default ProductDetailsMain;
