import getAllBlogs from "@/libs/getAllBlogs";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PopularBlog = () => {
  const popularBlogs = getAllBlogs()
    ?.sort((a, b) => b?.views - a.views)
    ?.slice(0, 4);
  return (
    <div className="widget ltn__popular-post-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Popular Feeds
      </h4>
      <ul>
        {popularBlogs?.map(({ id, title, author, publishDate }, idx) => (
          <li key={idx}>
            <div className="popular-post-widget-item clearfix">
              <div className="popular-post-widget-img">
                <Link href={`/blogs/${id}`}>
                  <Image src={author?.image} alt="#" width={2000} height={2000}/>
                </Link>
              </div>
              <div className="popular-post-widget-brief">
                <h6>
                  <Link href={`/blogs/${id}`}>{sliceText(title)}</Link>
                </h6>
                <div className="ltn__blog-meta">
                  <ul>
                    <li className="ltn__blog-date">
                      <Link href={`/blogs/${id}`}>
                        <i className="far fa-calendar-alt"></i>
                        {publishDate}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlog;
