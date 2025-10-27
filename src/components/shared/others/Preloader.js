import React from "react";

const Preloader = () => {
  return (
    <div className="preloader " id="preloader">
      <div className="preloader-inner">
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
