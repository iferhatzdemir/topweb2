import Home6Main from "@/components/layout/main/Home6Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Home6 = () => {
  return (
    <PageWrapper
      isStickyOnMobile
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <Home6Main />
    </PageWrapper>
  );
};

export default Home6;
