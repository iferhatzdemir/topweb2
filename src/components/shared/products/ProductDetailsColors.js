import Link from "next/link";
import React from "react";

const ProductDetailsColors = ({ setCurrentColor }) => {
  const colors = ["black", "white", "red", "yellow", "green", "blue", "navy"];
  return (
    <li>
      <div className="ltn__color-widget clearfix">
        <strong className="alignleft">Color</strong>
        <ul>
          {colors?.map((color, idx) => (
            <React.Fragment key={idx}>
              <li className={color}>
                <Link
                  onClick={() => setCurrentColor(color)}
                  href="#details"
                ></Link>{" "}
              </li>
              &nbsp;
            </React.Fragment>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default ProductDetailsColors;
