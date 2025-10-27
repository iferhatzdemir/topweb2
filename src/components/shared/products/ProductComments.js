import modifyNumber from "@/libs/modifyNumber";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductComments = ({ comments, commentsLength }) => {
  return (
    <div className="ltn__shop-details-tab-content-inner">
      {/* <!-- comment-area --> */}
      <div className="ltn__comment-area mb-30">
        <h4 className="title-2">Comments ({modifyNumber(commentsLength)})</h4>
        <div className="ltn__comment-inner">
          <ul>
            {comments?.map(({ author, publishDate, desc, replies }, idx) => (
              <li key={idx}>
                <div className="ltn__comment-item clearfix">
                  <div className="ltn__commenter-img">
                    <Image
                      src={author?.image}
                      alt="Image"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="ltn__commenter-comment">
                    <h6>
                      <Link href="#">{author?.name}</Link>
                    </h6>
                    <span className="comment-date">{publishDate}</span>
                    <p>{desc}</p>
                    <Link
                      href="#write-comment"
                      className="ltn__comment-reply-btn"
                    >
                      <i className="fas fa-reply"></i>Reply
                    </Link>
                  </div>
                </div>
                {replies?.length ? (
                  <ul>
                    {replies?.map(({ author, publishDate, desc }, idx2) => (
                      <li key={idx2 + 10000}>
                        <div className="ltn__comment-item clearfix">
                          <div className="ltn__commenter-img">
                            <Image
                              src={author?.image}
                              alt="Image"
                              width={500}
                              height={500}
                            />
                          </div>
                          <div className="ltn__commenter-comment">
                            <h6>
                              <Link href="#">{author?.name}</Link>
                            </h6>
                            <span className="comment-date">{publishDate}</span>
                            <p>{desc}</p>
                            <Link
                              href="#write-comment"
                              className="ltn__comment-reply-btn"
                            >
                              <i className="fas fa-reply"></i>Reply
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <!-- comment-reply --> */}
      <div
        className="ltn__comment-reply-area ltn__form-box mb-60"
        id="write-comment"
      >
        <form action="#">
          <h4 className="title-2">Leave a Reply</h4>
          <div className="input-item input-item-textarea ltn__custom-icon">
            <textarea placeholder="Type your comments...."></textarea>
          </div>
          <div className="input-item input-item-name ltn__custom-icon">
            <input type="text" placeholder="Type your name...." />
          </div>
          <div className="input-item input-item-email ltn__custom-icon">
            <input type="email" placeholder="Type your email...." />
          </div>
          <div className="input-item input-item-website ltn__custom-icon">
            <input
              type="text"
              name="website"
              placeholder="Type your website...."
            />
          </div>
          <label className="mb-0">
            <input type="checkbox" name="agree" /> Save my name, email, and
            website in this browser for the next time I comment.
          </label>
          <div className="btn-wrapper">
            <button
              className="btn theme-btn-1 btn-effect-1 text-uppercase"
              type="submit"
            >
              <i className="far fa-comments"></i> Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductComments;
