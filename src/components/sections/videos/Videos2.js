import Link from "next/link";

const Videos2 = () => {
  return (
    <div className="ltn__video-popup-area ltn__video-popup-margin-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div
              className="ltn__video-bg-img ltn__video-popup-height-600 bg-image"
              data-bs-bg="/img/bg/16.jpg"
            >
              <Link
                className="ltn__video-icon-2"
                href="https://www.youtube.com/embed/X7R-q9rsrtU?autoplay=1&showinfo=0"
                data-rel="lightcase:myCollection"
              >
                <i className="fa fa-play"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos2;
