import AccountPrimary from "@/components/sections/account/AccountPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const AccountMain = () => {
  return (
    <main>
      <HeroPrimary title={"My Account"} text="My Account" />
      <AccountPrimary />
      <Features4 />
    </main>
  );
};

export default AccountMain;
