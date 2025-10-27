import TeamDetailsMain from "@/components/layout/main/TeamDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getTeamMembers from "@/libs/getTeamMembers";
import { notFound } from "next/navigation";
import React from "react";
const teamMembers = getTeamMembers();
const TeamDetails = ({ params }) => {
  const { id } = params;
  const isExistTeamMembers = teamMembers?.find(
    ({ id: id1 }) => id1 === parseInt(id)
  );
  if (!isExistTeamMembers) {
    notFound();
  }
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <TeamDetailsMain />
    </PageWrapper>
  );
};
export async function generateStaticParams() {
  return teamMembers?.map(({ id }) => ({ id: id.toString() }));
}

export default TeamDetails;
