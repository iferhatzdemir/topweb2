"use client";
import BlogsPrimary from "@/components/sections/blogs/BlogsPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import useSearch from "@/hooks/useSearch";
import filterItems from "@/libs/filterItems";
import getAllBlogs from "@/libs/getAllBlogs";
import makeText from "@/libs/makeText";
import CommonContext from "@/providers/CommonContext";
import { usePathname, useSearchParams } from "next/navigation";

const BlogsMain = ({ title, isLeftSidebar }) => {
  const allBlogs = getAllBlogs();
  const category = useSearchParams()?.get("category");
  const tag = useSearchParams()?.get("tag");
  const author = useSearchParams()?.get("author");
  const author_role = useSearchParams()?.get("author_role");
  const currentPath = usePathname();
  const search = useSearchParams()?.get("search");
  // get searched blogs
  const {
    searchedItems,
    isShowSearch,
    handleSearch,
    handleSearchString,
    startSearch,
    closeSearch,
    isShowQuickSearchResult,
    setIsShowQuickSearchResult,
  } = useSearch(allBlogs, currentPath);

  const filteredBlogs = filterItems(
    allBlogs,
    category
      ? "category"
      : tag
      ? "tags"
      : author
      ? "author"
      : author_role
      ? "role"
      : search
      ? "search"
      : "",
    category
      ? category
      : tag
      ? tag
      : author
      ? author
      : author_role
      ? author_role
      : search
      ? search
      : ""
  );

  return (
    <main>
      <HeroPrimary
        title={
          category
            ? `Category: ${makeText(category)}`
            : author
            ? `Author: ${makeText(author)}`
            : tag
            ? `Tag: ${makeText(tag)}`
            : author_role
            ? `Author Role: ${author_role}`
            : search
            ? `Search: ${makeText(search)}`
            : title
            ? title
            : "News Feeds"
        }
        text="Blogs"
        isCapitalize={author ? true : false}
      />
      <CommonContext
        value={{
          filteredBlogs,
          searchedItems,
          handleSearch,
          handleSearchString,
          startSearch,
          closeSearch,
          isShowSearch,
          currentPath,
          isShowQuickSearchResult,
          setIsShowQuickSearchResult,
          category,
          tag,
        }}
      >
        <BlogsPrimary isLeftSidebar={isLeftSidebar} />
      </CommonContext>
      <Features4 />
    </main>
  );
};

export default BlogsMain;
