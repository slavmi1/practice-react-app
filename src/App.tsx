import { Route, Routes } from "react-router";

import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Register/Register";
import Header from "./Components/Widgets/Header/Header";
import Profile from "./Components/Pages/Profile/Profile";
import ProtectedRoute from "./Components/Layouts/ProtectedRoute/ProtectedRoute";
import Services from "./Components/Pages/Services/Services";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
