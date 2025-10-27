import ServiceCard4 from "@/components/shared/cards/ServiceCard4";
import getAllServices from "@/libs/getAllServices";
import React from "react";

const Services4 = () => {
  const services = getAllServices()?.filter(({ id }) => id > 26 && id < 30);
  return (
    <div className="ltn__feature-area section-bg-1 pt-115 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h6 className="section-subtitle ltn__secondary-color">
                {"//"} features {"//"}
              </h6>
              <h1 className="section-title">
                Why Choose Us<span>.</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {services?.map((service, idx) => (
            <div key={idx} className="col-lg-4 col-sm-6 col-12">
              <ServiceCard4 service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services4;
