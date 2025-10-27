import Link from "next/link";
import React from "react";

const ServiceCard3 = ({ service, type }) => {
  const { id, title, desc, imgAlt } = service;
  return (
    <div
      className={`ltn__feature-item ltn__feature-item-3 ${
        type === 2 ? "" : "text-right text-end"
      }`}
    >
      <div className="ltn__feature-icon">
        <span>{imgAlt}</span>
      </div>
      <div className="ltn__feature-info">
        <h2>
          <Link href={`/services/${id}`}>{title}</Link>
        </h2>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ServiceCard3;
