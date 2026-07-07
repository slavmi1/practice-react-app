import { Link, Route, Routes } from "react-router";
import HomePage from "./Components/Pages/HomePage/HomePage";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import RegisterPage from "./Components/Pages/RegisterPage/RegisterPage";

const App = () => {
  return (
    <>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/login">Войти</Link>
        <Link to="/register">Регистрация</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
