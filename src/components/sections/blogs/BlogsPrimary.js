"use client";
import BlogCardPrimaryLarge from "@/components/shared/cards/BlogCardPrimaryLarge";
import Nodata from "@/components/shared/no-data/Nodata";

import Pagination from "@/components/shared/paginations/Pagination";
import BlogSidebar from "@/components/shared/sidebars/BlogSidebar";
import usePagination from "@/hooks/usePagination";
import { useCommonContext } from "@/providers/CommonContext";

const BlogsPrimary = ({ isLeftSidebar }) => {
  const { filteredBlogs } = useCommonContext();

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
  } = usePagination(filteredBlogs, 7, 5);

  return (
    <div className="ltn__blog-area mb-120" id="blogs">
      <div className="container">
        <div className={`row `}>
          <div className={` col-lg-8 ${isLeftSidebar ? "order-lg-2" : ""}`}>
            <div className="ltn__blog-list-wrap">
              {/* <!-- Blog Item --> */}
              {!currentItems?.length ? (
                <Nodata text={"No Blog Found!"} />
              ) : (
                currentItems?.map((blog, idx) => (
                  <BlogCardPrimaryLarge key={idx} blog={blog} />
                ))
              )}
            </div>
            {totalPages > 1 ? (
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
            ) : (
              ""
            )}
          </div>
          <div className="col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPrimary;
