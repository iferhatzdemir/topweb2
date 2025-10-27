import Image from "next/image";
import React from "react";

const TestimonialCard3 = ({ testimonial }) => {
  const { name, image, desig, desc } = testimonial;
  return (
    <div className="ltn__testimonial-item-5">
      <div className="ltn__quote-icon">
        <i className="far fa-comments"></i>
      </div>
      <div className="ltn__testimonial-image">
        <Image src={image} alt="quote" />
      </div>
      <div className="ltn__testimonial-info">
        <p>{desc} </p>
        <h4>{name}</h4>
        <h6>{desig}</h6>
      </div>
    </div>
  );
};

export default TestimonialCard3;
