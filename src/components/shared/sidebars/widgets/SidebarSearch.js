import { useCommonContext } from "@/providers/CommonContext";
import React from "react";
import QuickSearchItems from "../../others/QuickSearchItems";

const SidebarSearch = () => {
  const {
    handleSearch,
    handleSearchString,
    startSearch,
    closeSearch,
    sidebar,
    setIsShowQuickSearchResult,
    searchedItems,
  } = useCommonContext();

  return (
    <div className="widget ltn__search-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Search Objects
      </h4>
      <form style={{ position: "relative" }} onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          name="search"
          placeholder="Search your keyword..."
          onBlur={() => setIsShowQuickSearchResult(false)}
          onChange={(e) => handleSearchString(e)}
          onKeyDown={closeSearch}
          onKeyUp={startSearch}
          required
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
        <QuickSearchItems />
      </form>
    </div>
  );
};

export default SidebarSearch;
