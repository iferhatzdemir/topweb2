import Link from "next/link";
import React from "react";

const ButtonPrimary = ({ text, path, type }) => {
  const actualType = type ? { type } : {};
  return (
    <>
      {path ? (
        <Link href={path} className="theme-btn-1 btn btn-effect-1">
          {text}
        </Link>
      ) : (
        <button {...actualType} className="theme-btn-1 btn btn-effect-1">
          {text}
        </button>
      )}
    </>
  );
};

export default ButtonPrimary;
