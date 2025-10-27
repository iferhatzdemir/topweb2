"use client";
import About4 from "@/components/sections/about/About4";
import Blogs2 from "@/components/sections/blogs/Blogs2";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import History from "@/components/sections/history/History";
import Services1 from "@/components/sections/services/Services1";
import Videos2 from "@/components/sections/videos/Videos2";
import filterItems from "@/libs/filterItems";
import getAllServices from "@/libs/getAllServices";
import makeText from "@/libs/makeText";
import CommonContext from "@/providers/CommonContext";
import { useSearchParams } from "next/navigation";
import React from "react";

const ServicesMain = ({ title }) => {
  const allServices = getAllServices();
  const category = useSearchParams()?.get("category");
  // get searched blogs

  const filteredServices = filterItems(
    allServices,
    category ? "category" : "",
    category ? category : ""
  );
  return (
    <main>
      <HeroPrimary
        title={
          category
            ? `Category: ${makeText(category)}`
            : title
            ? title
            : "What We Do"
        }
        text={"Services"}
      />
      {!category ? <About4 /> : ""}
      <CommonContext value={{ filteredServices, category }}>
        <Services1 isPrimary={true} />
      </CommonContext>

      {!category ? (
        <>
          <History />
          <Videos2 />
          <Blogs2 type={2} pb="pb-70" />
        </>
      ) : (
        ""
      )}
      <Features4 />
    </main>
  );
};

export default ServicesMain;
