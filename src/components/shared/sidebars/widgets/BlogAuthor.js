"use client";
import Image from "next/image";
import Link from "next/link";
import { useCommonContext } from "@/providers/CommonContext";

const BlogAuthor = () => {
  const { author } = useCommonContext();
  const { name, image, desig } = author ? author : {};

  return (
    <div className="widget ltn__author-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">About Me</h4>
      <div className="ltn__author-widget-inner text-center">
        <Image
          src={image ? image : "/img/team/4.jpg"}
          alt="Image"
          width={400}
          height={400}
        />
        <h5>{name ? name : "Rosalina D. Willaimson"}</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          distinctio, odio, eligendi suscipit reprehenderit atque.
        </p>
        <div className="ltn__social-media">
          <ul>
            <li>
              <Link href="https://www.facebook.com" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link href="https://x.com" title="Twitter">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com" title="Linkedin">
                <i className="fab fa-linkedin"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.behance.com" title="Behance">
                <i className="fab fa-behance"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com" title="Youtube">
                <i className="fab fa-youtube"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogAuthor;
