import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

//pages
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import useTheme from "./hooks/useTheme";
import Login from "./pages/Login/Login";
import RequireAuth from "./RequireAuth";
import Signup from "./pages/Signup/Signup";
import Startup from "./components/Startup";
import SearchProxy from "./pages/Search/SearchProxy";
import Error from "./pages/Error";

function App() {
  const { themeMode, changeTheme } = useTheme();

  return (
    <div className={`${themeMode} overflow-hidden`}>
      <div className="App dark:bg-gray-800 transition-colors overflow-y-auto delay-75 ease-out h-screen w-100">
        <Startup>
          <BrowserRouter>
            <Navbar mode={themeMode} changeMode={changeTheme} />

            <Routes>
              <Route path="/error" element={<Error />} />
              <Route path="/" element={<Home />} />

              <Route element={<RequireAuth />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/search/:query" element={<SearchProxy />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

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
          </BrowserRouter>

          <ToastContainer />
        </Startup>
      </div>
    </div>
  );
}

export default App;
