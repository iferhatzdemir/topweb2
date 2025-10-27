import ShopMain from "@/components/layout/main/ShopMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const ShopGrid = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ShopMain isSidebar={false} title={"Shop Grid"} />
    </PageWrapper>
  );
};

export default ShopGrid;
