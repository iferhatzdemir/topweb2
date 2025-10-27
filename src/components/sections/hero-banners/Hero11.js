import Link from "next/link";

const Hero11 = () => {
  return (
    <div className="ltn__slider-area  ltn__slider-6 section-bg-2">
      <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1 arrow-white">
        {/* <!-- ltn__slide-item --> */}
        <div
          className="ltn__slide-item  ltn__slide-item-6 text-color-white bg-image bg-overlay-theme-black-70"
          data-bs-bg="/img/slider/12.jpg"
        >
          <div className="ltn__slide-item-inner text-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="slide-item-info">
                    <div className="slide-item-info-inner ltn__slide-animation">
                      <div className="slide-video mb-50">
                        <Link
                          className="ltn__video-icon-2 ltn__secondary-bg"
                          href="https://www.youtube.com/embed/ATI7vfCgwXE?autoplay=1&showinfo=0"
                          data-rel="lightcase:myCollection"
                        >
                          <i className="fa fa-play"></i>
                        </Link>
                      </div>
                      <h6 className="slide-sub-title white-color animated">
                        100% genuine Products
                      </h6>
                      <h1 className="slide-title text-uppercase animated ">
                        Tasty & Healthy <br /> Organic Food
                      </h1>
                      <div className="btn-wrapper animated">
                        <Link
                          href="/shop"
                          className="theme-btn-1 btn btn-effect-1 text-uppercase"
                        >
                          Explore Products
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero11;
