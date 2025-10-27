import FaqMain from "@/components/layout/main/FaqMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Faq = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <FaqMain />
    </PageWrapper>
  );
};

export default Faq;
