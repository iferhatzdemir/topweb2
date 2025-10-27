import BlogCard2 from "@/components/shared/cards/BlogCard2";
import getAllBlogs from "@/libs/getAllBlogs";
import React from "react";

const Blogs2 = ({ type, title, pt, pb }) => {
  const blogs = getAllBlogs()?.filter(({ id }) => id < 6);
  return (
    <div
      className={`ltn__blog-area ${pb ? pb : " pb-90"}   ${pt ? pt : "pt-115"}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h1 className="section-title">
                {title ? title : "Leatest Blog"}
              </h1>
            </div>
          </div>
        </div>
        <div
          className={`row  ltn__blog-slider-one-active slick-arrow-1  ${
            type === 2 ? "ltn__blog-item-3-normal" : ""
          }`}
        >
          {blogs?.map((blog, idx) => (
            <div key={idx} className="col-lg-12">
              <BlogCard2 blog={blog} type={type} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs2;
