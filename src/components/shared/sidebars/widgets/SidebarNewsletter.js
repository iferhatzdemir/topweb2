import React from "react";

const SidebarNewsletter = () => {
  return (
    <div className="widget ltn__search-widget ltn__newsletter-widget">
      <h6 className="ltn__widget-sub-title">{"//"} subscribe</h6>
      <h4 className="ltn__widget-title">Get Newsletter</h4>
      <form action="#">
        <input type="text" name="search" placeholder="Search" />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="ltn__newsletter-bg-icon">
        <i className="fas fa-envelope-open-text"></i>
      </div>
    </div>
  );
};

export default SidebarNewsletter;
