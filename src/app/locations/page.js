import LocationsMain from "@/components/layout/main/LocationsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Locations = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <LocationsMain />
    </PageWrapper>
  );
};

export default Locations;
