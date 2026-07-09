import { Link, NavLink, useNavigate } from "react-router";

import styles from "./Header.module.scss";
import { useAuth } from "../../../Context/AuthContext/useAuth";
import logo from "../../../assets/logo.png";
import exitIcon from "../../../assets/icons/exit.svg";

const Header = () => {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/", { replace: true });
    logout();
  };

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
          to="/services"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.activeLink : ""}`
          }
        >
          Услуги и запись
        </NavLink>

        {isAuth && (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Личный кабинет
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className={styles.exitButton}
            >
              <img src={exitIcon} />
            </button>
          </>
        )}

        {!isAuth && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Вход
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Регистрация
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
