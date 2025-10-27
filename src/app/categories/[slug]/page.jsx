import CategoryPageContent from "@/components/cms/CategoryPageContent";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { getCategoryWithProducts, listCategories } from "@/lib/cms/queries";
import { notFound } from "next/navigation";

export const revalidate = 300;

const CategoryPage = async ({ params }) => {
  const { slug } = params;
  const categoryData = await getCategoryWithProducts(slug);

  if (!categoryData) {
    notFound();
  }

  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <CategoryPageContent slug={slug} initialData={categoryData} />
    </PageWrapper>
  );
};

export default CategoryPage;

export const generateStaticParams = async () => {
  const categories = await listCategories();
  return categories
    .filter((category) => Boolean(category.slug))
    .map((category) => ({ slug: category.slug }));
};
