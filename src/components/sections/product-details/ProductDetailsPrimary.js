"use client";
import getAllProducts from "@/libs/getAllProducts";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import SidebarTopRatedProducs from "@/components/shared/sidebars/widgets/SidebarTopRatedProducs";
import SidebarBanner from "@/components/shared/sidebars/widgets/SidebarBanner";
import { useProductContext } from "@/providers/ProductContext";
import ProductDetailsRight from "@/components/shared/products/ProductDetailsRight";
import { useCommonContext } from "@/providers/CommonContext";
import ProductDetailsTab from "@/components/shared/products/ProductDetailsTab";
import ProductDetailsTab2 from "@/components/shared/products/ProductDetailsTab2";
const ProductDetailsPrimary = () => {
  // hooks
  const { isNotSidebar, type } = useCommonContext();
  const { setCurrentProduct } = useProductContext();
  // products and filter current product
  const { id: currentId } = useParams();
  const products = getAllProducts();
  const product = products?.find(
    ({ id }) => id === (!currentId ? 1 : parseInt(currentId))
  );
  // current product

  const { type: currentType } = product;
  // other slider images
  const ohterImages = products?.filter(
    ({ id, type }) =>
      id !== parseInt(currentId) && (!currentId ? id !== 1 : true)
  );
  const allImages = [product, ...ohterImages?.slice(0, 6)];

  return (
    <div
      className={`ltn__shop-details-area  ${
        type === 1 || type === 2 ? "pb-85" : "pb-120"
      }`}
      onMouseEnter={() => setCurrentProduct(product)}
    >
      <div className="container">
        <div className="row">
          <div className={` ${isNotSidebar ? "" : "col-lg-8"} col-md-12`}>
            <div
              className={`ltn__shop-details-inner ${
                type === 1 || type === 2 ? "mb-60" : ""
              }`}
            >
              <div className="row">
                <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                  <div className="ltn__shop-details-img-gallery">
                    <div className="ltn__shop-details-large-img">
                      {allImages?.map(({ image }, idx) => (
                        <div key={idx} className="single-large-img">
                          <Link href={image} data-rel="lightcase:myCollection">
                            <Image
                              src={image}
                              alt="Image"
                              width={1000}
                              height={1000}
                            />
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className="ltn__shop-details-small-img slick-arrow-2">
                      {allImages?.map(({ image }, idx) => (
                        <div key={idx} className="single-small-img">
                          <Image
                            src={image}
                            alt="Image"
                            width={1000}
                            height={1000}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                  {/*  */}
                  <ProductDetailsRight product={product} />
                </div>
              </div>
            </div>
            {/* <!-- Shop Tab Start --> */}
            {type === 1 || type === 2 ? (
              <ProductDetailsTab product={product} />
            ) : (
              ""
            )}
            {/* <!-- Shop Tab End --> */}
          </div>
          {isNotSidebar ? (
            ""
          ) : (
            <div className="col-lg-4">
              <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
                {/* <!-- Top Rated Product Widget --> */}
                <SidebarTopRatedProducs />

                {/* <!-- Banner Widget --> */}
                <SidebarBanner
                  image={"/img/banner/2.jpg"}
                  imgWidth={740}
                  imgHeight={440}
                />
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPrimary;
