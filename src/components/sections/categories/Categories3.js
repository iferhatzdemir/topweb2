import CategoryCard3 from "@/components/shared/cards/CategoryCard3";
import getAllCategories from "@/libs/getAllCategories";
import React from "react";

const Categories3 = ({ type }) => {
  const categories = getAllCategories()?.slice(0, type === 3 ? 8 : 6);
  return (
    <div
      className={`ltn__category-area ${
        type === 3
          ? "pt-80 pb-85"
          : type === 2
          ? "section-bg-1 pt-115 pb-90"
          : "ltn__primary-bg before-bg-1 bg-image bg-overlay-theme-black-5--0 pt-115 pb-90"
      } `}
      data-bs-bg="/img/bg/5.jpg"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className={`section-title-area ${
                type === 2 || type === 3 ? "" : "ltn__section-title-2"
              } text-center`}
            >
              <h1
                className={`section-title  ${
                  type === 2 || type == 3 ? "" : "white-color"
                }`}
              >
                Top Categories
              </h1>
              {type ? (
                <p>
                  A highly efficient slip-ring scanner for {"today's"}{" "}
                  diagnostic requirements.
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          className={`row  ${
            type === 3 ? "" : "ltn__category-slider-active slick-arrow-1"
          }`}
        >
          {categories?.map((category, idx) => (
            <div
              key={idx}
              className={
                type === 3 ? "col-lg-3 col-md-4 col-sm-6 col-6" : ` col-12`
              }
            >
              <CategoryCard3 category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories3;
