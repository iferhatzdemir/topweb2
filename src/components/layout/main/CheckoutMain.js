import CheckoutPrimary from "@/components/sections/checkout/CheckoutPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";

const CheckoutMain = () => {
  return (
    <main>
      <HeroPrimary title="Checkout" text="Checkout" />
      <CheckoutPrimary />
      <Features4 />
    </main>
  );
};

export default CheckoutMain;
