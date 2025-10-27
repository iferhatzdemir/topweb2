import Image from "next/image";
const featureImage1 = "/img/icons/svg/8-trolley.svg";
const featureImage2 = "/img/icons/svg/9-money.svg";
const featureImage3 = "/img/icons/svg/10-credit-card.svg";
const featureImage4 = "/img/icons/svg/11-gift-card.svg";

const Features5 = ({ type }) => {
  return (
    <div
      className={`ltn__feature-area ${type === 2 ? "mt-35" : "mt-100 mt--65"} `}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__feature-item-box-wrap ltn__feature-item-box-wrap-2 ltn__border section-bg-6">
              <div className="ltn__feature-item ltn__feature-item-8">
                <div className="ltn__feature-icon">
                  <Image src={featureImage1} width={640} height={640} alt="#" />
                </div>
                <div className="ltn__feature-info">
                  <h4>Free shipping</h4>
                  <p>On all orders over $49.00</p>
                </div>
              </div>
              <div className="ltn__feature-item ltn__feature-item-8">
                <div className="ltn__feature-icon">
                  <Image src={featureImage2} width={640} height={640} alt="#" />
                </div>
                <div className="ltn__feature-info">
                  <h4>15 days returns</h4>
                  <p>Moneyback guarantee</p>
                </div>
              </div>
              <div className="ltn__feature-item ltn__feature-item-8">
                <div className="ltn__feature-icon">
                  <Image src={featureImage3} width={640} height={640} alt="#" />
                </div>
                <div className="ltn__feature-info">
                  <h4>Secure checkout</h4>
                  <p>Protected by Paypal</p>
                </div>
              </div>
              <div className="ltn__feature-item ltn__feature-item-8">
                <div className="ltn__feature-icon">
                  <Image src={featureImage4} width={640} height={640} alt="#" />
                </div>
                <div className="ltn__feature-info">
                  <h4>Offer & gift here</h4>
                  <p>On all orders over</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features5;
