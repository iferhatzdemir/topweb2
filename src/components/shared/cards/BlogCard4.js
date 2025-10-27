import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard4 = ({ blog }) => {
  const { title, image, id, publishDate, author, category } = blog;
  return (
    <div className="ltn__blog-item ltn__blog-item-6">
      <div className="ltn__blog-img">
        <Link href={`/blogs/${id}`}>
          <Image src={image} alt="Image" width={2000} height={1000} />
        </Link>
      </div>
      <div className="ltn__blog-brief">
        <div className="ltn__blog-meta">
          <ul>
            <li className="ltn__blog-date ltn__secondary-color">
              <i className="far fa-calendar-alt"></i>
              {publishDate}
            </li>
          </ul>
        </div>
        <h3 className="ltn__blog-title">
          <Link href={`/blogs/${id}`}>{sliceText(title, 40)}</Link>
        </h3>
        <p>{sliceText(desc, 75)}</p>
      </div>
    </div>
  );
};

export default BlogCard4;
