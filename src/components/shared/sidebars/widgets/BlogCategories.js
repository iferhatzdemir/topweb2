"use client";
import countDataLength from "@/libs/countDataLength";
import getAllBlogs from "@/libs/getAllBlogs";
import makePath from "@/libs/makePath";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React from "react";

const BlogCategories = () => {
  const { currentPath, category: currentCategory } = useCommonContext();
  const blogs = getAllBlogs();
  const categories = [
    "Business",
    "Consultant",
    "Creative",
    "UI/UX",
    "Technology",
  ];
  return (
    <div className="widget ltn__menu-widget ltn__menu-widget-2 ltn__menu-widget-2-color-2">
      <h4 className="ltn__widget-title ltn__widget-title-border">Kategoriler</h4>
      <ul>
        {categories?.map((category, idx) => (
          <li
            key={idx}
            className={currentCategory === makePath(category) ? "active" : ""}
          >
            <Link
              href={`${
                currentPath ? currentPath : "/blogs"
              }?category=${makePath(category)}`}
            >
              {category}{" "}
              <span>{countDataLength(blogs, "category", category)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;
