import Image from "next/image";
import Link from "next/link";

const About4 = () => {
  return (
    <div className="ltn__about-us-area pb-115">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 align-self-center">
            <div className="about-us-img-wrap ltn__img-shape-left  about-img-left">
              <Image
                src="/img/service/11.jpg"
                alt="Image"
                width={800}
                height={1031}
                style={{ height: "auto" }}
              />
            </div>
          </div>
          <div className="col-lg-7 align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  {"//"} RELIABLE SERVICES
                </h6>
                <h1 className="section-title">
                  We are Qualified & Professional<span>.</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore
                </p>
              </div>
              <div className="about-us-info-wrap-inner about-us-info-devide">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <div className="list-item-with-icon">
                  <ul>
                    <li>
                      <Link href="/contact">24/7 Online Support</Link>
                    </li>
                    <li>
                      <Link href="/team">Expert Team</Link>
                    </li>
                    <li>
                      <Link href="/services/1">Pure Equipment</Link>
                    </li>
                    <li>
                      <Link href="/shop">Unlimited Product</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About4;
