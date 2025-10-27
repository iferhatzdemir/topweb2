import Brands3 from "@/components/sections/brands/Brands3";
import CallToAction3 from "@/components/sections/call-to-action/CallToAction3";
import Categories3 from "@/components/sections/categories/Categories3";
import Features5 from "@/components/sections/features/Features5";
import Hero15 from "@/components/sections/hero-banners/Hero15";
import HotDeal4 from "@/components/sections/hot-deals/HotDeal4";
import ProductLists from "@/components/sections/products/ProductLists";
import Products3 from "@/components/sections/products/Products3";
import Products5 from "@/components/sections/products/Products5";
import React from "react";

const Home3Main = () => {
  return (
    <main>
      <Hero15 />
      <Features5 type={2} />

      <Products3
        isSmallTitle={true}
        isDouble={true}
        desc="A highly efficient slip-ring scanner for today's diagnostic requirements."
      />
      <Categories3 type={2} />
      <Products5 />
      <CallToAction3 />
      <HotDeal4 />
      <ProductLists />
      <Brands3 />
    </main>
  );
};

export default Home3Main;
