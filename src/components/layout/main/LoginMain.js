import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import LoginPrimary from "@/components/sections/login/LoginPrimary";

const LoginMain = () => {
  return (
    <main>
      <HeroPrimary title={"Sign In"} text="Login" />
      <LoginPrimary />
      <Features4 />
    </main>
  );
};

export default LoginMain;
