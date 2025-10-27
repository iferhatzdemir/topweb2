import PortfolioMain from "@/components/layout/main/PortfolioMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Portfolio2 = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <PortfolioMain type={2} />
    </PageWrapper>
  );
};

export default Portfolio2;
