const CallToActionForm = ({ type }) => {
  return (
    <div
      className={`ltn__service-form-wrap-area ${type === 2 ? "plr--5" : ""}`}
    >
      <div className="container-fluid ">
        <div className="row">
          <div
            className={`  ${
              type === 2 ? "col-xl-12" : "col-xl-11 offset-xl-1"
            }`}
          >
            <div
              className={`ltn__service-form-area ltn__service-form-1 ${
                type === 2 ? "" : "ltn__service-form-margin"
              } bg-image bg-overlay-theme-black-60 pt-115 pb-95`}
              data-bs-bg="/img/bg/2.jpg"
            >
              <div className="row">
                <div className="col-xl-5 col-lg-12 align-self-center">
                  <div className="ltn__service-form-brief">
                    <div className="section-title-area ltn__section-title-2 mb-0">
                      <h6 className="section-subtitle white-color">
                        {"//"} Call To Action
                      </h6>
                      <h1 className="section-title white-color">
                        Get An Free Service From Us.
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-12 align-self-center">
                  <div className="ltn__service-form-wrap ltn__service-form-color-white">
                    <form action="#" className="ltn__service-form-box">
                      <ul>
                        <li>
                          <select className="nice-select">
                            <option>Service Name</option>
                            <option>Gardening </option>
                            <option>Landscaping </option>
                            <option>Land Preparation</option>
                            <option>Vegetable Growing</option>
                          </select>
                        </li>
                        <li>
                          <div className="input-item input-item-date mb-0 ltn__custom-icon">
                            <input type="text" name="date" placeholder="DATE" />
                          </div>
                        </li>
                        <li>
                          <div className="btn-wrapper">
                            <button
                              type="submit"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                            >
                              Check Availability
                            </button>
                          </div>
                        </li>
                      </ul>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionForm;
