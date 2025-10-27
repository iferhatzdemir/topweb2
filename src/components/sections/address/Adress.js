import Image from "next/image";

const Adress = () => {
  return (
    <div className="ltn__contact-address-area mb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <Image
                  src="/img/icons/10.png"
                  width={84}
                  height={82}
                  alt="Icon Image"
                />
              </div>
              <h3>Email Address</h3>
              <p>
                info@webmail.com <br />
                jobs@webexample.com
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <Image
                  src="/img/icons/10.png"
                  width={84}
                  height={82}
                  alt="Icon Image"
                />
              </div>
              <h3>Phone Number</h3>
              <p>
                +0123-456789 <br /> +987-6543210
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <Image
                  src="/img/icons/10.png"
                  width={84}
                  height={82}
                  alt="Icon Image"
                />
              </div>
              <h3>Office Address</h3>
              <p>
                18/A, New Born Town Hall <br />
                New York, US
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adress;
