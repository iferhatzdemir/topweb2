import modifyNumber from "@/libs/modifyNumber";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductDetailsReviews = ({ reviews, reviewsLength }) => {
  return (
    <div className="ltn__shop-details-tab-content-inner">
      <h4 className="title-2">Customer Reviews</h4>
      <div className="product-ratting">
        <ul>
          <li>
            <Link href="#">
              <i className="fas fa-star"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="#">
              <i className="fas fa-star"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="#">
              <i className="fas fa-star"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="#">
              <i className="fas fa-star-half-alt"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="#">
              <i className="far fa-star"></i>
            </Link>
          </li>{" "}
          <li className="review-total">
            <Link href="#"> ( {modifyNumber(reviewsLength)} Reviews )</Link>
          </li>
        </ul>
      </div>
      <hr />
      {/* <!-- comment-area --> */}
      <div className="ltn__comment-area mb-30">
        <div className="ltn__comment-inner">
          <ul>
            {reviewsLength
              ? reviews?.map(({ author, desc, publishDate, replies }, idx) => (
                  <li key={idx}>
                    <div className="ltn__comment-item clearfix">
                      <div className="ltn__commenter-img">
                        <Image
                          src={author.image}
                          alt="Image"
                          width={1000}
                          height={100}
                        />
                      </div>
                      <div className="ltn__commenter-comment">
                        <h6>
                          <Link href="#">{author.name}</Link>
                        </h6>
                        <div className="product-ratting">
                          <ul>
                            <li>
                              <Link href="#">
                                <i className="fas fa-star"></i>
                              </Link>
                            </li>{" "}
                            <li>
                              <Link href="#">
                                <i className="fas fa-star"></i>
                              </Link>
                            </li>{" "}
                            <li>
                              <Link href="#">
                                <i className="fas fa-star"></i>
                              </Link>
                            </li>{" "}
                            <li>
                              <Link href="#">
                                <i className="fas fa-star-half-alt"></i>
                              </Link>
                            </li>{" "}
                            <li>
                              <Link href="#">
                                <i className="far fa-star"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <p>{desc}</p>
                        <span className="ltn__comment-reply-btn">
                          {publishDate}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
      {/* <!-- comment-reply --> */}
      <div className="ltn__comment-reply-area ltn__form-box mb-30">
        <form action="#">
          <h4 className="title-2">Add a Review</h4>
          <div className="mb-30">
            <div className="add-a-review">
              <h6>Your Ratings:</h6>
              <div className="product-ratting">
                <ul>
                  <li>
                    <Link href="#">
                      <i className="fas fa-star"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href="#">
                      <i className="fas fa-star"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href="#">
                      <i className="fas fa-star"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href="#">
                      <i className="fas fa-star-half-alt"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href="#">
                      <i className="far fa-star"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="input-item input-item-textarea ltn__custom-icon">
            <textarea placeholder="Type your reviews...."></textarea>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailsReviews;
