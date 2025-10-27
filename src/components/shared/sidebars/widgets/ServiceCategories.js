"use client";
import countDataLength from "@/libs/countDataLength";
import filterItems from "@/libs/filterItems";
import getAllServices from "@/libs/getAllServices";
import makePath from "@/libs/makePath";
import modifyNumber from "@/libs/modifyNumber";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React from "react";
const ServiceCategories = () => {
  const value = useCommonContext();
  const { isPortfolio } = value || {};
  const services = getAllServices();
  const categories = [
    "Organic Vegetables",
    "Fresh Fruits",
    "Health and Nutrition",
    "Dietary Variety",
    "Flavor and Taste",
    "Convenience",
  ];
  return (
    <div className="widget-2 ltn__menu-widget ltn__menu-widget-2 text-uppercase">
      <ul>
        {categories?.map((category1, idx) => (
          <li key={idx}>
            <Link href={`/services?category=${makePath(category1)}`}>
              {category1}{" "}
              <span>
                {isPortfolio ? (
                  modifyNumber(
                    countDataLength(
                      filterItems(services, "category", makePath(category1))
                    )
                  )
                ) : (
                  <i className="fas fa-arrow-right"></i>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCategories;
