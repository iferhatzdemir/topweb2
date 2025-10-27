import Link from "next/link";

const CallToAction6 = () => {
  return (
    <div
      className="call-to-action-area call-to-action-5 bg-image bg-overlay-theme-90 pt-40 pb-25"
      data-bs-bg="/img/bg/13.jpg"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="call-to-action-inner call-to-action-inner-5 text-decoration text-center">
              <h2 className="white-color">
                24/7 Availability, Make{" "}
                <Link href="/contact">An Appointment</Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction6;
