import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import WishlistPrimary from "@/components/sections/wishlist/WishlistPrimary";
import React from "react";

const WishlistMain = () => {
  return (
    <main>
      <HeroPrimary title="Favorilere Ekle" text="Wishlist" />
      <WishlistPrimary />
      <Features4 />
    </main>
  );
};

export default WishlistMain;
