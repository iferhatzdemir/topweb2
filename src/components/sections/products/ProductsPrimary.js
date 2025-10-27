"use client";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import ProductCardPrimary2 from "@/components/shared/cards/ProductCardPrimary2";
import Nodata from "@/components/shared/no-data/Nodata";
import Pagination from "@/components/shared/paginations/Pagination";
import ShopDataShowing from "@/components/shared/products/ShopDataShowing";
import ShopShortSelect from "@/components/shared/products/ShopShortSelect";
import ProductSidebar from "@/components/shared/sidebars/ProductSidebar";
import usePagination from "@/hooks/usePagination";
import filterItems from "@/libs/filterItems";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProductsPrimary = ({ isSidebar, currentTapId }) => {
  const [arrangeInput, setArrangeInput] = useState("default");
  const [currentTab, setCurrentTab] = useState(currentTapId ? currentTapId : 0);

  const { filteredProducts } = useCommonContext();
  const limit =
    currentTab === 1
      ? isSidebar === false
        ? 4
        : 7
      : isSidebar === false
      ? 16
      : 21;

  const arrangedProducts = filterItems(
    filteredProducts,
    arrangeInput,
    arrangeInput
  );
  // get pagination details
  const {
    currentItems,
    totalItems,
    currentpage,
    setCurrentpage,
    paginationItems,
    currentPaginationItems,
    showMore,
    totalPages,
    handleCurrentPage,
    firstItem,
    lastItem,
  } = usePagination(arrangedProducts, limit, 5);

  const tabControllers = ["fas fa-th-large", "fas fa-list"];
  useEffect(() => {
    setCurrentpage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  return (
    <div className="ltn__product-area ltn__product-gutter mb-120">
      <div className="container">
        <div className="row">
          <div
            className={`${isSidebar === false ? "col-lg-12" : "col-lg-8"}  ${
              isSidebar === "left" ? "order-lg-2 " : ""
            }`}
          >
            {!totalPages ? <Nodata text={"No Product Found!"} /> : ""}

            <div
              className={`ltn__shop-options ${!totalPages ? "no-data" : ""}`}
            >
              <ul>
                <li>
                  <div className="ltn__grid-list-tab-menu ">
                    <div className="nav">
                      {tabControllers?.map((iconName, idx) => (
                        <Link
                          key={idx}
                          onClick={() => setCurrentTab(idx)}
                          className={idx === currentTab ? "active " : ""}
                          data-bs-toggle="tab"
                          href={`#liton_product_${idx + 1}`}
                        >
                          <i className={iconName}></i>
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
                <li>
                  {isSidebar === "left" || isSidebar === false ? (
                    <ShopShortSelect setArrangeInput={setArrangeInput} />
                  ) : (
                    <ShopDataShowing
                      limit={limit}
                      totalItems={totalItems}
                      firstItem={firstItem}
                      lastItem={lastItem}
                    />
                  )}
                </li>
                <li>
                  {isSidebar === "left" || isSidebar === false ? (
                    <ShopDataShowing
                      limit={limit}
                      totalItems={totalItems}
                      firstItem={firstItem}
                      lastItem={lastItem}
                    />
                  ) : (
                    <ShopShortSelect setArrangeInput={setArrangeInput} />
                  )}
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div
                className={`tab-pane fade ${
                  currentTab === 0 ? " active " : ""
                }`}
                id="liton_product_1"
              >
                <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                  <div className="row">
                    {/* <!-- ltn__product-item --> */}
                    {currentItems?.map((product, idx) => (
                      <div
                        className={`${
                          isSidebar === false ? "col-xl-3 col-lg-4" : "col-xl-4"
                        }  col-sm-6 col-6`}
                        key={idx}
                      >
                        <ProductCardPrimary product={product} />
                      </div>
                    ))}

                    {/* <!--  --> */}
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${currentTab === 1 ? " active" : ""}`}
                id="liton_product_2"
              >
                <div className="ltn__product-tab-content-inner ltn__product-list-view">
                  <div className="row">
                    {/* <!-- ltn__product-item --> */}
                    {currentItems?.map((product, idx) => (
                      <div className="col-lg-12" key={idx}>
                        <ProductCardPrimary2 product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {totalPages > 1 ? (
              <Pagination
                totalPages={totalPages}
                currentPaginationItems={currentPaginationItems}
                showMore={showMore}
                items={paginationItems}
                currenIndex={currentpage}
                handleCurrentPage={handleCurrentPage}
              />
            ) : (
              ""
            )}
          </div>
          {isSidebar === false ? (
            ""
          ) : (
            <div className="col-lg-4">
              <ProductSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPrimary;
