"use client";
import PortfolioCard from "@/components/shared/cards/PortfolioCard";

import getAllPortfolios from "@/libs/getAllPortfolios";
import React, { useEffect, useState } from "react";

const PortfolioPrimary = ({ type }) => {
  const [isAll, setIsAll] = useState(false);
  const portfolios = getAllPortfolios()?.filter(
    ({ id }) => id < (isAll ? 13 : 7)
  );
  useEffect(() => {
    if (window.$) {
      $("a[data-rel^=lightcase]").lightcase({
        transition:
          "elastic" /* none, fade, fadeInline, elastic, scrollTop, scrollRight, scrollBottom, scrollLeft, scrollHorizontal and scrollVertical */,
        swipe: true,
        maxWidth: 1170,
        maxHeight: 600,
      });
    }
  }, [isAll]);
  return (
    <div className="ltn__gallery-area mb-120">
      <div className="container">
        {/* <!-- Portfolio Wrapper Start --> */}

        <div
          className={`row   ${
            type === 2 ? "ltn__gallery-style-1" : "ltn__gallery-style-2"
          }`}
        >
          {portfolios?.map((portfolio, idx) => (
            <div
              className="ltn__gallery-item filter_category_3 col-lg-4 col-sm-6 col-12"
              key={idx}
            >
              <PortfolioCard portfolio={portfolio} />
            </div>
          ))}
        </div>
        <div id="ltn__inline_description_1" style={{ display: "none" }}>
          <h4 className="first">
            This content comes from a hidden element on that page
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis
            mi eu elit tempor facilisis id et neque. Nulla sit amet sem sapien.
            Vestibulum imperdiet porta ante ac ornare. Nulla et lorem eu nibh
            adipiscing ultricies nec at lacus. Cras laoreet ultricies sem, at
            blandit mi eleifend aliquam. Nunc enim ipsum, vehicula non pretium
            varius, cursus ac tortor.
          </p>
          <p>
            Vivamus fringilla congue laoreet. Quisque ultrices sodales orci,
            quis rhoncus justo auctor in. Phasellus dui eros, bibendum eu
            feugiat ornare, faucibus eu mi. Nunc aliquet tempus sem, id aliquam
            diam varius ac. Maecenas nisl nunc, molestie vitae eleifend vel.
          </p>
        </div>
        {isAll ? (
          ""
        ) : (
          <div className="btn-wrapper text-center">
            <button
              className="btn btn-transparent btn-effect-3 btn-border"
              onClick={() => setIsAll(true)}
            >
              LOAD MORE +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPrimary;
