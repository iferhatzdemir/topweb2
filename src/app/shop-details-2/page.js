import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const ProductDetails2 = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ProductDetailsMain isNotSidebar={true} type={2} />
    </PageWrapper>
  );
};

export default ProductDetails2;
