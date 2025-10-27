import styles from "./Card.module.css";

const composeClassName = (...values) => values.filter(Boolean).join(" ");

const Card = ({
  title,
  subtitle,
  media,
  actions,
  children,
  variant = "elevated",
  padding = "md",
  className,
  ...rest
}) => {
  const classes = composeClassName(
    styles.card,
    styles[`variant-${variant}`] || styles["variant-elevated"],
    styles[`padding-${padding}`] || styles["padding-md"],
    className
  );

  return (
    <section className={classes} {...rest}>
      {media ? <div className={styles.media}>{media}</div> : null}
      {title || subtitle || actions ? (
        <header className={styles.header}>
          <div>
            {title ? <h3 className={styles.title}>{title}</h3> : null}
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </div>
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </header>
      ) : null}
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default Card;
