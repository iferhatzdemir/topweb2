import ServiceCard2 from "@/components/shared/cards/ServiceCard2";
import getAllServices from "@/libs/getAllServices";

import React from "react";

const Services2 = () => {
  const services = getAllServices()?.filter(({ id }) => id > 16 && id < 20);
  return (
    <div className="ltn__service-area ltn__primary-bg before-bg-1 pt-115 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h6 className="section-subtitle ltn__secondary-color">
                {"//"} Service
              </h6>
              <h1 className="section-title white-color">
                What We Do<span>.</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {services?.map((service, idx) => (
            <div key={idx} className="col-lg-4 col-sm-6">
              <ServiceCard2 service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services2;
