import Link from "next/link";
import React from "react";

const LoactionCard = ({ location }) => {
  const { provinceDetails, address, proviceCode, path, website, contact } =
    location;
  return (
    <div className="ltn__map-item">
      <h3 className="ltn__location-name">{provinceDetails}</h3>
      <h5 className="ltn__location-single-info">
        <i className="fas fa-map-marked-alt"></i>
        {address} <br /> {proviceCode}
      </h5>
      <h4 className="ltn__location-single-info">
        <i className="fas fa-phone-volume"></i>
        {contact}
      </h4>
      <div className="btn-wrapper">
        <Link
          href={path}
          className="btn btn-transparent btn-border btn-effect-4"
        >
          <i className="fas fa-location-arrow"></i> Get An Appointment
        </Link>
        <Link
          href={website}
          className="btn btn-transparent btn-border btn-effect-3"
        >
          <i className="fas fa-globe"></i> View Website
        </Link>
      </div>
    </div>
  );
};

export default LoactionCard;
