import Image from "next/image";
import Link from "next/link";

const Hero6 = ({ type, size, slide1Title, slide2Title, isArrowBlack }) => {
  return (
    <div className="ltn__slider-area ltn__slider-3  section-bg-1">
      <div
        className={`ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1 ${
          isArrowBlack ? "" : "arrow-white"
        }`}
      >
        {/* <!-- ltn__slide-item --> */}
        <div
          className={`ltn__slide-item ltn__slide-item-2 ltn__slide-item-3 ${
            size === "sm" ? "ltn__slide-item-3-normal" : ""
          } ${type === 2 ? "" : "text-color-white"} bg-image`}
          data-bs-bg={`/img/slider/${type === 2 ? 13 : 11}.jpg`}
        >
          <div className="ltn__slide-item-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="slide-item-info">
                    <div className="slide-item-info-inner ltn__slide-animation">
                      <div className="slide-video mb-50 d-none">
                        <Link
                          className="ltn__video-icon-2 ltn__video-icon-2-border"
                          href="https://www.youtube.com/embed/ATI7vfCgwXE?autoplay=1&showinfo=0"
                          data-rel="lightcase:myCollection"
                        >
                          <i className="fa fa-play"></i>
                        </Link>
                      </div>
                      <h6 className="slide-sub-title animated">
                        <Image
                          src="/img/icons/icon-img/1.png"
                          width={29}
                          height={27}
                          alt="#"
                        />{" "}
                        100% genuine Products
                      </h6>
                      <h1 className="slide-title animated ">
                        {slide1Title ? (
                          slide1Title
                        ) : (
                          <>
                            Tasty & Healthy <br /> Organic Food
                          </>
                        )}
                      </h1>
                      <div className="slide-brief animated">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore.
                        </p>
                      </div>
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
        {/* <!-- ltn__slide-item --> */}
        <div
          className={`ltn__slide-item ltn__slide-item-2 ltn__slide-item-3 ${
            size === "sm" ? "ltn__slide-item-3-normal" : ""
          } ${type === 2 ? "" : "text-color-white"} bg-image`}
          data-bs-bg={`/img/slider/${type === 2 ? 14 : 12}.jpg`}
        >
          <div className="ltn__slide-item-inner  text-right text-end">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="slide-item-info">
                    <div className="slide-item-info-inner ltn__slide-animation">
                      <h6 className="slide-sub-title animated">
                        <Image
                          src="/img/icons/icon-img/1.png"
                          width={29}
                          height={27}
                          alt="#"
                        />{" "}
                        100% genuine Products
                      </h6>
                      <h1 className="slide-title animated ">
                        {slide2Title ? (
                          slide2Title
                        ) : (
                          <>
                            Our {"Garden's"} Most <br /> Favorite Food
                          </>
                        )}
                      </h1>
                      <div className="slide-brief animated">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore.
                        </p>
                      </div>
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

export default Hero6;
