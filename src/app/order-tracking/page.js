import OrderTrackingMain from "@/components/layout/main/OrderTrackingMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const OrderTracking = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <OrderTrackingMain />
    </PageWrapper>
  );
};

export default OrderTracking;
