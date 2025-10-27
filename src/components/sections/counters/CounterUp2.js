import Image from "next/image";
import React from "react";

const CounterUp2 = () => {
  const items = [
    {
      title: "Active Clients",
      num: 733,
      letter: null,
      image: "/img/icons/icon-img/2.png",
      sym: "+",
    },
    {
      title: "Cup Of Coffee",
      num: 33,
      letter: "K",
      image: "/img/icons/icon-img/3.png",
      sym: "+",
    },
    {
      title: "Get Rewards",
      num: 100,
      letter: null,
      image: "/img/icons/icon-img/4.png",
      sym: "+",
    },
    {
      title: "Country Cover",
      num: 21,
      letter: null,
      image: "/img/icons/icon-img/5.png",
      sym: "+",
    },
  ];
  return (
    <div
      className="ltn__counterup-area bg-image bg-overlay-theme-black-80 pt-115 pb-70"
      data-bs-bg="/img/bg/5.jpg"
    >
      <div className="container">
        <div className="row">
          {items?.map(({ title, num, letter, sym, image }, idx) => (
            <div key={idx} className="col-md-3 col-sm-6 align-self-center">
              <div className="ltn__counterup-item-3 text-color-white text-center">
                <div className="counter-icon">
                  {" "}
                  <Image src={image} alt="#" width={66} height={69} />{" "}
                </div>
                <h1>
                  <span className="counter">{num}</span>
                  <span className="counterUp-icon">{sym}</span>{" "}
                </h1>
                <h6>{title}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterUp2;
