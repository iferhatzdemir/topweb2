import React from "react";

const FilterForm1 = ({ idx }) => {
  return (
    <div
      className={`tab-pane fade ${idx === 0 ? "active show" : ""}`}
      id={`ltn__form_tab_${idx + 1}`}
    >
      <div className="car-dealer-form-inner">
        <form action="#" className="ltn__car-dealer-form-box row">
          <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-4 col-md-6">
            <select className="nice-select">
              <option>Select Year</option>
              <option>2015</option>
              <option>2016</option>
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
            </select>
          </div>
          <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-4 col-md-6">
            <select className="nice-select">
              <option>Select Brand</option>
              <option>Audi</option>
              <option>BMW</option>
              <option>Honda</option>
              <option>Nissan</option>
            </select>
          </div>
          <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-4 col-md-6">
            <select className="nice-select">
              <option>Select Model</option>
              <option>Any</option>
              <option>6 Series (1)</option>
              <option>7 Series (1)</option>
              <option>8 Series (1)</option>
            </select>
          </div>
          <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-ring col-lg-4 col-md-6">
            <select className="nice-select">
              <option>Select Mileage</option>
              <option>2019 Toyota Camry (2WD 2.5L)</option>
              <option>2018 Honda Accord (2WD 1.5L)</option>
              <option>2018 Nissan Versa (2WD 1.6L)</option>
              <option>2017 Honda Civic (2WD 1.5L)</option>
            </select>
          </div>
          <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-transgender col-lg-4 col-md-6">
            <select className="nice-select">
              <option>Select Transmission</option>
              <option>1. Manual transmission</option>
              <option>2. Automatic transmission</option>
              <option>3. Continuously variable transmission (CVT)</option>
              <option>4. Semi-automatic and dual-clutch transmissions</option>
            </select>
          </div>
          <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-cog col-lg-4 col-md-6">
            <select className="nice-select">
              <option>Select Condition</option>
              <option>1 - Excellent condition</option>
              <option>2 - Very Good condition</option>
              <option>3 - Good condition</option>
              <option>4 - Fair condition</option>
              <option>5 - Poor condition</option>
              <option>6 - Parts or Salvage</option>
            </select>
          </div>
          <div className="car-price-filter-range col-lg-12">
            <div className="price_filter">
              <div className="price_slider_amount">
                <input type="submit" value="Your range:" />
                <input
                  type="text"
                  className="amount"
                  name="price"
                  placeholder="Add Your Price"
                />
              </div>
              <div className="slider-range"></div>
            </div>
            <div className="btn-wrapper text-center">
              <button
                type="submit"
                className="btn theme-btn-1 btn-effect-1 text-uppercase"
              >
                Search Inventory
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterForm1;
