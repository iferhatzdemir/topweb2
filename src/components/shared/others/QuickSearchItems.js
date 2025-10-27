"use client";

import { useCommonContext } from "@/providers/CommonContext";
import Image from "next/image";
import Link from "next/link";

const QuickSearchItems = () => {
  const {
    searchedItems,
    isShowSearch,
    sidebar,
    isShowQuickSearchResult,
    isShop,
  } = useCommonContext();

  return (
    <div
      className={`sidebar__post quick-search ${
        isShop ? "quick-search-shop" : ""
      } ${
        searchedItems?.length && !isShowSearch && isShowQuickSearchResult
          ? "active"
          : ""
      }`}
    >
      <ul>
        {searchedItems
          ?.slice(0, 5)
          ?.map(({ image, title, id, publishDate, desc }, idx) => (
            <li key={idx}>
              <Link href={`/${isShop ? "products" : "blogs"}/${id}`}>
                <div className="sidebar__post__img">
                  <Image
                    alt=""
                    loading="lazy"
                    src={image}
                    width={1000}
                    height={1000}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="sidebar__post__text">
                  <h6>
                    {title?.length > 18 ? `${title?.slice(0, 18)}...` : title}
                  </h6>

                  {desc || publishDate ? (
                    <span className="text__gradient">
                      {sidebar === "service" ? desc?.slice(1, 15) : publishDate}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default QuickSearchItems;
