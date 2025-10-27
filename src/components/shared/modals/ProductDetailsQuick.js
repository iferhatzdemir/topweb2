import Image from "next/image";
import ProductDetailsRight from "../products/ProductDetailsRight";

const ProductDetailsQuick = ({ product }) => {
  const { image } = product;

  return (
    <div className="ltn__modal-area ltn__quick-view-modal-area">
      <div className="modal fade" id="quick_view_modal" tabIndex="-1">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
                {/* <!-- <i className="fas fa-times"></i> --> */}
              </button>
            </div>
            <div className="modal-body">
              <div className="ltn__quick-view-modal-inner">
                <div className="modal-product-item">
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <div className="modal-product-img">
                        <Image src={image} alt="#" width={1000} height={1000} />
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <ProductDetailsRight product={product} />
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

export default ProductDetailsQuick;
