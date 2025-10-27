import PortfolioMain from "@/components/layout/main/PortfolioMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Portfolio = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <PortfolioMain />
    </PageWrapper>
  );
};

export default Portfolio;
