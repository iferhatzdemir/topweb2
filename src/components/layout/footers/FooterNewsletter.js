import Image from "next/image";

const FooterNewsletter = () => {
  return (
    <div className="col-xl-3 col-md-6 col-sm-12 col-12">
      <div className="footer-widget footer-newsletter-widget">
        <h4 className="footer-title">Newsletter</h4>
        <p>Subscribe to our weekly Newsletter and receive updates via email.</p>
        <div className="footer-newsletter">
          <form action="#">
            <input type="email" name="email" placeholder="Email*" />
            <div className="btn-wrapper">
              <button className="theme-btn-1 btn" type="submit">
                <i className="fas fa-location-arrow"></i>
              </button>
            </div>
          </form>
        </div>
        <h5 className="mt-30">We Accept</h5>
        <Image
          src="/img/icons/payment-4.png"
          width={370}
          height={42}
          alt="Payment Image"
        />
      </div>
    </div>
  );
};

export default FooterNewsletter;
