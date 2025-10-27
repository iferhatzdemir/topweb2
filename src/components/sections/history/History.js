import Image from "next/image";

import getHistory from "@/libs/getHistory";

const History = () => {
  const history = getHistory()?.filter(({}, idx) => idx < 5);
  return (
    <div
      className="ltn__our-journey-area bg-image bg-overlay-theme-90 pt-280 pb-350 mb-35 plr--9"
      data-bs-bg="/img/bg/8.jpg"
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__our-journey-wrap ">
              <ul>
                {history?.map(({ title, year, desc, image }, idx) => (
                  <li key={idx} className={idx === 1 ? "active" : ""}>
                    <span className="ltn__journey-icon">{year}</span>
                    <ul>
                      <li>
                        <div className="ltn__journey-history-item-info clearfix">
                          <div className="ltn__journey-history-img">
                            <Image
                              src="/img/service/history-1.jpg"
                              alt="#"
                              priority={false}
                              width={200}
                              height={133}
                              style={{ height: "auto" }}
                            />
                          </div>
                          <div className="ltn__journey-history-info">
                            <h3>{title}</h3>
                            <p>{desc}</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
