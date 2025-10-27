"use client";
import BlogCardPrimary from "@/components/shared/cards/BlogCardPrimary";
import Nodata from "@/components/shared/no-data/Nodata";
import Pagination from "@/components/shared/paginations/Pagination";
import usePagination from "@/hooks/usePagination";
import getAllBlogs from "@/libs/getAllBlogs";

const BlogsGridPrimary = () => {
  const blogs = getAllBlogs();
  // get pagination details
  const {
    currentItems,
    currentpage,
    setCurrentpage,
    paginationItems,
    currentPaginationItems,
    showMore,
    totalPages,
    handleCurrentPage,
    firstItem,
    lastItem,
  } = usePagination(blogs, 6, 5);

  return (
    <div className="ltn__blog-area ltn__blog-item-3-normal mb-100">
      <div className="container">
        <div className="row">
          {/* <!-- Blog Item --> */}
          {!currentItems?.length ? (
            <Nodata text="No Blog!" />
          ) : (
            currentItems?.map((blog, idx) => (
              <div key={idx} className="col-lg-4 col-sm-6 col-12">
                <BlogCardPrimary blog={blog} />
              </div>
            ))
          )}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Pagination
              totalPages={totalPages}
              currentPaginationItems={currentPaginationItems}
              showMore={showMore}
              items={paginationItems}
              currenIndex={currentpage}
              handleCurrentPage={handleCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsGridPrimary;
