import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import RegisterPrimary from "@/components/sections/register/RegisterPrimary";
import React from "react";

const RegisterMain = () => {
  return (
    <main>
      <HeroPrimary title={"Sign Up"} text="Register" />
      <RegisterPrimary />
      <Features4 />
    </main>
  );
};

export default RegisterMain;
