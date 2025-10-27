import ServiceDetailsMain from "@/components/layout/main/ServiceDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getAllServices from "@/libs/getAllServices";
import { notFound } from "next/navigation";
const services = getAllServices();
const ServiceDetails = ({ params }) => {
  const { id } = params;
  const isExistServices = services?.find(({ id: id1 }) => id1 === parseInt(id));
  if (!isExistServices) {
    notFound();
  }
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ServiceDetailsMain />
    </PageWrapper>
  );
};
export async function generateStaticParams() {
  return services?.map(({ id }) => ({ id: id.toString() }));
}

export default ServiceDetails;
