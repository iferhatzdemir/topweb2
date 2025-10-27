import Blogs2 from "@/components/sections/blogs/Blogs2";
import CallToAction2 from "@/components/sections/call-to-action/CallToAction2";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import PortfolioPrimary from "@/components/sections/portfolio/PortfolioPrimary";
import React from "react";

const PortfolioMain = ({ type }) => {
  return (
    <main>
      <HeroPrimary title={"Our Gallery"} text="Gallery" />
      <PortfolioPrimary type={type} />
      <CallToAction2 />
      <Blogs2 type={2} pb="pb-70" />
      <Features4 />
    </main>
  );
};

export default PortfolioMain;
