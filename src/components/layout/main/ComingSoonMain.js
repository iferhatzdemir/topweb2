import Link from "next/link";
import React from "react";

const ComingSoonMain = () => {
  return (
    <div
      className="ltn__coming-soon-area ltn__primary-bg text-color-white bg-image bg-overlay-theme-black-70"
      data-bs-bg="/img/slider/11.jpg"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="coming-soon-inner">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  {"//"} Welcome to you
                </h6>
                <h1 className="section-title white-color">
                  We Are Coming Soon
                </h1>
                <h5 className="ltn__secondary-color">June 26, 2026</h5>
              </div>
              <div
                className="ltn__countdown  mb-20"
                data-countdown="2026/06/26"
              ></div>

              <div className="ltn__newsletter-inner mt-50">
                <h3>Notify me when we launch</h3>
                <form action="#" className="ltn__form-box">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your E-mail..."
                  />
                  <button
                    type="submit"
                    className="btn theme-btn-1 btn-effect-1"
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
              <div className="btn-wrapper mt-50">
                <Link
                  href="/contact"
                  className="btn theme-btn-2 btn-effect-2 text-uppercase"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComingSoonMain;
