import CallToActionForm from "@/components/sections/call-to-action/CallToActionForm";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import Skills from "@/components/sections/skills/Skills";
import TeamPrimary from "@/components/sections/team/TeamPrimary";
import React from "react";

const TeamMain = () => {
  return (
    <main>
      <HeroPrimary title={"Our Experts"} text={"Team"} />
      <TeamPrimary />
      <CallToActionForm type={2} />
      <Skills />
      <Features4 />
    </main>
  );
};

export default TeamMain;
