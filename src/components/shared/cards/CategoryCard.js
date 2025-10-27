import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ category }) => {
  const { title, items, image, path } = category;
  return (
    <div className="ltn__category-item ltn__category-item-2">
      <h4 className="text-center">
        <Link href={path}>{title}</Link>
      </h4>
      <div className="ltn__category-item-img d-none d-md-block">
        <Link href={path}>
          <Image src={image} alt="Image" placeholder="blur" />
        </Link>
      </div>
      <div className="ltn__category-item-name">
        <ul>
          {items?.map(({ name, path }, idx) => (
            <li key={idx}>
              <Link href={path}>{name}</Link>
            </li>
          ))}
        </ul>
        <Link className="category-btn" href={path}>
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
