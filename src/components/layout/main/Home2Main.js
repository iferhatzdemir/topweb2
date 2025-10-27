import About5 from "@/components/sections/about/About5";
import Blogs2 from "@/components/sections/blogs/Blogs2";
import CallToAction2 from "@/components/sections/call-to-action/CallToAction2";
import Categories3 from "@/components/sections/categories/Categories3";
import CounterUp2 from "@/components/sections/counters/CounterUp2";
import Features4 from "@/components/sections/features/Features4";
import Features5 from "@/components/sections/features/Features5";
import Hero2 from "@/components/sections/hero-banners/Hero2";
import FeaturedProducts from "@/components/sections/products/FeaturedProducts";
import Products3 from "@/components/sections/products/Products3";

const Home2Main = () => {
  return (
    <main>
      <Hero2 />
      <Features5 />
      <About5 />
      <Categories3 />
      <Products3 isDouble={true} />
      <CounterUp2 />
      <FeaturedProducts />
      <CallToAction2 />
      <Blogs2 type={2} pb={"pb-70"} />
      <Features4 type={2} mb={" mb-120"} />
    </main>
  );
};

export default Home2Main;
