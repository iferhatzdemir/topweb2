import Blogs2 from "@/components/sections/blogs/Blogs2";
import Brands3 from "@/components/sections/brands/Brands3";
import Categories3 from "@/components/sections/categories/Categories3";
import Hero15 from "@/components/sections/hero-banners/Hero15";
import HotDeal2 from "@/components/sections/hot-deals/HotDeal2";
import HotDeal4 from "@/components/sections/hot-deals/HotDeal4";
import Offer4 from "@/components/sections/offers/Offer4";
import Products3 from "@/components/sections/products/Products3";
import Products5 from "@/components/sections/products/Products5";

import React from "react";

const Home4Main = () => {
  return (
    <main>
      <Hero15 type={2} />
      <HotDeal4 />
      <Categories3 type={3} />
      <HotDeal2 type={2} />
      <Products3
        isSmallTitle={true}
        isDouble={true}
        desc="A highly efficient slip-ring scanner for today's diagnostic requirements."
      />
      <Offer4 mt="mt-0" />
      <Products5 pt="pt-80" pb="pb-70" />

      <Brands3 type={2} />
      <Blogs2 type={2} pb="pb-70" title="Leatest Blog" />
    </main>
  );
};

export default Home4Main;
