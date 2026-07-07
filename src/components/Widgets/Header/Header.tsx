import { Link, NavLink } from "react-router";

import logo from "../../../assets/logo.png";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={`${styles.link} ${styles.logo}`}>
          <img
            src={logo}
            className={styles.logoIcon}
            alt=""
            aria-hidden="true"
          />
          <span className={styles.logoText}>BarberTime</span>
        </Link>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.activeLink : ""}`
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.activeLink : ""}`
          }
        >
          Войти
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.activeLink : ""}`
          }
        >
          Регистрация
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
