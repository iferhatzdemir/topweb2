import Image from "next/image";
import Link from "next/link";

const Hero2 = () => {
  return (
    <div className="ltn__slider-area ltn__slider-3  section-bg-1">
      <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
        {/* <!-- ltn__slide-item --> */}
        <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3 ltn__slide-item-3-normal">
          <div className="ltn__slide-item-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="slide-item-info">
                    <div className="slide-item-info-inner ltn__slide-animation">
                      <div className="slide-video mb-50 d-none">
                        <Link
                          className="ltn__video-icon-2 ltn__video-icon-2-border"
                          href="https:www.youtube.com/embed/ATI7vfCgwXE?autoplay=1&showinfo=0"
                          data-rel="lightcase:myCollection"
                        >
                          <i className="fa fa-play"></i>
                        </Link>
                      </div>
                      <h6 className="slide-sub-title animated">
                        <Image
                          width={29}
                          height={27}
                          src="/img/icons/icon-img/1.png"
                          alt="#"
                        />{" "}
                        100% genuine Products
                      </h6>
                      <h1 className="slide-title animated ">
                        Our {"Garden's"} Most <br /> Favorite Food
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
                  <div className="slide-item-img">
                    <Image
                      src="/img/slider/21.png"
                      alt="#"
                      width={1100}
                      height={801}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ltn__slide-item --> */}
        <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3 ltn__slide-item-3-normal">
          <div className="ltn__slide-item-inner  text-right text-end">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="slide-item-info">
                    <div className="slide-item-info-inner ltn__slide-animation">
                      <h6 className="slide-sub-title ltn__secondary-color animated">
                        {"//"} TALENTED ENGINEER & MECHANICS
                      </h6>
                      <h1 className="slide-title animated ">
                        Tasty & Healthy <br /> Organic Food
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
                        <Link
                          href="/about"
                          className="btn btn-transparent btn-effect-3"
                        >
                          LEARN MORE
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="slide-item-img slide-img-left">
                    <Image
                      src="/img/slider/22.png"
                      alt="#"
                      width={694}
                      height={605}
                    />
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

export default Hero2;
