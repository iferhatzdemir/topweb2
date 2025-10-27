import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import getAllProducts from "@/libs/getAllProducts";
import React from "react";

const FeaturedProducts = () => {
  const allProducts = getAllProducts();
  const featuredProducts = allProducts
    ?.filter(({ featured }) => featured)
    ?.slice(0, 8);
  return (
    <div className="ltn__product-area ltn__product-gutter pt-115 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h1 className="section-title">Featured Products</h1>
            </div>
          </div>
        </div>
        <div className="row  slick-arrow-1">
          {/* <!-- ltn__product-item --> */}
          {featuredProducts?.map((product, idx) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
              <ProductCardPrimary product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
