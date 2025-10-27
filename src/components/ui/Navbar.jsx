"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const composeClassName = (...values) => values.filter(Boolean).join(" ");

const Navbar = ({
  logo,
  links = [],
  cta,
  onThemeToggle,
  className,
}) => {
  const pathname = usePathname();

  return (
    <header className={composeClassName(styles.navbar, className)}>
      <div className={styles.left}>
        {logo ? <div className={styles.logo}>{logo}</div> : null}
        <nav className={styles.menu} aria-label="Ana menü">
          <ul>
            {links.map(({ href, label }) => {
              const isActive = href && pathname?.startsWith(href);
              return (
                <li key={href || label}>
                  <Link
                    href={href || "#"}
                    className={composeClassName(
                      styles.link,
                      isActive ? styles.active : ""
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className={styles.right}>
        {onThemeToggle ? (
          <button
            type="button"
            className={composeClassName(styles.iconButton, styles.themeToggle)}
            onClick={onThemeToggle}
            aria-label="Tema değiştir"
          >
            <span aria-hidden="true">🌗</span>
          </button>
        ) : null}
        {cta ? <div className={styles.cta}>{cta}</div> : null}
      </div>
    </header>
  );
};

export default Navbar;
