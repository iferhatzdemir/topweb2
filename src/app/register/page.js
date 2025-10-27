import RegisterMain from "@/components/layout/main/RegisterMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Register = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <RegisterMain />
    </PageWrapper>
  );
};

export default Register;
