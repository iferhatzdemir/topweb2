import Blogs2 from "@/components/sections/blogs/Blogs2";
import Features4 from "@/components/sections/features/Features4";
import Hero6 from "@/components/sections/hero-banners/Hero6";
import HotDeal3 from "@/components/sections/hot-deals/HotDeal3";
import HotDeal4 from "@/components/sections/hot-deals/HotDeal4";
import Portfolio3 from "@/components/sections/portfolio/Portfolio3";
import FeaturedProducts from "@/components/sections/products/FeaturedProducts";
import Products3 from "@/components/sections/products/Products3";

const Home6Main = () => {
  return (
    <main>
      <Hero6 />
      <HotDeal4 />
      <Products3 isDouble={true} title={"Our Products"} pt={" pt-85"} />
      <HotDeal3 />
      <FeaturedProducts />
      <Portfolio3 pb="pb-90" />
      <Blogs2 type={2} pb="pb-70" title="Leatest Blog" />
      <Features4 />
    </main>
  );
};

export default Home6Main;
