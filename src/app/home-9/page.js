import Home9Main from "@/components/layout/main/Home9Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Home9 = () => {
  return (
    <PageWrapper
      isStickyOnMobile
      isNotTransparent={true}
      isHeaderRight={true}
      isNavbarAppointmentBtn={true}
      footerBg={"dark"}
    >
      <Home9Main />
    </PageWrapper>
  );
};

export default Home9;
