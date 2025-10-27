"use client";

import { createContext, useContext } from "react";

const footerContex = createContext(null);

const FooterContexProvider = ({ value, children }) => {
  return (
    <footerContex.Provider value={value}>{children}</footerContex.Provider>
  );
};

export const useFooterContex = () => {
  const value = useContext(footerContex);
  return value;
};
export default FooterContexProvider;
