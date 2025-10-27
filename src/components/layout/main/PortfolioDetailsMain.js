import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import PortfolioDetailsPrimary from "@/components/sections/portfolio-details/PortfolioDetailsPrimary";

const PortfolioDetailsMain = () => {
  return (
    <main>
      <HeroPrimary
        title={"Portfolio Details"}
        text="Portfolio Details"
        type={2}
      />
      <PortfolioDetailsPrimary />
    </main>
  );
};

export default PortfolioDetailsMain;
