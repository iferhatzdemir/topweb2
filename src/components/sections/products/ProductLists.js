"use client";
import ProductCard2 from "@/components/shared/cards/ProductCard2";
import getAllProducts from "@/libs/getAllProducts";
import React from "react";

const ProductLists = () => {
  const allProducts = getAllProducts();
  const allFeaturedProducts = allProducts
    ?.filter(({ featured }) => featured)
    ?.slice(0, 9);
  const allMostViewProducts = allProducts
    ?.sort((a, b) => b.views - a.views)
    ?.slice(0, 9);
  const allBestSellerProducts = allProducts
    ?.filter(({ bestSeller }) => bestSeller)
    ?.slice(0, 9);

  const items = [
    {
      title: "Featured Products",
      products: [
        allFeaturedProducts.slice(0, 3),
        allFeaturedProducts.slice(3, 6),
        allFeaturedProducts.slice(6, 9),
      ],
    },
    {
      title: "Most View Products",
      products: [
        allMostViewProducts.slice(0, 3),
        allMostViewProducts.slice(3, 6),
        allMostViewProducts.slice(6, 9),
      ],
    },
    {
      title: "Bestseller Products",
      products: [
        allBestSellerProducts.slice(0, 3),
        allBestSellerProducts.slice(3, 6),
        allBestSellerProducts.slice(6, 9),
      ],
    },
  ];
  return (
    <div className="ltn__small-product-list-area pt-80 pb-85">
      <div className="container">
        <div className="row justify-content-center">
          {items?.map(({ title, products }, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title-area ">
                    <h1 className="section-title-2 border-bottom">{title}</h1>
                  </div>
                </div>
              </div>
              <div className="row ltn__small-product-slider-active slick-arrow-1  ">
                {/* <!-- small-product-item --> */}
                {products?.map((nestedProducts, idx2) => (
                  <div className="col-lg-4 col-md-6 col-12" key={idx2 + 4}>
                    {nestedProducts?.map((product, idx3) => (
                      <ProductCard2 key={idx3 + 7} product={product} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLists;
