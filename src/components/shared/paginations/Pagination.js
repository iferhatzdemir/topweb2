import Link from "next/link";
import React from "react";

const Pagination = ({
  currentPaginationItems,
  showMore,
  items,
  currenIndex,
  handleCurrentPage,
  totalPages,
  path,
}) => {
  return (
    <div className="ltn__pagination-area text-center">
      <div className="ltn__pagination">
        <ul>
          <li>
            <Link
              href={`#${path ? path : "blogs"}`}
              onClick={(e) =>
                handleCurrentPage(e, currenIndex < 1 ? 0 : currenIndex - 1)
              }
              style={{
                visibility: currenIndex > 0 ? "visible" : "hidden",
              }}
            >
              <i className="fas fa-angle-double-left"></i>
            </Link>
          </li>
          {showMore === "left" ? (
            <>
              <li>
                <Link
                  onClick={(e) => handleCurrentPage(e, 0)}
                  href={`#${path ? path : "blogs"}`}
                >
                  1
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => handleCurrentPage(e, currenIndex - 1)}
                  href={`#${path ? path : "blogs"}`}
                >
                  ...
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
          {currentPaginationItems?.map((item, idx) => (
            <li
              key={idx}
              className={` ${item === currenIndex ? "active" : ""}`}
            >
              <Link
                onClick={(e) => handleCurrentPage(e, item)}
                href={`#${path ? path : "blogs"}`}
              >
                {item + 1}
              </Link>
            </li>
          ))}
          {showMore === "right" ? (
            <>
              <li>
                <Link
                  onClick={(e) => handleCurrentPage(e, currenIndex + 1)}
                  href={`#${path ? path : "blogs"}`}
                >
                  ...
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => handleCurrentPage(e, totalPages - 1)}
                  href={`#${path ? path : "blogs"}`}
                >
                  {totalPages}
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
          <li>
            <Link
              href={`#${path ? path : "blogs"}`}
              onClick={(e) =>
                handleCurrentPage(
                  e,
                  currenIndex > totalPages - 2
                    ? totalPages - 1
                    : currenIndex + 1
                )
              }
              style={{
                visibility:
                  currenIndex < items?.length - 1 ? "visible" : "hidden",
              }}
            >
              <i className="fas fa-angle-double-right"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
