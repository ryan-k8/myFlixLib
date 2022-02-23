import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";

//pages
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

function App() {
  const [mode, setMode] = useState("light");

  const changeMode = (mode) => {
    setMode(mode);
  };

  return (
    <div className={`${mode}`}>
      <div className="App dark:bg-gray-800 h-screen w-100">
        <BrowserRouter>
          <Navbar mode={mode} changeMode={changeMode} />

          <Routes>
            <Route path="/error" element={<Error />} />

            <Route path="/" element={<Home />} />

            <Route path="/profile" element={<Profile />} />

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
      </div>
    </div>
  );
}

export default App;
