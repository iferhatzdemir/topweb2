import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import ServiceDetailsPrimary from "@/components/sections/service-details/ServiceDetailsPrimary";

const ServiceDetailsMain = () => {
  return (
    <main>
      <HeroPrimary
        title={"Service Details"}
        text="Car Repair"
        item={{ name: "Service", path: "/services" }}
      />
      <ServiceDetailsPrimary />
      <Features4 />
    </main>
  );
};

export default ServiceDetailsMain;
