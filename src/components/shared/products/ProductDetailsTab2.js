import Link from "next/link";
import TabDescription from "./TabDescription";
import ProductDetailsReviews from "./ProductDetailsReviews";
import countCommentLength from "@/libs/countCommentLength";
import ProductComments from "./ProductComments";

const ProductDetailsTab2 = ({ product }) => {
  const { reviews, comments } = product ? product : {};

  // variables
  const reviewsLength = countCommentLength(reviews);
  const commentsLength = countCommentLength(comments);
  return (
    <div className="ltn__shop-details-tab-area pb-115">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__shop-details-tab-inner">
              <div className="ltn__shop-details-tab-menu">
                <div className="nav">
                  <Link
                    className="active show"
                    data-bs-toggle="tab"
                    href="#liton_tab_details_1_1"
                  >
                    Description
                  </Link>{" "}
                  <Link
                    data-bs-toggle="tab"
                    href="#liton_tab_details_1_2"
                    className=""
                  >
                    Reviews
                  </Link>{" "}
                  <Link
                    data-bs-toggle="tab"
                    href="#liton_tab_details_1_3"
                    className=""
                  >
                    Comments
                  </Link>{" "}
                  <Link
                    data-bs-toggle="tab"
                    href="#liton_tab_details_1_4"
                    className=""
                  >
                    Shipping Policy
                  </Link>{" "}
                  <Link
                    data-bs-toggle="tab"
                    href="#liton_tab_details_1_5"
                    className=""
                  >
                    Size Chart
                  </Link>
                </div>
              </div>
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="liton_tab_details_1_1"
                >
                  <TabDescription />
                </div>
                <div className="tab-pane fade" id="liton_tab_details_1_2">
                  <ProductDetailsReviews
                    reviews={reviews}
                    reviewsLength={reviewsLength}
                  />
                </div>
                <div className="tab-pane fade" id="liton_tab_details_1_3">
                  <ProductComments
                    comments={comments}
                    commentsLength={commentsLength}
                  />
                </div>
                <div className="tab-pane fade" id="liton_tab_details_1_4">
                  <div className="ltn__shop-details-tab-content-inner">
                    <h4 className="title-2">Shipping policy for our store</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nam voluptates rerum neque ea libero numquam officiis
                      ipsum, consectetur ducimus dicta in earum repellat sunt ab
                      odit laboriosam cupiditate ipsam, doloremque.
                    </p>
                    <ul>
                      <li>1-2 business days (Typically by end of day)</li>
                      <li>
                        <Link href="#">30 days money back guaranty</Link>
                      </li>
                      <li>24/7 live support</li>
                      <li>odio dignissim qui blandit praesent</li>
                      <li>luptatum zzril delenit augue duis dolore</li>
                      <li>te feugait nulla facilisi.</li>
                    </ul>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Omnis, quia vel eligendi ipsam. Ea, quasi quam ducimus
                      recusandae unde ipsa nam rem a minus tenetur quae sint
                      voluptatem voluptate inventore.
                    </p>
                  </div>
                </div>
                <div className="tab-pane fade" id="liton_tab_details_1_5">
                  <div className="ltn__shop-details-tab-content-inner">
                    <div className="table-1 mb-20">
                      <table className="">
                        <tbody>
                          <tr>
                            <th>SIZE</th>
                            <th>XS</th>
                            <th>S</th>
                            <th>S/M</th>
                            <th>M</th>
                            <th>M/L</th>
                            <th>L</th>
                            <th>XL</th>
                          </tr>
                          <tr data-region="uk">
                            <th>UK</th>
                            <td>4</td>
                            <td>6 - 8</td>
                            <td>6 - 10</td>
                            <td>10 - 12</td>
                            <td>12 - 16</td>
                            <td>14 - 16</td>
                            <td>18</td>
                          </tr>
                          <tr data-region="eur">
                            <th>
                              <span className="mobile-show">EUR</span>
                              <span className="mobile-none">EUROPE</span>
                            </th>
                            <td>32</td>
                            <td>34 - 36</td>
                            <td>34 - 38</td>
                            <td>38 - 40</td>
                            <td>40 - 44</td>
                            <td>42 - 44</td>
                            <td>46</td>
                          </tr>
                          <tr data-region="usa">
                            <th>
                              <span>USA/</span>
                              <span className="mobile-none">CANADA</span>
                              <span className="mobile-show"> CA</span>
                            </th>
                            <td>0</td>
                            <td>2 - 4</td>
                            <td>2 - 6</td>
                            <td>6 - 8</td>
                            <td>8 - 12</td>
                            <td>10 - 12</td>
                            <td>14</td>
                          </tr>
                          <tr data-region="aus">
                            <th>AUS / NZ</th>
                            <td>4</td>
                            <td>6 - 8</td>
                            <td>6 - 10</td>
                            <td>10 - 12</td>
                            <td>12 - 16</td>
                            <td>14 - 16</td>
                            <td>18</td>
                          </tr>
                        </tbody>
                      </table>
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

export default ProductDetailsTab2;
