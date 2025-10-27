import Image from "next/image";
import Link from "next/link";

const Hero1 = () => {
  return (
    <div className="ltn__slider-area ltn__slider-3  section-bg-1">
      <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
        {/* <!-- ltn__slide-item --> */}
        <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3">
          <div className="ltn__slide-item-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="slide-item-info">
                    <div className="slide-item-info-inner ltn__slide-animation">
                      <h6 className="slide-sub-title animated">
                        <Image
                          src="/img/icons/icon-img/1.png"
                          alt="#"
                          width={29}
                          height={27}
                        />{" "}
                        100% genuine Products
                      </h6>
                      <h1 className="slide-title animated ">
                        Tasty & Healthy <br /> Organic Food
                      </h1>
                      <div className="btn-wrapper animated">
                        <Link
                          href="/shop"
                          className="theme-btn-1 text-uppercase btn btn-effect-1"
                        >
                          Explore Products
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="slide-item-img">
                    <Image
                      priority={false}
                      src="/img/slider/23.png"
                      alt="#"
                      width={2000}
                      height={2000}
                    />

                    {/* <!--  --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ltn__slide-item --> */}
        <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3">
          <div className="ltn__slide-item-inner  text-right text-end">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="slide-item-info">
                    <div className="slide-item-info-inner ltn__slide-animation">
                      <h6 className="slide-sub-title animated">
                        <Image
                          src="/img/icons/icon-img/1.png"
                          alt="#"
                          width={29}
                          height={27}
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
                          className="theme-btn-1 text-uppercase btn btn-effect-1"
                        >
                          Explore Products
                        </Link>{" "}
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
                      priority={false}
                      src="/img/slider/21.png"
                      alt="#"
                      width={2000}
                      height={2000}
                    />
                  </div>
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

export default Hero1;
