import TeamMain from "@/components/layout/main/TeamMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Team = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <TeamMain />
    </PageWrapper>
  );
};

export default Team;
