import getAllProducts from "@/libs/getAllProducts";
import TopRatedProductCard from "../../cards/TopRatedProductCard";

const SidebarTopRatedProducs = () => {
  const products = getAllProducts()
    ?.filter(({ topRated }) => topRated)
    ?.slice(0, 3);
  return (
    <div className="widget ltn__top-rated-product-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Top Rated Product
      </h4>
      <ul>
        {products?.map((product, idx) => (
          <li key={idx}>
            <TopRatedProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarTopRatedProducs;
