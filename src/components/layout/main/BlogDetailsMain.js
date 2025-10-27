import BlogDetailsPrimary from "@/components/sections/blog-details/BlogDetailsPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const BlogDetailsMain = () => {
  return (
    <main>
      <HeroPrimary title={"News Details"} text={"News Details"} />
      <BlogDetailsPrimary />
      <Features4 />
    </main>
  );
};

export default BlogDetailsMain;
