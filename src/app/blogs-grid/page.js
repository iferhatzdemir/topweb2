import BlogGridMain from "@/components/layout/main/BlogGridMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const BlogsGrid = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <BlogGridMain />
    </PageWrapper>
  );
};

export default BlogsGrid;
