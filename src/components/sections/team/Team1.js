import TeamCardPrimary from "@/components/shared/cards/TeamCardPrimary";
import getTeamMembers from "@/libs/getTeamMembers";
import React from "react";

const Team1 = () => {
  const team = getTeamMembers()?.filter(({ id }) => id < 5);
  return (
    <div className="ltn__team-area pt-115 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h1 className="section-title ">Team Member</h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {team?.map((teamSingle, idx) => (
            <div key={idx} className="col-xl-3 col-lg-4 col-sm-6">
              <TeamCardPrimary teamSingle={teamSingle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team1;
