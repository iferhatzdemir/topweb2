import Link from "next/link";
import React from "react";

const ProductDetailsSizes = ({ setCurrentSize }) => {
  const sizes = ["s", "m", "l", "xl", "xxl"];
  return (
    <li>
      <div className="ltn__tagcloud-widget ltn__size-widget clearfix">
        <strong className="alignleft">Size</strong>
        <ul>
          {sizes?.map((size, idx) => (
            <React.Fragment key={idx}>
              <li>
                <Link onClick={() => setCurrentSize(size)} href="#details">
                  {size}
                </Link>
              </li>{" "}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default ProductDetailsSizes;
