import BlogsMain from "@/components/layout/main/BlogsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const BlogsLeftSidebar = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <BlogsMain title={"Blog Left Sidebar"} isLeftSidebar={true} />
    </PageWrapper>
  );
};

export default BlogsLeftSidebar;
