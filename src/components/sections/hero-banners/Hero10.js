import Link from "next/link";

const Hero10 = () => {
  return (
    <div className="ltn__slider-area ltn__slider-6 ">
      <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
        {/* <!-- ltn__slide-item --> */}
        <div
          className=" ltn__slide-item-9 section-bg-1 bg-image"
          data-bs-bg="/img/slider/13.jpg"
        >
          <div className="ltn__slide-item-inner">
            <div className="slide-item-info bg-overlay-white-90 text-center">
              <div className="slide-item-info-inner  ltn__slide-animation">
                <h1 className="slide-title animated text-uppercase">
                  Tasty & Healthy <br />
                  Organic Food
                </h1>
                <h4 className="slide-sub-title text-uppercase animated">
                  SITEWIDE 21% OFF
                </h4>
                <div className="btn-wrapper animated">
                  <Link
                    href="/shop"
                    className="theme-btn-1 btn btn-effect-1 text-uppercase"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--  --> */}
      </div>
    </div>
  );
};

export default Hero10;
