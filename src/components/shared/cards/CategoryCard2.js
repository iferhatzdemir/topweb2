import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard2 = ({ category }) => {
  const { shortTitle, image, path2 } = category;
  return (
    <div className="ltn__category-item text-center">
      <div className="ltn__category-item-img">
        <Link href={path2}>
          <Image src={image} alt="Image" priority={false} />
        </Link>
      </div>
      <div className="ltn__category-item-name">
        <h5>
          <Link href={path2}>{shortTitle}</Link>
        </h5>
      </div>
    </div>
  );
};

export default CategoryCard2;
