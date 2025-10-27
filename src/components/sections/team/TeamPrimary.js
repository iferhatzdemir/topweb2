import TeamCard from "@/components/shared/cards/TeamCard";
import TeamCardPrimary from "@/components/shared/cards/TeamCardPrimary";
import getTeamMembers from "@/libs/getTeamMembers";
import Image from "next/image";
import React from "react";

const TeamPrimary = () => {
  const team = getTeamMembers()?.filter(({ id }) => id < 9);
  return (
    <div className="ltn__team-area  pb-90">
      <div className="container">
        <div className="row justify-content-center">
          {team?.map((teamSingle, idx) => (
            <div key={idx} className="col-xl-3 col-lg-4 col-sm-6">
              <TeamCardPrimary teamSingle={teamSingle} isPrimary={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPrimary;
