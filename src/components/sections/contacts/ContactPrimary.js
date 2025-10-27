"use client";

import { useEffect, useState } from "react";

const ContactPrimary = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    agree: false,
    message: "",
  });
  const [serviceType, setServiceType] = useState("Select Service Type");
  const [status, setStatus] = useState("");
  // get value from input
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "agree" ? checked : value,
      serviceType,
    });
  };
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("Thanks! Your message has been sent.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          agree: false,
          serviceType: "Select Service Type",
          message: "",
        });
      } else {
        setStatus("Failed to send email.");
      }
    } catch (error) {
      setStatus("Failed to send email.");
    }
  };
  useEffect(() => {
    let selectCurrent = document.querySelector(".nice-select .current");
    const currentServiceType = selectCurrent?.innerText;
    if (currentServiceType) {
      setServiceType(currentServiceType);
    }
    if (status && selectCurrent) {
      setServiceType("Select Service Type");
      selectCurrent.innerText = "Select Service Type";
    }
  }, [formData.agree, status]);
  return (
    <div className="ltn__contact-message-area mb-120 mb--100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__form-box contact-form-box box-shadow white-bg">
              <h4 className="title-2">Get A Quote</h4>
              <form id="contact-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item input-item-email ltn__custom-icon">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item">
                      <select name="serviceType" className="nice-select">
                        <option>Select Service Type</option>
                        <option>Car Repair </option>
                        <option>Engine Repairing </option>
                        <option>Oil Change</option>
                        <option>Car Wash</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item input-item-phone ltn__custom-icon">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="input-item input-item-textarea ltn__custom-icon">
                  <textarea
                    name="message"
                    placeholder="Enter message"
                    value={formData.message}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <p>
                  <label className="input-info-save mb-0">
                    <input
                      type="checkbox"
                      name="agree"
                      onChange={(e) => handleChange(e)}
                      checked={formData.agree}
                    />{" "}
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </p>
                <div className="btn-wrapper mt-0">
                  <button
                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                    type="submit"
                    disabled={!formData.agree}
                  >
                    get an free service
                  </button>
                </div>
                {status ? (
                  <p
                    className="form-messege mb-0 mt-20"
                    style={{
                      color: status?.includes("Failed") ? "red" : "green",
                    }}
                  >
                    {status}
                  </p>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPrimary;
