"use client";

import CartProduct from "@/components/shared/cart/CartProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import { useWishlistContext } from "@/providers/WshlistContext";
import { useEffect, useState } from "react";

const WishlistPrimary = () => {
  const { wishlistProducts } = useWishlistContext();
  const [isClient, setIsClient] = useState(false);
  const iswishlistProducts = wishlistProducts?.length ? true : false;
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="liton__wishlist-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping-cart-inner">
              <div className="shoping-cart-table table-responsive">
                {isClient ? (
                  <table className="table">
                    <tbody>
                      {!iswishlistProducts ? (
                        <tr>
                          <td>
                            <Nodata text={"Empty Wishlist!"} />
                          </td>
                        </tr>
                      ) : (
                        wishlistProducts?.map((product, idx) => (
                          <CartProduct
                            key={idx}
                            product={product}
                            isWishlist={true}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPrimary;
