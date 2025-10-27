import CartPrimary from "@/components/sections/cart/CartPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const CartMain = () => {
  return (
    <main>
      <HeroPrimary title="Cart" text="Cart" />
      <CartPrimary />
      <Features4 />
    </main>
  );
};

export default CartMain;
