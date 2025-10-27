import Link from "next/link";

const CallToAction3 = () => {
  return (
    <div className="ltn__call-to-action-area call-to-action-2 pt-20 pb-20">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="call-to-action-inner call-to-action-inner-2 text-center">
              <h2>Get A Free Service Or Make A Call</h2>
              <div className="btn-wrapper">
                <Link className="btn btn-effect-4 btn-white" href="/contact">
                  <i className="fas fa-phone-volume"></i> MAKE A CALL
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction3;
