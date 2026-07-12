import styles from "./Select.module.scss";

import type { ComponentProps } from "react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = ComponentProps<"select"> & {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
};

const Select = (props: SelectProps) => {
  const {
    label,
    error,
    options,
    id,
    placeholder = "Выберите значение",
    defaultValue = "",
    ...selectProps
  } = props;

  const selectClassName = error
    ? `${styles.select__input} ${styles.select__input_error}`
    : styles.select__input;

  return (
    <div className={styles.select}>
      {label && (
        <label className={styles.select__label} htmlFor={id}>
          {label}
        </label>
      )}
      <select
        {...selectProps}
        className={selectClassName}
        id={id}
        defaultValue={defaultValue}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={styles.select__option}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.select__error}>{error}</span>}
    </div>
  );
};

export default Select;
