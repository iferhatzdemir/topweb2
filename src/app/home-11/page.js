import Home11Main from "@/components/layout/main/Home11Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Home11 = () => {
  return (
    <PageWrapper
      isStickyOnMobile
      isNotTransparent={true}
      isHeaderRight={true}
      isNavbarAppointmentBtn={true}
    >
      <Home11Main />
    </PageWrapper>
  );
};

export default Home11;
