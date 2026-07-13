import styles from "./Field.module.scss";

import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  isPlaceholder?: boolean;
};

const Field = (props: InputProps) => {
  const {
    className = "",
    id,
    label,
    placeholder = " ",
    autoComplete = "off",
    type = "text",
    error,
    isPlaceholder,
    ...inputProps
  } = props;

  const inputClassName = `
    ${styles.field__input}
    ${error ? styles.field__input_error : ""}
    ${isPlaceholder ? styles.field__input_placeholder : ""}
  `;

  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label className={styles.field__label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        className={inputClassName}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type={type}
      />
      {error && <p className={styles.field__error}>{error}</p>}
    </div>
  );
};

export default Field;
