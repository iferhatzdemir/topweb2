import Link from "next/link";
import React from "react";

const SidebarSocials = () => {
  return (
    <div className="widget ltn__social-media-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Never Miss News
      </h4>
      <div className="ltn__social-media-2">
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
            <Link href="https://www.instagram.com/" title="Instagram">
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
          <li>
            <Link href="https://www.behance.com" title="Behance">
              <i className="fab fa-behance"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarSocials;
