const CounterUp = () => {
  const items = [
    {
      title: "Active Clients",
      num: 733,
      letter: null,
      sym: "+",
    },
    {
      title: "Cup Of Coffee",
      num: 33,
      letter: "K",
      sym: "+",
    },
    {
      title: "Get Rewards",
      num: 100,
      letter: null,
      sym: "+",
    },
    {
      title: "Country Cover",
      num: 21,
      letter: null,
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
          <div className="col-lg-4 col-md-12">
            <div className="section-title-area ltn__section-title-2">
              <h6 className="section-subtitle white-color">{"//"} activity</h6>
              <h1 className="section-title white-color">
                It’s Our Journey<span>.</span>
              </h1>
            </div>
          </div>
          {items?.map(({ title, num, letter, sym }, idx) => (
            <div
              key={idx}
              className="col-lg-2 col-md-3 col-sm-6 align-self-center"
            >
              <div className="ltn__counterup-item-3 text-color-white">
                <div className="counter-icon"> {"//"} </div>
                <h1>
                  <span className="counter">{num}</span>
                  {letter ? (
                    <span className="counterUp-letter">{letter}</span>
                  ) : (
                    ""
                  )}
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

export default CounterUp;
