import countCommentLength from "@/libs/countCommentLength";
import makePath from "@/libs/makePath";
import modifyNumber from "@/libs/modifyNumber";
import setBgImage from "@/libs/setBgImage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const BlogCardPrimaryLarge = ({ blog }) => {
  const blogItemRef = useRef(null);
  const {
    title,
    imageLarge,
    videoUrl,
    audioUrl,
    desc,
    id,
    publishDate,
    author,
    category,
    views,
    comments,
    type,
  } = blog;
  const isSlider = Array.isArray(imageLarge);
  useEffect(() => {
    if (type !== 2 || type !== 3) {
      blogItemRef.current.style.backgroundImage = "";
    }
    if (window.$) {
      setBgImage();
    }
  }, [type]);
  const totalComments = modifyNumber(countCommentLength(comments));
  return (
    <div
      ref={blogItemRef}
      className={`ltn__blog-item ltn__blog-item-5  ${
        type === 2
          ? "ltn__blog-item-quote bg-image bg-overlay-theme-90"
          : type === 3
          ? "ltn__blog-item-bg-image bg-image bg-overlay-white-90"
          : videoUrl
          ? "ltn__blog-item-video"
          : audioUrl
          ? "ltn__blog-item-audio"
          : isSlider
          ? "ltn__blog-item-gallery"
          : imageLarge
          ? ""
          : "ltn__blog-item-no-image"
      }`}
      data-bs-bg={type === 2 || type === 3 ? imageLarge : ""}
    >
      {/* blog thumb */}
      {type === 2 || type === 3 ? (
        ""
      ) : isSlider ? (
        <div className="ltn__blog-gallery-active slick-arrow-1 slick-arrow-1-inner">
          {imageLarge?.map((imageUrl, idx) => (
            <div key={idx + 10000} className="ltn__blog-gallery-item">
              <Link href={`/blogs/${id}`}>
                <Image src={imageUrl} alt="Image" width={2000} height={1000} />
              </Link>
            </div>
          ))}
        </div>
      ) : videoUrl ? (
        <div className="ltn__video-img">
          {imageLarge ? (
            <Image
              src={imageLarge}
              alt="video popup bg image"
              width={2000} height={1000}
            />
          ) : (
            ""
          )}
          <Link
            className="ltn__video-icon-2 ltn__secondary-bg "
            href={videoUrl}
            data-rel="lightcase:myCollection"
          >
            <i className="fa fa-play"></i>
          </Link>
        </div>
      ) : audioUrl ? (
        <div className="post-audio embed-responsive embed-responsive-16by9">
          <iframe src={audioUrl}></iframe>
        </div>
      ) : imageLarge ? (
        <div className="ltn__blog-img">
          <Link href={`/blogs/${id}`}>
            <Image src={imageLarge} alt="Image" width={2000} height={1000} />
          </Link>
        </div>
      ) : (
        ""
      )}
      {/* blog body */}
      <div className="ltn__blog-brief">
        {/* blog title, category, quote */}
        {type === 2 ? (
          <blockquote>
            <Link href={`/blogs/${id}`}>{title}</Link>
          </blockquote>
        ) : (
          <>
            <div className="ltn__blog-meta">
              <ul>
                <li className="ltn__blog-category">
                  <Link href={`/blogs?category=${makePath(category)}`}>
                    {category}
                  </Link>
                </li>
              </ul>
            </div>
            <h3 className="ltn__blog-title">
              <Link href={`/blogs/${id}`}>{title}</Link>
            </h3>
          </>
        )}
        {/* comments, views */}
        <div
          className={`ltn__blog-meta ${type === 2 || type === 3 ? "mb-0" : ""}`}
        >
          <ul>
            <li>
              <Link href={`/blogs/${id}`}>
                <i className="far fa-eye"></i>
                {views} Views
              </Link>
            </li>
            <li>
              <Link href={`/blogs/${id}#comments`}>
                <i className="far fa-comments"></i>
                {totalComments ? totalComments : 0} Comments
              </Link>
            </li>
            <li className="ltn__blog-date">
              <i className="far fa-calendar-alt"> </i>
              {publishDate}
            </li>
          </ul>
        </div>
        {/* desc, author details */}
        {type === 2 || type === 3 ? (
          ""
        ) : (
          <>
            {" "}
            <p>{desc}</p>
            <div className="ltn__blog-meta-btn">
              <div className="ltn__blog-meta">
                <ul>
                  <li className="ltn__blog-author">
                    <Link href={`/blogs?author=${makePath(author?.name)}`}>
                      <Image src={author.image} alt="#" width={2000} height={1000}/>
                      By: {author?.name}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="ltn__blog-btn">
                <Link href={`/blogs/${id}`}>
                  <i className="fas fa-arrow-right"></i>Read more
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogCardPrimaryLarge;
