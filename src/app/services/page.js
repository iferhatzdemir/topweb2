import ServicesMain from "@/components/layout/main/ServicesMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Services = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ServicesMain />
    </PageWrapper>
  );
};

export default Services;
