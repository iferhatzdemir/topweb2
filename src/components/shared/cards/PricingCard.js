import Link from "next/link";
import React from "react";

const PricingCard = ({ plan, idx }) => {
  const { title, features, path, label, price } = plan;

  return (
    <div
      className={`ltn__pricing-plan-item text-center  ${
        idx === 1 ? "active" : ""
      }`}
    >
      {label ? <span className="pricing-badge">{label}</span> : ""}
      <h2 className="pricing-title">{title}</h2>
      <div className="pricing-price">
        <h2>
          <sup>$</sup>
          {price}
          <sub>/M</sub>
        </h2>
      </div>
      <ul>
        {features?.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <div className="btn-wrapper">
        <Link href={path} className="theme-btn-2 btn">
          PURCHASE
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
