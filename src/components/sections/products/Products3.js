"use client";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import getAllProducts from "@/libs/getAllProducts";
import makePath from "@/libs/makePath";
import Link from "next/link";

const Products3 = ({
  title,
  desc,
  isSmallTitle,
  subtitle,
  pt,
  type,
  isDouble,
}) => {
  const drinksProducts = getAllProducts()?.filter(
    ({ collection }) => makePath(collection) === makePath("Food & Drinks")
  );

  const drinksProducts1 = drinksProducts?.slice(0, 6);
  const drinksProducts2 = drinksProducts?.slice(6, 12);
  const vegetablesProducts = getAllProducts()?.filter(
    ({ collection }) => makePath(collection) === makePath("Vegetables")
  );

  const vegetablesProducts1 = vegetablesProducts?.slice(0, 6);
  const vegetablesProducts2 = vegetablesProducts?.slice(6, 12);
  const driedProducts = getAllProducts()?.filter(
    ({ collection }) => makePath(collection) === makePath("Dried Foods")
  );

  const driedProducts1 = driedProducts?.slice(0, 6);
  const driedProducts2 = driedProducts?.slice(6, 12);
  const breadProducts = getAllProducts()?.filter(
    ({ collection }) => makePath(collection) === makePath("Bread & Cake")
  );

  const breadProducts1 = breadProducts?.slice(0, 6);
  const breadProducts2 = breadProducts?.slice(6, 12);
  const fishProducts = getAllProducts()?.filter(
    ({ collection }) => makePath(collection) === makePath("Fish & Meat")
  );
  const fishProducts1 = fishProducts?.slice(0, 6);
  const fishProducts2 = fishProducts?.slice(6, 12);

  return (
    <section>
      <div
        className={`ltn__product-tab-area ltn__product-gutter  pb-70 ${
          pt ? pt : "pt-115"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className={`section-title-area  ${
                  type === 2
                    ? ""
                    : isSmallTitle
                    ? "text-center"
                    : "ltn__section-title-2 text-center"
                }`}
              >
                <h1 className="section-title">
                  {title ? title : "Our Products"}
                </h1>
                {desc ? (
                  <p>
                    A highly efficient slip-ring scanner for {"today's"}{" "}
                    diagnostic requirements.
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div
                className={`ltn__tab-menu ltn__tab-menu-2 ${
                  type === 2 ? "ltn__tab-menu-top-right" : ""
                }  text-uppercase text-center`}
              >
                <div className="nav">
                  <Link
                    className="active show"
                    data-bs-toggle="tab"
                    href="#liton_tab_3_1"
                  >
                    Food & Drinks
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_2" className="">
                    Vegetables
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_3" className="">
                    Dried Foods
                  </Link>
                  {type === 2 ? (
                    ""
                  ) : (
                    <Link
                      data-bs-toggle="tab"
                      href="#liton_tab_3_4"
                      className=""
                    >
                      Bread & Cake
                    </Link>
                  )}
                  <Link data-bs-toggle="tab" href="#liton_tab_3_5" className="">
                    Fish & Meat
                  </Link>
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade active show" id="liton_tab_3_1">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {/* <!-- ltn__product-item --> */}
                      {drinksProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product} />
                          {isDouble ? (
                            <ProductCardPrimary
                              product={drinksProducts2[idx]}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="liton_tab_3_2">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {/* <!-- ltn__product-item --> */}
                      {vegetablesProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product} />
                          {isDouble ? (
                            <ProductCardPrimary
                              product={vegetablesProducts2[idx]}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                      {/* <!--  --> */}
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="liton_tab_3_3">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {/* <!-- ltn__product-item --> */}
                      {driedProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product} />
                          {isDouble ? (
                            <ProductCardPrimary product={driedProducts2[idx]} />
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {type === 2 ? (
                  ""
                ) : (
                  <div className="tab-pane fade" id="liton_tab_3_4">
                    <div className="ltn__product-tab-content-inner">
                      <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                        {/* <!-- ltn__product-item --> */}
                        {breadProducts1?.map((product, idx) => (
                          <div className="col-lg-12" key={idx}>
                            <ProductCardPrimary product={product} />
                            {isDouble ? (
                              <ProductCardPrimary
                                product={breadProducts2[idx]}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className="tab-pane fade" id="liton_tab_3_5">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {/* <!-- ltn__product-item --> */}
                      {fishProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product} />
                          {isDouble ? (
                            <ProductCardPrimary product={fishProducts2[idx]} />
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products3;
