import countDataLength from "@/libs/countDataLength";
import filterItems from "@/libs/filterItems";
import getAllProducts from "@/libs/getAllProducts";
import makePath from "@/libs/makePath";
import modifyNumber from "@/libs/modifyNumber";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard3 = ({ category }) => {
  const { title, items, image, path } = category;

  const totalItems = modifyNumber(
    countDataLength(
      filterItems(
        getAllProducts(),
        title === "Browse all" ? "default" : "category",
        makePath(title),
        true
      )
    )
  );

  return (
    <div className="ltn__category-item ltn__category-item-3 text-center">
      <div className="ltn__category-item-img">
        <Link href={path}>
          <Image src={image} alt="Image" width={103} height={99} />
        </Link>
      </div>
      <div className="ltn__category-item-name">
        <h5>
          <Link href={path}>{title}</Link>
        </h5>
        <h6>({totalItems} items)</h6>
      </div>
    </div>
  );
};

export default CategoryCard3;
