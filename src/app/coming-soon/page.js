import ComingSoonMain from "@/components/layout/main/ComingSoonMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const ComingSoon = () => {
  return (
    <PageWrapper isCommingSoon={true}>
      <ComingSoonMain />
    </PageWrapper>
  );
};

export default ComingSoon;
