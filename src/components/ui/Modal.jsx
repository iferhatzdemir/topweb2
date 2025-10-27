"use client";

import { useEffect, useId } from "react";
import styles from "./Modal.module.css";

const composeClassName = (...values) => values.filter(Boolean).join(" ");

const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className,
}) => {
  const id = useId();
  const headingId = title ? `${id}-title` : undefined;

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }
    if (!open) {
      return undefined;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className={composeClassName(
          styles.modal,
          styles[`size-${size}`] || styles["size-md"],
          className
        )}
      >
        {title ? (
          <header className={styles.header}>
            <h2 id={headingId}>{title}</h2>
            <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Kapat">
              ×
            </button>
          </header>
        ) : null}
        <div className={styles.body}>{children}</div>
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </section>
    </div>
  );
};

export default Modal;
