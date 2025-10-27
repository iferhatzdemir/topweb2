import styles from "./Input.module.css";

const composeClassName = (...values) => values.filter(Boolean).join(" ");

const Input = ({
  as = "input",
  id,
  name,
  label,
  helperText,
  error,
  className,
  inputClassName,
  ...rest
}) => {
  const Component = as === "textarea" ? "textarea" : as;
  const controlId = id || name;
  const helperId = controlId ? `${controlId}-helper` : undefined;
  const wrapperClass = composeClassName(styles.wrapper, className);
  const inputClass = composeClassName(
    styles.input,
    error ? styles.error : "",
    Component === "textarea" ? styles.textarea : "",
    inputClassName
  );

  return (
    <label className={wrapperClass} htmlFor={controlId}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <Component
        id={controlId}
        name={name}
        className={inputClass}
        aria-invalid={Boolean(error)}
        aria-describedby={helperText || error ? helperId : undefined}
        {...rest}
      />
      {helperText || error ? (
        <span
          id={helperId}
          className={composeClassName(styles.helper, error ? styles.helperError : "")}
          role={error ? "alert" : undefined}
        >
          {error || helperText}
        </span>
      ) : null}
    </label>
  );
};

export default Input;
