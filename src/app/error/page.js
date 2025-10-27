import React from "react";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import NotFoundMain from "@/components/layout/main/NotFoundMain";

const Error = ({ title, pathName }) => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <NotFoundMain title={title} pathName={pathName} />
    </PageWrapper>
  );
};

export default Error;
