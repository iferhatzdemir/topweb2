"use client";
import makePath from "@/libs/makePath";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React from "react";

const ProductSizes = () => {
  const { currentPath, size: currentSize } = useCommonContext();
  const sizes = ["S", "M", "L", "XL", "XXL"];
  return (
    <div className="widget ltn__tagcloud-widget ltn__size-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Product Size
      </h4>
      <ul>
        {sizes?.map((size, idx) => (
          <li key={idx}>
            <Link
              href={`${currentPath ? currentPath : "/shop"}?size=${makePath(
                size
              )}`}
              className={currentSize === makePath(size) ? "active" : ""}
            >
              {size}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSizes;
