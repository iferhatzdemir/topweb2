"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import FilterForm1 from "../tab/FilterForm1";
import FilterForm2 from "../tab/FilterForm2";
import getRangeValue from "@/libs/getRangeValue";

const DealarForm = () => {
  const [rangeValue, setRangeValue] = useState(null);
  const maxSize = 5000;
  const intLowerLimit = 50;
  const intUpperLimit = 1500;
  const tabControllers = [
    {
      text: "Find A Car",
      icon: <i className="fas fa-car"></i>,
    },
    {
      text: "Get a Dealer",
      icon: <i className="far fa-user"></i>,
    },
    {
      text: "Find Accessories",
      icon: <i className="fas fa-cogs"></i>,
    },
    {
      text: "Booking",
      icon: <i className="fas fa-cogs"></i>,
    },
  ];
  useEffect(() => {
    getRangeValue(setRangeValue, maxSize, intLowerLimit, intUpperLimit);
  }, []);
  return (
    <div className="ltn__car-dealer-form-tab">
      <div className="ltn__tab-menu  text-uppercase">
        <div className="nav">
          {tabControllers?.map(({ text, icon }, idx) => (
            <Link
              key={idx}
              className={idx === 0 ? `active show ` : ""}
              data-bs-toggle="tab"
              href={`#ltn__form_tab_${idx + 1}`}
              style={{ marginRight: idx !== 3 ? "10px" : "" }}
            >
              {icon}
              {text}
            </Link>
          ))}
        </div>
      </div>
      <div className="tab-content">
        {tabControllers?.map(({ text, icon }, idx) =>
          idx !== 3 ? (
            <FilterForm1 key={idx} idx={idx} />
          ) : (
            <FilterForm2 key={idx} idx={idx} />
          )
        )}
      </div>
    </div>
  );
};

export default DealarForm;
