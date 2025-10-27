import React from "react";
import DropdownItem from "./DropdownItem";

const HomeDropdown = ({ itmes }) => {
  return (
    <ul className={`sub-menu menu-pages-img-show  ${itmes[0]?.title?"ltn__sub-menu-col-2":""}`}>
      {itmes?.map(({ title, path, dropdownItems }, idx) => (
       
          dropdownItems?.map((dropdownItem, idx) => (
              <li key={idx}>
                <DropdownItem item={dropdownItem} />
              </li>
            ))
      
      ))}
    </ul>
  );
};

export default HomeDropdown;
