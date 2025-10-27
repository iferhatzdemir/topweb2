import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeatureCard2 = ({ feature, idx }) => {
  const { title, desc, img, path } = feature;
  return (
    <div
      className={`ltn__feature-item ltn__feature-item-6 ${
        idx === 1 ? "active" : ""
      }`}
    >
      <div className="ltn__feature-icon">
        <Image src={img} alt="#" width={60} height={63} />
      </div>
      <div className="ltn__feature-info">
        <h3>
          <Link href={path}>{title}</Link>
        </h3>
        <p>{desc}</p>
        <Link className="ltn__service-btn" href={path}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard2;
