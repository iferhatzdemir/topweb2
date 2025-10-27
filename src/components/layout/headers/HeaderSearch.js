import React from "react";

const HeaderSearch = () => {
  return (
    <div className="col header-contact-serarch-column d-none d-lg-block">
      <div className="header-contact-search">
        {/* <!-- header-feature-item --> */}
        <div className="header-feature-item">
          <div className="header-feature-icon">
            <i className="icon-call"></i>
          </div>
          <div className="header-feature-info">
            <h6>Phone</h6>
            <p>
              <a href="tel:0123456789">+0123-456-789</a>
            </p>
          </div>
        </div>
        {/* <!-- header-search-2 --> */}
        <div className="header-search-2">
          <form id="#123" method="get" action="#">
            <input type="text" name="search" placeholder="Search here..." />
            <button type="submit">
              <span>
                <i className="icon-search"></i>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
