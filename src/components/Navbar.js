import { useState, useRef, useEffect } from "react";
import { RiMovieFill } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { FaSignOutAlt, FaSignInAlt, FaHome, FaUser } from "react-icons/fa";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Navbar({ mode, changeMode }) {
  const [open, setOpen] = useState(false);
  const mobileNavRef = useRef();

  const { user: loggedIn } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const logOutUser = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setOpen(!open);
    mobileNavRef.current.classList.toggle("hidden");
  };

  const closeMobileNav = () => {
    setOpen(false);
    mobileNavRef.current.classList.add("hidden");
  };

  const { pathname } = useLocation();

  const handleClickOutside = (event) => {
    if (
      mobileNavRef.current &&
      !mobileNavRef.current.contains(event.target) &&
      !mobileNavRef.current.classList.contains("hidden")
    ) {
      closeMobileNav();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <nav className="shadow-md w-full">
      <div className="container py-3 mx-auto px-5">
        <div className="flex justify-between items-center">
          <div className="App__logo">
            <RiMovieFill
              size={50}
              className="text-indigo-600 cursor-pointer dark:text-blue-400"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="Nav__links">
            <ul className="h-full flex flex-row gap-5 justify-between items-center">
              {loggedIn && (
                <>
                  <li className="hidden md:block cursor-pointer">
                    <NavLink
                      to="/"
                      className={`text-2xl p-2 rounded-lg dark:text-white border-b-4 hover:border-indigo-600 border-transparent transition-colors dark:hover:border-blue-400 `}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="hidden md:block cursor-pointer">
                    <NavLink
                      to="/profile"
                      className={`text-2xl rounded-lg p-2 dark:text-white border-b-4 hover:border-indigo-600 border-transparent transition-colors dark:hover:border-blue-400`}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="hidden md:block cursor-pointer">
                    <a
                      className=" text-2xl p-2 dark:text-white border-b-4 hover:border-indigo-600 border-transparent transition-colors dark:hover:border-blue-400 "
                      onClick={logOutUser}
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}

              {!loggedIn && (
                <>
                  <li className="hidden md:block cursor-pointer">
                    <NavLink
                      to="/login"
                      className={`text-2xl rounded-lg p-2 dark:text-white border-b-4 hover:border-indigo-600 border-transparent transition-colors dark:hover:border-blue-400`}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="hidden md:block cursor-pointer">
                    <NavLink
                      to="/signup"
                      className={`text-2xl rounded-lg p-2 dark:text-white border-b-4 hover:border-indigo-600 border-transparent transition-colors dark:hover:border-blue-400`}
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
              )}

              <div>
                {mode === "light" ? (
                  <MdDarkMode
                    size={45}
                    className="cursor-pointer"
                    onClick={() => changeMode("dark")}
                  />
                ) : (
                  <MdLightMode
                    size={45}
                    className="cursor-pointer text-white"
                    onClick={() => changeMode("light")}
                  />
                )}
              </div>
              <div className="md:hidden relative">
                <div
                  className={`absolute hidden bottom-[-20px] top-[3.2rem] z-[5000] h-[13rem] rounded-md transition-all sm:w-[70vw]  right-2 p-5 text-black shadow-2xl shadow-indigo-600/15 border-3 border-slate-200 bg-white dark:bg-gray-700 dark:text-white w-[90vw] dark:border-none `}
                  ref={mobileNavRef}
                >
                  <ul className="flex flex-col h-14">
                    {loggedIn && (
                      <>
                        <li
                          className="p-1 rounded-md transition-colors hover:bg-indigo-600 dark:hover:bg-blue-400"
                          onClick={closeMobileNav}
                        >
                          <NavLink
                            to="/"
                            className="text-xl rounded-md py-1 px-1 flex gap-2 items-center dark:text-white cursor-pointer"
                          >
                            <FaHome /> Home
                          </NavLink>
                        </li>
                        <li
                          className="p-1 rounded-md transition-colors hover:bg-indigo-600  dark:hover:bg-blue-400"
                          onClick={closeMobileNav}
                        >
                          <NavLink
                            to="/profile"
                            className="text-xl px-1 py-1 rounded-md flex gap-2 items-center dark:text-white cursor-pointer"
                          >
                            <FaUser /> Profile
                          </NavLink>
                        </li>
                        <li
                          className="p-1 rounded-md transition-colors hover:bg-indigo-600 dark:hover:bg-blue-400"
                          onClick={closeMobileNav}
                        >
                          <a
                            className="text-xl px-1 flex gap-2 items-center dark:text-white cursor-pointer"
                            onClick={logOutUser}
                          >
                            <FaSignOutAlt /> LogOut
                          </a>
                        </li>
                      </>
                    )}

                    {!loggedIn && (
                      <>
                        <li
                          className="p-1 rounded-md transition-colors hover:bg-indigo-600 dark:hover:bg-blue-400"
                          onClick={closeMobileNav}
                        >
                          <NavLink
                            to="/login"
                            className="text-xl rounded-md py-1 px-1 flex gap-2 items-center dark:text-white cursor-pointer"
                          >
                            <FaSignInAlt /> Login
                          </NavLink>
                        </li>
                        <li
                          className="p-1 rounded-md transition-colors hover:bg-indigo-600 dark:hover:bg-blue-400"
                          onClick={closeMobileNav}
                        >
                          <NavLink
                            to="/signup"
                            className="text-xl px-1 rounded-md py-1 flex gap-2 items-center dark:text-white cursor-pointer"
                          >
                            <FaUser /> Signup
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                {open ? (
                  <RiCloseFill
                    size={35}
                    className="dark:text-white"
                    onClick={toggleMenu}
                  />
                ) : (
                  <RiMenu3Fill
                    size={35}
                    className="text-black dark:text-white"
                    onClick={toggleMenu}
                  />
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
