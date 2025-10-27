import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getAllProducts from "@/libs/getAllProducts";
import { notFound } from "next/navigation";

const products = getAllProducts();
const ProductDetails = ({ params }) => {
  const { id } = params;
  const isExistProducts = products?.find(({ id: id1 }) => id1 === parseInt(id));
  if (!isExistProducts) {
    notFound();
  }
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ProductDetailsMain type={1} />
    </PageWrapper>
  );
};
export async function generateStaticParams() {
  return products?.map(({ id }) => ({ id: id.toString() }));
}

export default ProductDetails;
