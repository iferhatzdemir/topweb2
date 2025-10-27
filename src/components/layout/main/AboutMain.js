import About5 from "@/components/sections/about/About5";
import Blogs2 from "@/components/sections/blogs/Blogs2";
import CallToAction1 from "@/components/sections/call-to-action/CallToAction1";
import Faq2 from "@/components/sections/faq/Faq2";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import Services4 from "@/components/sections/services/Services4";
import Team1 from "@/components/sections/team/Team1";
import Testimonials3 from "@/components/sections/testimonils/Testimonials3";

const AboutMain = () => {
  return (
    <main>
      <HeroPrimary title="About Us" text="About Us" bg="/img/bg/5.jpg" />
      <About5 pt={"pt-0"} />
      <Services4 />
      <Team1 />
      <Testimonials3 pt="pt-115" />
      <Faq2 />
      <CallToAction1 />
      <Blogs2 type={2} pb={"pb-70"} />
      <Features4 />
    </main>
  );
};

export default AboutMain;
