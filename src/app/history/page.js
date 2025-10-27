import HistoryMain from "@/components/layout/main/HistoryMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const History = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <HistoryMain />
    </PageWrapper>
  );
};

export default History;
