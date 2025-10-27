import AccountMain from "@/components/layout/main/AccountMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Account = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <AccountMain />
    </PageWrapper>
  );
};

export default Account;
