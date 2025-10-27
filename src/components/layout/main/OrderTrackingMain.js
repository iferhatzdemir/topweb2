import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import OrderTrackingPrimary from "@/components/sections/order-tracking/OrderTrackingPrimary";
import React from "react";

const OrderTrackingMain = () => {
  return (
    <main>
      <HeroPrimary title="Order Tracking" text="Order Tracking" />
      <OrderTrackingPrimary />
      <Features4 />
    </main>
  );
};

export default OrderTrackingMain;
