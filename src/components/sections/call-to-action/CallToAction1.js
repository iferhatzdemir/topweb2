import React from "react";

const CallToAction1 = () => {
  return (
    <div
      className="ltn__newsletter-area section-bg-1 bg-overlay-black-90 pt-110 pb-90 bg-image"
      data-bs-bg="/img/bg/2.jpg"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="ltn__newsletter-inner text-center">
              <h1 className="white-color">We make your inbox better</h1>
              <p className="white-color">
                Sign up to our newsletter to receive grooming tips, style
                inspiration, <br /> exclusive access to pre-launch product
                pricing and more.
              </p>
              <form action="#" className="ltn__form-box">
                <input type="email" name="email" placeholder="Email*" />
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn btn-effect-1 text-uppercase"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction1;
