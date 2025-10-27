import Home10Main from "@/components/layout/main/Home10Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Home10 = () => {
  return (
    <PageWrapper headerStyle={5} footerBg={"light"} navBg={"secondary"}>
      <Home10Main />
    </PageWrapper>
  );
};

export default Home10;
