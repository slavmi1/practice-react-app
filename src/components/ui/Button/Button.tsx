import "./Button.css";

import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

const Button = (props: ButtonProps) => {
  const { className = "", type = "button", children, ...buttonProps } = props;

  return (
    <button {...buttonProps} className={`button ${className}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
