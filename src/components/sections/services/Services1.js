"use client";
import ServiceCard from "@/components/shared/cards/ServiceCard";
import { useCommonContext } from "@/providers/CommonContext";
import React from "react";

const Services1 = ({ isPrimary }) => {
  const { filteredServices, category } = useCommonContext() || {};
  const services = filteredServices?.filter(({ id }) =>
    category ? true : id > 0 && id < (isPrimary ? 7 : 4)
  );
  return (
    <div className="ltn__service-area section-bg-1 pt-115 pb-70">
      <div className="container">
        <div className="row">
          {category ? (
            ""
          ) : (
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2 text-center">
                <h1 className="section-title">Our Services</h1>
              </div>
            </div>
          )}
        </div>
        <div className="row justify-content-center">
          {services?.map((service, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <ServiceCard service={service} isPrimary={isPrimary} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services1;
