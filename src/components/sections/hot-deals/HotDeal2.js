import Image from "next/image";
import Link from "next/link";

const HotDeal2 = ({ type }) => {
  return (
    <div
      className={`ltn__call-to-action-area ltn__call-to-action-4 ltn__call-to-action-4-2  ${
        type === 2 ? "section-bg-1 " : "bg-overlay-black-50 bg-image"
      }  pt-110 pb-120`}
      data-bs-bg={type === 2 ? "" : "/img/bg/6.jpg"}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className={`call-to-action-inner call-to-action-inner-4 ${
                type === 2 ? "" : "text-color-white "
              } text-center`}
            >
              <h2 className="ltn__secondary-color">Hurry Up!</h2>
              <h1 className="h1">Hot Deal! Sale Up To 20% off</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />{" "}
                Explicabo id, unde hic molestias omnis.
              </p>
              <div
                className="ltn__countdown ltn__countdown-3 "
                data-countdown="2025/12/01"
              ></div>
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
      <div className="ltn__call-to-4-img-1">
        <Image src="/img/bg/12.png" alt="#" width={631} height={1000} />
      </div>
      <div className="ltn__call-to-4-img-2">
        <Image src="/img/bg/11.png" alt="#" width={514} height={1000} />
      </div>
    </div>
  );
};

export default HotDeal2;
