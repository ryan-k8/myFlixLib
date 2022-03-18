import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import useTheme from "./hooks/useTheme";
import Login from "./pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import Signup from "./pages/Signup/Signup";

function App() {
  const { themeMode, changeTheme } = useTheme();

  return (
    <div className={`${themeMode}`}>
      <div className="App dark:bg-gray-800 transition-colors delay-75 ease-out h-screen w-100">
        <BrowserRouter>
          <Navbar mode={themeMode} changeMode={changeTheme} />

          <Routes>
            <Route path="/error" element={<Error />} />
            <Route path="/" element={<Home />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route
              path="*"
              element={
                <Navigate
                  to="/error"
                  replace
                  state={{ message: "Page Not Found" }}
                />
              }
            />
          </Routes>

          <ToastContainer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
