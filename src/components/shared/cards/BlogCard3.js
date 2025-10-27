import makePath from "@/libs/makePath";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard3 = ({ blog }) => {
  const { title, image, id, publishDate, author, category } = blog;
  return (
    <div className="ltn__blog-item ltn__blog-item-3">
      <div className="ltn__blog-img">
        <Link href={`/blogs/${id}`}>
          <Image src={image} alt="#" width={2000} height={1000} />
        </Link>
      </div>
      <div className="ltn__blog-brief">
        <div className="ltn__blog-meta">
          <ul>
            <li className="ltn__blog-author">
              <Link href={`/blogs?author_role=${makePath(author.desig)}`}>
                <i className="far fa-user"></i>by: {author.desig}
              </Link>
            </li>
            <li className="ltn__blog-tags">
              <Link href={`/blogs?category=${makePath(category)}`}>
                <i className="fas fa-tags"></i>
                {category}
              </Link>
            </li>
          </ul>
        </div>
        <h3 className="ltn__blog-title">
          <Link href={`/blogs/${id}`}>{sliceText(title, 40)}</Link>
        </h3>
        <div className="ltn__blog-meta-btn">
          <div className="ltn__blog-meta">
            <ul>
              <li className="ltn__blog-date">
                <i className="far fa-calendar-alt"></i>
                {publishDate}
              </li>
            </ul>
          </div>
          <div className="ltn__blog-btn">
            <Link href={`/blogs/${id}`}>Read more</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard3;
