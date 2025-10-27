import styles from "./Footer.module.css";

const composeClassName = (...values) => values.filter(Boolean).join(" ");

const Footer = ({
  columns = [],
  bottom,
  social = [],
  className,
}) => {
  return (
    <footer className={composeClassName(styles.footer, className)}>
      {columns.length ? (
        <div className={styles.columns}>
          {columns.map(({ title, items = [] }) => (
            <section key={title} className={styles.column}>
              {title ? <h4>{title}</h4> : null}
              <ul>
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : null}
      {social.length || bottom ? (
        <div className={styles.bottomRow}>
          {social.length ? (
            <ul className={styles.social}>
              {social.map(({ icon, label, href }) => (
                <li key={label}>
                  <a href={href} aria-label={label}>
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {bottom ? <div className={styles.bottomContent}>{bottom}</div> : null}
        </div>
      ) : null}
    </footer>
  );
};

export default Footer;
