import Image from "next/image";
import Link from "next/link";

const Features3 = () => {
  return (
    <div className="ltn__why-choose-us-area section-bg-1 pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="why-choose-us-info-wrap">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  {"//"} Why Choose Us
                </h6>
                <h1 className="section-title">
                  {" We're"} Providing The Best Solution<span>.</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore
                </p>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-6">
                  <div className="why-choose-us-feature-item">
                    <div className="why-choose-us-feature-icon">
                      <Image
                        src="/img/icons/icon-img/21.png"
                        alt="#"
                        width={60}
                        height={61}
                      />
                    </div>
                    <div className="why-choose-us-feature-brief">
                      <h3>
                        <Link href="/services">Anytime Get Your Service</Link>
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor ut labore et dolore magna aliqua.
                        Ut enim ad minim
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-6">
                  <div className="why-choose-us-feature-item">
                    <div className="why-choose-us-feature-icon">
                      <Image
                        src="/img/icons/icon-img/22.png"
                        alt="#"
                        width={60}
                        height={61}
                      />
                    </div>
                    <div className="why-choose-us-feature-brief">
                      <h3>
                        <Link href="/services">Curated Products Service</Link>
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor ut labore et dolore magna aliqua.
                        Ut enim ad minim
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="why-choose-us-img-wrap">
              <div className="why-choose-us-img-1 text-start">
                <Image
                  src="/img/others/1.jpg"
                  alt="Image"
                  height={700}
                  width={600}
                />
              </div>
              <div className="why-choose-us-img-2 text-end">
                <Image
                  src="/img/others/2.jpg"
                  alt="Image"
                  height={700}
                  width={600}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features3;
