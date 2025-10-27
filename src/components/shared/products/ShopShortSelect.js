"use client";
import getNiceSelectValue from "@/libs/getNiceSelectValue";
import { useEffect } from "react";

const selectInputs = [
  {
    value: "default",
    name: "Default Sorting",
  },
  {
    value: "popularity",
    name: "Sort by popularity",
  },
  {
    value: "new",
    name: "Sort by new arrivals",
  },
  {
    value: "price ascending",
    name: "Sort by price: low to high",
  },
  {
    value: "price descending",
    name: "Sort by price: high to low",
  },
];
const ShopShortSelect = ({ setArrangeInput }) => {
  useEffect(() => {
    getNiceSelectValue(setArrangeInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="short-by text-center">
      <select className="nice-select">
        {selectInputs?.map(({ value, name }, idx) => (
          <option value={value} key={idx}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ShopShortSelect;
