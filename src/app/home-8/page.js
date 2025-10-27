import Home8Main from "@/components/layout/main/Home8Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Home8 = () => {
  return (
    <PageWrapper
      isStickyOnMobile
      isNotTransparent={true}
      isHeaderRight={true}
      isNavbarAppointmentBtn={true}
      footerBg={"dark"}
    >
      <Home8Main />
    </PageWrapper>
  );
};

export default Home8;
