import CategoryCard from "@/components/shared/cards/CategoryCard";
import getAllCategories from "@/libs/getAllCategories";
import React from "react";

const Categories = () => {
  const categories = getAllCategories()?.filter(({}, idx) => idx < 6);
  return (
    <div className="ltn__category-area section-bg-1 pt-115 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ">
              <h1 className="section-title">Shop by Categories</h1>
            </div>
          </div>
        </div>
        <div className="row l slick-arrow-1">
          {categories?.map((category, idx) => (
            <div key={idx} className="col-xl-4 col-sm-6 col-12">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
