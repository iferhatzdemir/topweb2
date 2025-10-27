import getHistory from "@/libs/getHistory";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HistoryPrimary = () => {
  const history = getHistory()?.filter(
    ({ isMain }, idx) => idx > 4 && idx < 10 && isMain
  );
  return (
    <div className="ltn__our-history-area pb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__our-history-inner">
              <div className="ltn__tab-menu text-uppercase">
                <div className="nav">
                  {history?.map(({ year }, idx) => (
                    <Link
                      key={idx}
                      className={idx === 1 ? "active show" : ""}
                      data-bs-toggle="tab"
                      href={`#liton_tab_2_${idx + 1}`}
                    >
                      {year}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="tab-content">
                {history?.map(
                  (
                    { title, desc, image, badgeImage, subTitle, desc2 },
                    idx
                  ) => (
                    <div
                      key={idx}
                      className={`tab-pane fade  ${
                        idx === 1 ? "active show" : ""
                      }`}
                      id={`liton_tab_2_${idx + 1}`}
                    >
                      <div className="ltn__product-tab-content-inner">
                        <div className="row">
                          <div className="col-lg-6 align-self-center">
                            <div className="about-us-img-wrap about-img-left">
                              <Image
                                src={image}
                                alt="Image"
                                width={800}
                                height={562}
                              />
                              <div className="ltn__history-icon">
                                {badgeImage}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 align-self-center">
                            <div className="about-us-info-wrap">
                              <div className="section-title-area ltn__section-title-2">
                                <h6 className="section-subtitle ltn__secondary-color">
                                  {subTitle}
                                </h6>
                                <h1 className="section-title">
                                  {title}
                                  <span>.</span>
                                </h1>
                                <p>{desc}</p>
                              </div>

                              <p>{desc2}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPrimary;
