import plans from "@/../public/fakedata/pricing_plans.json";
import PricingCard from "@/components/shared/cards/PricingCard";

const PricingPlans = () => {
  return (
    <div className="ltn__pricing-plan-area pt-115 pb-120" id="liton_pricing">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h6 className="section-subtitle ltn__secondary-color">
                {"//"} Our Price
              </h6>
              <h1 className="section-title">
                Pricing Plan<span>.</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-50">
          {plans?.map((plan, idx) => (
            <div key={idx} className="col-lg-4 col-sm-6">
              <PricingCard idx={idx} plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
