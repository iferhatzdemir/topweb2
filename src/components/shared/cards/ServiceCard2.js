import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceCard2 = ({ service }) => {
  const { title, imgAlt, id, image, desc } = service;
  return (
    <div className="ltn__service-item-1">
      <div className="service-item-img">
        <Image src={image} alt="#" width={600} height={357} />
      </div>
      <div className="service-item-brief">
        <h3>
          <Link href={`/services/${id}`}>{title}</Link>
        </h3>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ServiceCard2;
