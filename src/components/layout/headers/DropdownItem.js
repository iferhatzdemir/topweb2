import Image from "next/image";
import Link from "next/link";
import CommonDropdown from "./CommonDropdown";

const DropdownItem = ({ item }) => {
  const { name, path, nestedDropdownItems, img, label } = item;
  return (
    <>
      <Link href={path}>
        {name}{" "}
        {nestedDropdownItems ? <span className="float-end">{">>"}</span> : ""}
        {label ? <span className="menu-item-badge">{label}</span> : ""}
      </Link>
      {img ? <Image src={img} alt="#" width={1000} height={1000}/> : ""}
      {nestedDropdownItems ? (
        <CommonDropdown items={[{ dropdownItems: nestedDropdownItems }]} />
      ) : (
        ""
      )}
    </>
  );
};

export default DropdownItem;
