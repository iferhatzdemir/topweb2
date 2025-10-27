import styles from "./Badge.module.css";

const composeClassName = (...values) => values.filter(Boolean).join(" ");

const Badge = ({ variant = "primary", children, className, ...rest }) => {
  const classes = composeClassName(
    styles.badge,
    styles[`variant-${variant}`] || styles["variant-primary"],
    className
  );
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
