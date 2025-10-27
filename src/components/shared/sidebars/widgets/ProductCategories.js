"use client";
import makePath from "@/libs/makePath";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React from "react";

const ProductCategories = () => {
  const { currentPath, category: currentCategory } = useCommonContext();
  const categories = [
    "Vegetables",
    "Fruits",
    "Meat",
    "Fish",
    "Others",
    "Fried",
    "Uncategorized",
  ];
  return (
    <div className="widget ltn__menu-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Product categories
      </h4>
      <ul>
        {categories?.map((category, idx) => (
          <li key={idx}>
            <Link
              href={`${currentPath ? currentPath : "/shop"}?category=${makePath(
                category
              )}`}
              className={currentCategory === makePath(category) ? "active" : ""}
            >
              {category}{" "}
              <span>
                <i className="fas fa-long-arrow-alt-right"></i>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategories;
