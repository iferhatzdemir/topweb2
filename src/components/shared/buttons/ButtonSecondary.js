import Link from "next/link";
import React from "react";

const ButtonSecondary = ({ text, path, type }) => {
  const actualType = type ? { type } : {};
  return (
    <>
      {path ? (
        <Link href={path} className="theme-btn-2 btn btn-effect-2">
          {text}
        </Link>
      ) : (
        <button {...actualType} className="theme-btn-2 btn btn-effect-2">
          {text}
        </button>
      )}
    </>
  );
};

export default ButtonSecondary;
