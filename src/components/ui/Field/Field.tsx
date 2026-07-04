import styles from "./Field.module.scss";

import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
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
    ...inputProps
  } = props;

  const inputClassName = error
    ? `${styles.field__input} ${styles.field__input_error}`
    : styles.field__input;

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
