import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceCard4 = ({ service }) => {
  const { id, title, desc, imgAlt } = service;
  return (
    <div className="ltn__feature-item ltn__feature-item-7">
      <div className="ltn__feature-icon-title">
        <div className="ltn__feature-icon">
          <Image src={imgAlt} alt="#" width={60} height={63} />
        </div>
        <h3>
          <Link href={`/services/${id}`}>{title}</Link>
        </h3>
      </div>
      <div className="ltn__feature-info">
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ServiceCard4;
