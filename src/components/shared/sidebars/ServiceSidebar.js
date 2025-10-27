import React from "react";
import SidebarBanner from "./widgets/SidebarBanner";
import SidebarNewsletter from "./widgets/SidebarNewsletter";
import ServiceCategories from "./widgets/ServiceCategories";

const ServiceSidebar = ({ image }) => {
  return (
    <aside className="sidebar-area ltn__right-sidebar">
      {/* <!-- Menu Widget --> */}
      <ServiceCategories />
      {/* <!-- Newsletter Widget --> */}
      <SidebarNewsletter />
      {/* <!-- Banner Widget --> */}
      <SidebarBanner image={image} />
    </aside>
  );
};

export default ServiceSidebar;
