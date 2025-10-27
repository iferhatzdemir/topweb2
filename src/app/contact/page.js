import ContactMain from "@/components/layout/main/ContactMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Contact = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ContactMain />
    </PageWrapper>
  );
};

export default Contact;
