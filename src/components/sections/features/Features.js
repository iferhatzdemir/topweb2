import FeatureCard from "@/components/shared/cards/FeatureCard";
import getAllFeatues from "@/libs/getAllFeatues";

const Features = () => {
  const services = getAllFeatues()?.filter(({ id }) => id > 0 && id < 4);
  return (
    <div className="ltn__feature-area section-bg-1 pt-70 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          {services?.map((feature, idx) => (
            <div key={idx} className="col-lg-4 col-sm-6 col-12">
              <FeatureCard feature={feature} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
