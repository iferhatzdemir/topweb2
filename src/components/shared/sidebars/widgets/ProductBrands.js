"use client";
import makePath from "@/libs/makePath";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React from "react";

const ProductBrands = () => {
  const { currentPath } = useCommonContext();
  const brands = [
    "Mercedes",
    "BMW",
    "Tesla",
    "Toyota",
    "Jaguar",
    "Nissan",
    "Hyundai",
  ];
  return (
    <div className="widget ltn__menu-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Product Brands
      </h4>
      <ul>
        {brands?.map((brand, idx) => (
          <li key={idx}>
            <Link
              href={`${currentPath ? currentPath : "/shop"}?brand=${makePath(
                brand
              )}`}
            >
              {brand}{" "}
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

export default ProductBrands;
