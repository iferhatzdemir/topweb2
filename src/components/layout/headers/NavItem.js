import Link from "next/link";
import React from "react";

const NavItem = ({ item }) => {
  const { name, path, dropdown } = item;
  return (
    <React.Fragment>
      <li
        className={
          dropdown
            ? name === "Pages"
              ? "menu-icon mega-menu-parent"
              : "menu-icon"
            : ""
        }
      >
        <Link href={path}>{name}</Link>
        {dropdown ? dropdown : ""}
      </li>{" "}
    </React.Fragment>
  );
};

export default NavItem;
