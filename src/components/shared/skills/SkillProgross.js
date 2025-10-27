import React from "react";

const SkillProgross = () => {
  return (
    <div className="ltn__progress-bar-wrap">
      <div className="section-title-area ltn__section-title-2">
        <h6 className="section-subtitle ltn__secondary-color">{"//"} skills</h6>
        <h1 className="section-title">
          We Have A Skillest Team Ever<span>.</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </p>
      </div>
      <div className="ltn__progress-bar-inner">
        <div className="ltn__progress-bar-item">
          <p>Gardening</p>
          <div className="progress">
            <div
              className="progress-bar wow fadeInLeft"
              data-wow-duration="0.5s"
              data-wow-delay=".5s"
              role="progressbar"
              style={{ width: "72%" }}
            >
              <span>72%</span>
            </div>
          </div>
        </div>
        <div className="ltn__progress-bar-item">
          <p>Landscaping</p>
          <div className="progress">
            <div
              className="progress-bar wow fadeInLeft"
              data-wow-duration="0.5s"
              data-wow-delay=".5s"
              role="progressbar"
              style={{ width: "74%" }}
            >
              <span>74%</span>
            </div>
          </div>
        </div>
        <div className="ltn__progress-bar-item">
          <p>Vegetable Growing</p>
          <div className="progress">
            <div
              className="progress-bar wow fadeInLeft"
              data-wow-duration="0.5s"
              data-wow-delay=".5s"
              role="progressbar"
              style={{ width: "81%" }}
            >
              <span>81%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillProgross;
