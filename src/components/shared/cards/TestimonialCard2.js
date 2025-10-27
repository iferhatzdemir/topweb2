import Image from "next/image";
import React from "react";

const TestimonialCard2 = ({ testimonial }) => {
  const { name, image, desc, desig } = testimonial;
  return (
    <div className="ltn__testimonial-item ltn__testimonial-item-4">
      <div className="ltn__testimoni-img">
        <Image src={image} alt="#" priority={false} height={400} width={400} />
      </div>
      <div className="ltn__testimoni-info">
        <p>{desc} </p>
        <h4>{name}</h4>
        <h6>{desig}</h6>
      </div>
      <div className="ltn__testimoni-bg-icon">
        <i className="far fa-comments"></i>
      </div>
    </div>
  );
};

export default TestimonialCard2;
