import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { redirect } from "next/navigation";
import { listCategories } from "@/lib/cms/queries";
import CategoryPageContent from "@/components/cms/CategoryPageContent";

export const revalidate = 300;

const Shop = async () => {
  const categories = await listCategories();
  const firstCategory = categories[0];

  if (firstCategory?.slug) {
    redirect(`/categories/${firstCategory.slug}`);
  }

  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <CategoryPageContent slug={null} initialData={null} />
    </PageWrapper>
  );
};

export default Shop;
