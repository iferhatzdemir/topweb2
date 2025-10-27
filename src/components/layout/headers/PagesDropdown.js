import Image from "next/image";
import Link from "next/link";
import React from "react";
import DropdownItem from "./DropdownItem";

const PagesDropdown = ({ itmes }) => {
  return (
    <ul className="mega-menu column-4">
      {itmes?.map(({ title, path, dropdownItems, bannerImg }, idx) => (
        <li key={idx}>
          <Link href={bannerImg ? "/shop" : path}>
            {bannerImg ? <Image src={bannerImg} alt="#" width={1000} height={1000}/> : title} 
          </Link>
          {dropdownItems ? (
            <ul>
              {dropdownItems?.map((item, idx) => (
                <li key={idx}>
                  <DropdownItem item={item} />
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
};

export default PagesDropdown;
