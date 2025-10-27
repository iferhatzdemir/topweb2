"use client";
import makePath from "@/libs/makePath";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React from "react";

const ProductColors = () => {
  const { currentPath } = useCommonContext();
  const colors = [
    "black",
    "white",
    "red",
    "silver",
    "gray",
    "maroon",
    "yellow",
    "olive",
    "lime",
    "green",
    "aqua",
    "teal",
    "blue",
    "navy",
    "fuchsia",
    "purple",
    "pink",
    "nude",
    "orange",
  ];
  return (
    <div className="widget ltn__color-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Product Color
      </h4>
      <ul>
        {colors?.map((color, idx) => (
          <li key={idx} className={color}>
            <Link
              href={`${currentPath ? currentPath : "/shop"}?color=${makePath(
                color
              )}`}
            ></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductColors;
