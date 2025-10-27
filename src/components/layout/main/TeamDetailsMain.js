import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import TeamDetailsPrimary from "@/components/sections/team-details/TeamDetailsPrimary";
import React from "react";

const TeamDetailsMain = () => {
  return (
    <main>
      <HeroPrimary title={"Personal Details"} text={"Team Details"} />
      <TeamDetailsPrimary />
      <Features4 />
    </main>
  );
};

export default TeamDetailsMain;
