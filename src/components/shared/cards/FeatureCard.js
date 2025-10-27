import Link from "next/link";
import React from "react";

const FeatureCard = ({ feature, idx }) => {
  const { title, desc, img, bgImg, path } = feature;
  return (
    <div
      className={`ltn__feature-item ltn__feature-item-5  text-center ${
        idx === 0
          ? "section-bg-2"
          : idx === 1
          ? "bg-overlay-theme-90 text-color-white text-center bg-image"
          : "white-bg "
      } `}
      data-bs-bg={bgImg ? bgImg.src : ""}
    >
      <div className="ltn__feature-icon">
        <span>{img}</span>
      </div>
      <div className="ltn__feature-info">
        <h2>
          <Link href={path} className={idx === 1 ? "white-color-im" : ""}>
            {title}
          </Link>
        </h2>
        <p>{desc}</p>
      </div>
      <div className="btn-wrapper">
        <Link
          href={path}
          className={`btn btn-white ${
            idx === 0 ? " btn-effect-4" : "btn-effect-3"
          } btn-full-width`}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
