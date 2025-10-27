import PortfolioDetailsMain from "@/components/layout/main/PortfolioDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getAllPortfolios from "@/libs/getAllPortfolios";
import { notFound } from "next/navigation";

const portfolios = getAllPortfolios();
const PortfolioDetails = ({ params }) => {
  const { id } = params;
  const isExistPortfolios = portfolios?.find(
    ({ id: id1 }) => id1 === parseInt(id)
  );
  if (!isExistPortfolios) {
    notFound();
  }
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <PortfolioDetailsMain />
    </PageWrapper>
  );
};
export async function generateStaticParams() {
  return portfolios?.map(({ id }) => ({ id: id.toString() }));
}
export default PortfolioDetails;
