"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useWishlistContext } from "@/providers/WshlistContext";
import controlModal from "@/libs/controlModal";
const WishlistStatusModal = ({ product }) => {
  const { id, title, image } = product;
  const { wishlistStatus } = useWishlistContext();

  return (
    <div className="ltn__modal-area ltn__add-to-cart-modal-area">
      <div className="modal fade" id="liton_wishlist_modal" tabIndex="-1">
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="ltn__quick-view-modal-inner">
                <div className="modal-product-item">
                  <div className="row">
                    <div className="col-12">
                      <div className="modal-product-img">
                        <Image src={image} alt="#" width={1000} height={1000} />
                      </div>
                      <div className="modal-product-info">
                        <h5>
                          <Link
                            onClick={() => controlModal()}
                            href={`/products/${id}`}
                          >
                            {title}
                          </Link>
                        </h5>
                        <p className="added-cart">
                          <i
                            className={`${
                              wishlistStatus === "exist"
                                ? "icon-cancel"
                                : "fa fa-check-circle"
                            }`}
                          ></i>{" "}
                          {wishlistStatus === "exist"
                            ? `Already exist`
                            : `Successfully ${
                                wishlistStatus ? wishlistStatus : "added"
                              }`}{" "}
                          {wishlistStatus === "exist"
                            ? "in"
                            : wishlistStatus === "deleted"
                            ? "from"
                            : "to"}{" "}
                          your Wishlist
                        </p>
                        <div className="btn-wrapper">
                          <Link
                            onClick={() => controlModal()}
                            href="/wishlist"
                            className="theme-btn-1 btn btn-effect-1"
                          >
                            View Wishlist
                          </Link>
                        </div>
                      </div>
                      {/* <!-- additional-info --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistStatusModal;
