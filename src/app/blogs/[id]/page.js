import BlogDetailsMain from "@/components/layout/main/BlogDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getAllBlogs from "@/libs/getAllBlogs";
import { notFound } from "next/navigation";
import React from "react";
const blogs = getAllBlogs();
const BlogDetails = ({ params }) => {
  const { id } = params;
  const isExistBlog = blogs?.find(({ id: id1 }) => id1 === parseInt(id));
  if (!isExistBlog) {
    notFound();
  }
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <BlogDetailsMain />
    </PageWrapper>
  );
};
export async function generateStaticParams() {
  return blogs?.map(({ id }) => ({ id: id.toString() }));
}
export default BlogDetails;
