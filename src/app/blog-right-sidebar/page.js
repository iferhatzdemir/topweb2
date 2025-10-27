import React from "react";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import BlogsMain from "@/components/layout/main/BlogsMain";

const blogRightSidebar = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <BlogsMain title="Blog Right Sidebar" />
    </PageWrapper>
  );
};

export default blogRightSidebar;
