"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import ProductsPrimary from "@/components/sections/products/ProductsPrimary";
import useSearch from "@/hooks/useSearch";
import filterItems from "@/libs/filterItems";
import getAllProducts from "@/libs/getAllProducts";
import getRangeValue from "@/libs/getRangeValue";
import makeText from "@/libs/makeText";
import CommonContext from "@/providers/CommonContext";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ShopMain = ({ title, isSidebar, text, currentTapId }) => {
  const allProducts = getAllProducts();
  const category = useSearchParams()?.get("category");
  const brand = useSearchParams()?.get("brand");
  const tag = useSearchParams()?.get("tag");
  const size = useSearchParams()?.get("size");
  const color = useSearchParams()?.get("color");
  const search = useSearchParams()?.get("search");
  const currentPath = usePathname();
  const [rangeValue, setRangeValue] = useState(null);
  const maxSize = 5000;
  const intLowerLimit = 50;
  const intUpperLimit = 1500;
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
  } = useSearch(allProducts, currentPath);

  const ProductsBeforPriceFilter = filterItems(
    allProducts,
    category
      ? "category"
      : brand
      ? "brand"
      : tag
      ? "tags"
      : size
      ? "size"
      : color
      ? "color"
      : search
      ? "search"
      : "",
    category
      ? category
      : brand
      ? brand
      : tag
      ? tag
      : size
      ? size
      : color
      ? color
      : search
      ? search
      : "",
    true
  );
  const filteredProducts = filterItems(
    ProductsBeforPriceFilter,
    rangeValue ? "range" : "",

    rangeValue ? rangeValue : ""
  );

  useEffect(() => {
    getRangeValue(setRangeValue, maxSize, intLowerLimit, intUpperLimit, true);
    setRangeValue(null);
  }, [
    category,
    tag,
    ,
    size,
    ,
    color,
    ,
    search,
    intLowerLimit,
    maxSize,
    intUpperLimit,
  ]);
  useEffect(() => {
    getRangeValue(setRangeValue, maxSize, intLowerLimit, intUpperLimit);
  }, [intLowerLimit, intUpperLimit, maxSize]);

  return (
    <main>
      <HeroPrimary
        title={
          category
            ? `Category: ${makeText(category)}`
            : brand
            ? `Brand: ${makeText(brand)}`
            : size
            ? `Product Size: ${makeText(size)}`
            : tag
            ? `Tag: ${makeText(tag)}`
            : color
            ? `Product  Color: ${makeText(color)}`
            : search
            ? `Search: ${makeText(search)}`
            : title
            ? title
            : "Shop"
        }
        text={text ? text : "Shop"}
        type={isSidebar === "primary" ? 2 : 3}
        isCapitalize={brand ? true : false}
      />
      <CommonContext
        value={{
          filteredProducts,
          searchedItems,
          handleSearch,
          handleSearchString,
          startSearch,
          closeSearch,
          isShowSearch,
          isShowQuickSearchResult,
          setIsShowQuickSearchResult,
          isShop: true,
          currentPath,
          category,
          brand,
          tag,
          size,
        }}
      >
        <ProductsPrimary isSidebar={isSidebar} currentTapId={currentTapId} />
      </CommonContext>
      <Features4 />
    </main>
  );
};

export default ShopMain;
