import WishlistMain from "@/components/layout/main/WishlistMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Wishlist = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <WishlistMain />
    </PageWrapper>
  );
};

export default Wishlist;
