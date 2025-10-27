import Home4Main from "@/components/layout/main/Home4Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Home4 = () => {
  return (
    <PageWrapper headerStyle={5} footerBg={"light"} navBg={"secondary"}>
      <Home4Main />
    </PageWrapper>
  );
};

export default Home4;
