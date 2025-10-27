import LoactionCard from "@/components/shared/cards/LoactionCard";
import getAllBranches from "@/libs/getAllBranches";
import React from "react";

const LocationsPrimary = () => {
  const branches = getAllBranches();
  return (
    <div className="ltn__google-map-locations-list-area mt-115 mb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__location-search mb-100">
              <div className="section-title-area ltn__section-title-2 ">
                <h1 className="section-title">
                  Find your nearby location<span>.</span>
                </h1>
              </div>
              <form action="#" className="clearfix">
                <h3>Your State</h3>
                <div className="input-item">
                  <select className="nice-select">
                    <option>Make A Selection</option>
                    <option>Sort by popularity</option>
                    <option>Sort by new arrivals</option>
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          {branches?.map(({ province, locations }, idx) => (
            <React.Fragment key={idx}>
              <div className="col-lg-12">
                <div className="ltn__state-location">
                  <h2 className="ltn__state-location-title">{province}</h2>
                </div>
              </div>
              {locations?.map((location, idx2) => (
                <div key={idx2 + 3} className="col-lg-4">
                  <LoactionCard location={location} />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationsPrimary;
