import "./Field.css";

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

  return (
    <div className={`field ${className}`}>
      {label && (
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        className={`field__input ${error ? "field__input_error" : ""}`}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type={type}
      />
      {error && <p className="field__caption">{error}</p>}
    </div>
  );
};

export default Field;
