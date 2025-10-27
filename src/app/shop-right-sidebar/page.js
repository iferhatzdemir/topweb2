import ShopMain from "@/components/layout/main/ShopMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const ShopRightSidebar = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ShopMain title={"Shop Right Sidebar"} />
    </PageWrapper>
  );
};

export default ShopRightSidebar;
