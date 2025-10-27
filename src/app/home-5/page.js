import Home5Main from "@/components/layout/main/Home5Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Home5 = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <Home5Main />
    </PageWrapper>
  );
};

export default Home5;
