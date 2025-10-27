import ShopMain from "@/components/layout/main/ShopMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const ShopLeftSidebar = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ShopMain isSidebar="left" title={"Shop Left Sidebar"} />
    </PageWrapper>
  );
};

export default ShopLeftSidebar;
