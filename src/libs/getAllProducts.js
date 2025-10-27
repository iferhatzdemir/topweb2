import allProducts from "@/../public/fakedata/products.json";
import comments from "@/../public/fakedata/productComments.json";
import reviews from "@/../public/fakedata/productReviews.json";
const productImage1 = "/img/product/1.png";
const productImage2 = "/img/product/2.png";
const productImage3 = "/img/product/3.png";
const productImage4 = "/img/product/4.png";
const productImage5 = "/img/product/5.png";
const productImage6 = "/img/product/6.png";
const productImage7 = "/img/product/7.png";
const productImage8 = "/img/product/8.png";
const productImage9 = "/img/product/9.png";
const productImage10 = "/img/product/10.png";
const productImage11 = "/img/product/11.png";
const productImage12 = "/img/product/12.png";

const getAllProducts = () => {
  const images = [
    productImage1,
    productImage2,
    productImage3,
    productImage4,
    productImage5,
    productImage6,
    productImage7,
    productImage8,
    productImage9,
    productImage10,
    productImage11,
    productImage12,
    productImage6,
    productImage5,
    productImage4,
    productImage3,
    productImage2,
    productImage1,
    productImage12,
    productImage11,
    productImage10,
    productImage9,
    productImage8,
    productImage7,
    productImage6,
    productImage3,
    productImage5,
    productImage7,
    productImage9,
    productImage11,
    productImage2,
    productImage4,
    productImage6,
    productImage8,
    productImage10,
    productImage12,
    productImage1,
    productImage4,
    productImage7,
    productImage10,
    productImage2,
    productImage5,
    productImage8,
    productImage11,
    productImage3,
    productImage6,
    productImage9,
    productImage12,
    productImage4,
    productImage7,
    productImage10,
    productImage5,
    productImage8,
    productImage11,
    productImage6,
    productImage9,
    productImage12,
    productImage7,
    productImage10,
    productImage4,
   
  ];

  const products = [...allProducts]?.map((product, idx) => ({
    ...product,

    image: images[idx],
    comments: comments?.filter(({ productId }) => productId === product?.id),
    reviews: reviews?.filter(({ productId }) => productId === product?.id),
  }));

  return products;
};

export default getAllProducts;
