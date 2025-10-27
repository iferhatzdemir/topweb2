import Home7Main from "@/components/layout/main/Home7Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Home7 = () => {
  return (
    <PageWrapper
      isStickyOnMobile
      isNotHeaderTop={true}
      isHeaderRight={true}
      isNavbarAppointmentBtn={true}
    >
      <Home7Main />
    </PageWrapper>
  );
};

export default Home7;
