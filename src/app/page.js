import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import HomeCmsContent from "@/components/cms/HomeCmsContent";
import { getHomePage } from "@/lib/cms/queries";

export const revalidate = 300;

export default async function Home() {
  const homePage = await getHomePage();
  return (
    <PageWrapper isNavbarAppointmentBtn={true}>
      <HomeCmsContent initialPage={homePage} />
    </PageWrapper>
  );
}
