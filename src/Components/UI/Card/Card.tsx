import styles from "./Card.module.scss";

import type { CSSProperties, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Card = (props: CardProps) => {
  const { children, className = "", style } = props;

  return (
    <div className={`${styles.card} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
