import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import StaticPageContent from "@/components/cms/StaticPageContent";
import { getStaticPage } from "@/lib/cms/queries";

export const revalidate = 300;

const About = async () => {
  const page = await getStaticPage("hakkimizda");
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <StaticPageContent slug="hakkimizda" initialPage={page} />
    </PageWrapper>
  );
};

export default About;
