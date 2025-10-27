import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import NotFoundPrimary from "@/components/sections/not-found/NotFoundPrimary";

const NotFoundMain = ({ title, pathName }) => {
  return (
    <main>
      <HeroPrimary
        title={title ? title : "404 Page"}
        text={pathName ? pathName : "404"}
      />
      <NotFoundPrimary title={title} />
    </main>
  );
};

export default NotFoundMain;
