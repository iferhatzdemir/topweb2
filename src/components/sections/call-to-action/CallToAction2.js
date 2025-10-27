import Image from "next/image";
import Link from "next/link";

const CallToAction2 = () => {
  return (
    <div
      className="ltn__call-to-action-area ltn__call-to-action-4 bg-image pt-115 pb-120"
      data-bs-bg="/img/bg/6.jpg"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="call-to-action-inner call-to-action-inner-4 text-center">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  {"// "} any question you have {"//"}
                </h6>
                <h1 className="section-title white-color">897-876-987-90</h1>
              </div>
              <div className="btn-wrapper">
                <Link
                  href="tel:+123456789"
                  className="theme-btn-1 btn btn-effect-1"
                >
                  MAKE A CALL
                </Link>{" "}
                <Link
                  href="/contact"
                  className="btn btn-transparent btn-effect-4 white-color"
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__call-to-4-img-1">
        <Image src="/img/bg/12.png" width={631} height={1000} alt="#" />
      </div>
      <div className="ltn__call-to-4-img-2">
        <Image src="/img/bg/11.png" width={514} height={1000} alt="#" />
      </div>
    </div>
  );
};

export default CallToAction2;
