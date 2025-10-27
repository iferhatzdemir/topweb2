"use client";

import Link from "next/link";
import styles from "./Button.module.css";

const composeClassName = (...values) => values.filter(Boolean).join(" ");

const Button = ({
  as,
  href,
  variant = "primary",
  tone = "solid",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...rest
}) => {
  const Component = as || "button";
  const classes = composeClassName(
    styles.button,
    styles[`variant-${variant}`] || styles["variant-primary"],
    styles[`tone-${tone}`] || "",
    styles[`size-${size}`] || styles["size-md"],
    fullWidth ? styles.fullWidth : "",
    className
  );
  const props = { ...rest, className: classes };
  const isLink = Component === Link || Component === "a";

  if (isLink) {
    props.href = href || "#";
  }

  if (Component === "button" && !props.type) {
    props.type = "button";
  }

  return <Component {...props}>{children}</Component>;
};

export default Button;
