import React from "react";

const FilterForm2 = ({ idx }) => {
  return (
    <div className="tab-pane fade" id={`ltn__form_tab_${idx + 1}`}>
      <div className="car-dealer-form-inner">
        <form action="#" className="ltn__car-dealer-form-box row">
          <div className="col-lg-3 col-md-6">
            <div className="input-item input-item-name ltn__custom-icon">
              <input type="text" name="name" placeholder="First Name" />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="input-item input-item-name ltn__custom-icon">
              <input type="text" name="lastname" placeholder="Last Name" />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="input-item input-item-name ltn__custom-icon">
              <input type="email" name="email" placeholder="Email Address" />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="input-item input-item-name ltn__custom-icon">
              <input type="text" name="phone" placeholder="Phone Number" />
            </div>
          </div>
          <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-3 col-md-6">
            <select className="nice-select">
              <option>All Makes</option>
              <option>Audi</option>
              <option>BMW</option>
              <option>Honda</option>
              <option>Nissan</option>
            </select>
          </div>
          <div className="ltn__car-dealer-form-item ltn__datepicker col-lg-3 col-md-6">
            <div className="input-group date" data-provide="datepicker">
              <input
                type="text"
                className="form-control"
                placeholder="Select Date"
              />
              <div className="input-group-addon">
                <i className="far fa-calendar-alt"></i>
              </div>
            </div>
          </div>
          <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-3 col-md-6">
            <select className="nice-select">
              <option>HH:MM</option>
              <option>9:00 AM - 11:00 AM</option>
              <option>11:00 AM - 13:00 PM</option>
              <option>13:00 PM - 15:00 PM</option>
              <option>15:00 PM - 17:00 PM</option>
              <option>17:00 PM - 19:00 PM</option>
            </select>
          </div>
          <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-3 col-md-6">
            <select className="nice-select">
              <option>Select Model</option>
              <option>Any</option>
              <option>6 Series (1)</option>
              <option>7 Series (1)</option>
              <option>8 Series (1)</option>
            </select>
          </div>

          <div className="car-price-filter-range col-lg-12">
            <div className="btn-wrapper text-center mt-0">
              <button
                type="submit"
                className="btn theme-btn-1 btn-effect-1 text-uppercase"
              >
                Submit Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterForm2;
