import BlogsGridPrimary from "@/components/sections/blogs/BlogsGridPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";

const BlogGridMain = () => {
  return (
    <main>
      <HeroPrimary title={"Blog Grid"} text={"Blogs"} />
      <BlogsGridPrimary />
      <Features4 />
    </main>
  );
};

export default BlogGridMain;
