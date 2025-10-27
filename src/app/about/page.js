import AboutMain from "@/components/layout/main/AboutMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const About = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <AboutMain />
    </PageWrapper>
  );
};

export default About;
