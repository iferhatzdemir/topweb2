import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import ProductDetailPageContent from "@/components/cms/ProductDetailPageContent";
import { getProductById, listProducts } from "@/lib/cms/queries";
import { notFound } from "next/navigation";

export const revalidate = 300;

const ProductDetails = async ({ params }) => {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ProductDetailPageContent productId={id} initialData={product} />
    </PageWrapper>
  );
};

export async function generateStaticParams() {
  const products = await listProducts({ take: 50 });
  return products
    .filter((product) => Boolean(product.id))
    .map((product) => ({ id: product.id }));
}

export default ProductDetails;
