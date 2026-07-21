import styles from "./Button.module.scss";

import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  icon?: string | undefined;
};

const Button = (props: ButtonProps) => {
  const {
    className = "",
    type = "button",
    children,
    icon,
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      className={`${styles.button} ${className}`}
      type={type}
    >
      {icon && <img src={icon} className={styles.icon} />}
      {children}
    </button>
  );
};

export default Button;
