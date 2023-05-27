import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  doesSessionExist,
  signOut,
} from "supertokens-auth-react/recipe/session";

const   Navbar = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);

  const loggedIn = async () => {
    const isLoggedIn = await doesSessionExist();
    setIsUser(isLoggedIn);
  };

  useEffect(() => {
    loggedIn();
  }, []);

  const darkModeToggle = () => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("color-theme", "light");
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      localStorage.removeItem("color-theme");
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  const onLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <>
      <nav
        className={`overflow-x-hidden font-primary w-screen bg-navbar-background border-gray-200 px-3 sm:px-3 py-2 dark:bg-navbar-background-dark ${
          !location.pathname.startsWith("/admin") && "z-10 top-0 left-0 fixed"
        }`}
      >
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            <div className=" h-[12vh] px-2 bg-cover flex items-center bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dkxt3vacv/image/upload/v1685128910/WhatsApp_Image_2023-05-26_at_16.56.56_howxor.jpg')] w-36"></div>
            </span>
          </Link>
          

          <div className="flex gap-4 items-center md:order-2">
            {isUser && (
              <button
                onClick={() => {
                  navigate("/user");
                }}
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src="https://res.cloudinary.com/dkxt3vacv/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1685135041/310709244_1178867323061488_1639781335916230585_n_rk4kxw.jpg"
                  alt="Application User"
                />
              </button>
            )}
            

            <DarkModeSwitch
              checked={isDarkMode}
              onChange={darkModeToggle}
              size={20}
            />

        
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-20 md:flex md:w-20 md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col p-4 mt-0 bg-gray-50 rounded-xl border border-gray-100 md:flex-row md:space-x-16 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-blue-900 md:text-white dark:bg-gray-800  dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="font-bold block py-2 pr-4 pl-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>
              </li>
             
              <li>
                <Link
                  to="/packages/home"
                  className="font-bold block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/hotels/home"
                  className="font-bold block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-bold block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
              <li>
                {!isUser ? (
                  <Link
                    to="/auth"
                    className="font-bold block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Login
                  </Link>
                ) : (
                  <p
                    onClick={onLogout}
                    className="cursor-pointer font-bold block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Logout
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
