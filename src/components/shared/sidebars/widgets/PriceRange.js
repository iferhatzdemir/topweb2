"use client";

import { useCommonContext } from "@/providers/CommonContext";
import { useEffect, useRef } from "react";

const PriceRange = () => {
  return (
    <div className="widget ltn__price-filter-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Filter by price
      </h4>
      <div className="price_filter">
        <div className="price_slider_amount">
          <input type="submit" value="Your range:" />
          <input
            type="text"
            className="amount"
            name="price"
            placeholder="Add Your Price"
          />
        </div>
        <div className="slider-range"></div>
      </div>
    </div>
  );
};

export default PriceRange;
