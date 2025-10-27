import DropdownItem from "./DropdownItem";

const CommonDropdown = ({ items }) => {
  return (
    <>
      {items?.map(({ dropdownItems }, idx) => (
        <ul key={idx}>
          {dropdownItems?.map((item, idx) => (
            <li key={idx}>
              <DropdownItem item={item} />
            </li>
          ))}
        </ul>
      ))}
    </>
  );
};

export default CommonDropdown;
