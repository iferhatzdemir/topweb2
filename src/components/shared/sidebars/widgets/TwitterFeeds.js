import Link from "next/link";
import React from "react";

const TwitterFeeds = () => {
  return (
    <div className="widget ltn__popular-post-widget ltn__twitter-post-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Twitter Feeds
      </h4>
      <ul>
        <li>
          <div className="popular-post-widget-item clearfix">
            <div className="popular-post-widget-img">
              <Link href="/blogs/1">
                <i className="fab fa-twitter"></i>
              </Link>
            </div>
            <div className="popular-post-widget-brief">
              <p>
                Carsafe - #Gutenberg ready @wordpress Theme for Car Service,
                Auto Parts, Car Dealer available on @website
                <Link href="https://website.net">https://website.net</Link>
              </p>
              <div className="ltn__blog-meta">
                <ul>
                  <li className="ltn__blog-date">
                    <Link href="/blogs/1">
                      <i className="far fa-calendar-alt"></i>June 22, 2020
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="popular-post-widget-item clearfix">
            <div className="popular-post-widget-img">
              <Link href="/blogs/2">
                <i className="fab fa-twitter"></i>
              </Link>
            </div>
            <div className="popular-post-widget-brief">
              <p>
                Carsafe - #Gutenberg ready @wordpress Theme for Car Service,
                Auto Parts, Car Dealer available on @website
                <Link href="https://website.net">https://website.net</Link>
              </p>
              <div className="ltn__blog-meta">
                <ul>
                  <li className="ltn__blog-date">
                    <Link href="/blogs/2">
                      <i className="far fa-calendar-alt"></i>June 22, 2020
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="popular-post-widget-item clearfix">
            <div className="popular-post-widget-img">
              <Link href="/blogs/3">
                <i className="fab fa-twitter"></i>
              </Link>
            </div>
            <div className="popular-post-widget-brief">
              <p>
                Carsafe - #Gutenberg ready @wordpress Theme for Car Service,
                Auto Parts, Car Dealer available on @website
                <Link href="https://website.net">https://website.net</Link>
              </p>
              <div className="ltn__blog-meta">
                <ul>
                  <li className="ltn__blog-date">
                    <Link href="/blogs/3">
                      <i className="far fa-calendar-alt"></i>June 22, 2020
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TwitterFeeds;
