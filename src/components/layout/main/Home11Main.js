import About1 from "@/components/sections/about/About1";
import Blogs2 from "@/components/sections/blogs/Blogs2";
import CallToActionForm from "@/components/sections/call-to-action/CallToActionForm";
import Features3 from "@/components/sections/features/Features3";
import Features4 from "@/components/sections/features/Features4";
import Hero11 from "@/components/sections/hero-banners/Hero11";
import Portfolio3 from "@/components/sections/portfolio/Portfolio3";
import PricingPlans from "@/components/sections/pricing-plans/PricingPlans";
import Services2 from "@/components/sections/services/Services2";
import Services3 from "@/components/sections/services/Services3";
import React from "react";

const Home11Main = () => {
  return (
    <main>
      <Hero11 />
      <About1 title="Get Amazing Service From Us" />
      <Features3 />
      <PricingPlans />
      <Services2 />
      <Services3 />
      <Portfolio3 />
      <CallToActionForm />
      <Blogs2 type={2} pb="pb-70" title="Leatest Blog" />
      <Features4 />
    </main>
  );
};

export default Home11Main;
