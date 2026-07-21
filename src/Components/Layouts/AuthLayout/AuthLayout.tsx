import type { ReactNode } from "react";
import styles from "./AuthLayout.module.scss";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

const AuthLayout = (props: AuthLayoutProps) => {
  const { title, subtitle, children, footer } = props;

  return (
    <main className={styles.auth}>
      <section className={styles.card}>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.subtitle}>{subtitle}</p>

        {children}

        <p className={styles.registerText}>{footer}</p>
      </section>
    </main>
  );
};

export default AuthLayout;
