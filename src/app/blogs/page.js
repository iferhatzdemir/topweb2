import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import BlogPageContent from "@/components/cms/BlogPageContent";
import { listBlogPosts } from "@/lib/cms/queries";

export const revalidate = 300;

const Blogs = async () => {
  const posts = await listBlogPosts();
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <BlogPageContent initialPosts={posts} />
    </PageWrapper>
  );
};

export default Blogs;
