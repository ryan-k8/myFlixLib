import { useState, useRef } from "react";
import { RiMovieFill } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const mobileNavRef = useRef();

  const toggleMenu = () => {
    setOpen(!open);
    mobileNavRef.current.classList.toggle("hidden");
  };

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 ">
      <div className="container py-3 mx-auto px-5">
        <div className="flex justify-between items-center">
          <div className="App__logo">
            <RiMovieFill
              size={50}
              className="text-indigo-600 dark:text-blue-400"
            />
          </div>
          <div className="Nav__links">
            <ul className="h-full flex flex-row gap-5 justify-between items-center">
              <li className="hidden md:block cursor-pointer">
                <a className="text-2xl p-2 dark:text-white border-b-4 hover:border-indigo-600 border-transparent transition-colors dark:hover:border-blue-400 ">
                  Home
                </a>
              </li>
              <li className="hidden md:block cursor-pointer">
                <a className=" text-2xl p-2 dark:text-white border-b-4 hover:border-indigo-600 border-transparent transition-colors dark:hover:border-blue-400 ">
                  Profile
                </a>
              </li>

              <li className="hidden md:block cursor-pointer">
                <a className=" text-2xl p-2 dark:text-white border-b-4 hover:border-indigo-600 border-transparent transition-colors dark:hover:border-blue-400 ">
                  Logout
                </a>
              </li>
              <div className="md:hidden relative">
                <div
                  className="absolute hidden bottom-[-20px] top-[3.2rem] z-5 h-[10rem] rounded-md transition-all w-[90vw] sm:w-[70vw]  right-2 p-5 text-black shadow-2xl shadow-indigo-600/15 border-3 border-slate-200 bg-white dark:bg-gray-700 dark:text-white w-[90vw] dark:border-none "
                  ref={mobileNavRef}
                >
                  <ul className="flex flex-col h-14">
                    <li className="p-1 rounded-md transition-colors hover:bg-indigo-600 dark:hover:bg-blue-400">
                      <a className="text-xl px-1 dark:text-white cursor-pointer">
                        Home
                      </a>
                    </li>
                    <li className="p-1 rounded-md transition-colors hover:bg-indigo-600  dark:hover:bg-blue-400">
                      <a className="text-xl px-1 dark:text-white cursor-pointer">
                        Profile
                      </a>
                    </li>
                    <li className="p-1 rounded-md transition-colors hover:bg-indigo-600 dark:hover:bg-blue-400">
                      <a className="text-xl px-1 dark:text-white cursor-pointer">
                        LogOut
                      </a>
                    </li>
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
