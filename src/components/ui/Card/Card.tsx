import styles from "./Card.module.scss";

import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = (props: CardProps) => {
  const { children, className = "" } = props;

  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default Card;
