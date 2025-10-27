"use client";

import { useFooterContex } from "@/providers/FooterContext";

import Copyright2 from "./Copyright2";
import FooterAbout2 from "./FooterAbout2";
import FooterCompany from "./FooterCompany";
import FooterServices2 from "./FooterServices2";
import FooterCustomerCare from "./FooterCustomerCare";
import FooterNewsletter from "./FooterNewsletter";

const Footer = () => {
  const {  footerBg } = useFooterContex();
  return (
    <footer
        className={`ltn__footer-area `}
      >
        <div
          className={`footer-top-area   ${
            footerBg === "dark"
                ? "section-bg-2 plr--5"
                : "section-bg-1 plr--5 "
              
          }`}
       
        >
          <div className={ "container-fluid" }>
            <div className="row">
         
                  <FooterAbout2 />
                  <FooterCompany />
                  <FooterServices2 />
                  <FooterCustomerCare />
                  <FooterNewsletter />
              
             
            </div>
          </div>
        </div>
        <Copyright2 />
      </footer>
  );
};

export default Footer;
