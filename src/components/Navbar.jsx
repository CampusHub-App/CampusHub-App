import { useState } from "react";
import { useEffect } from "react";
import logo from "../assets/Image/logo.svg";
import logo2 from "../assets/Image/logo2.svg";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { data } from "autoprefixer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const aboutus = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }

    setTimeout(() => {
      const aboutUsElement = document.getElementById("footer");
      if (aboutUsElement) {
        aboutUsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://campushub.web.id/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } finally {
        setIsLoading(false);
        console.log(data);
      }
    };

    fetchUserProfile();

    const savedMenuState = localStorage.getItem("isMenuOpen");
    if (savedMenuState === "true") {
      setIsMenuOpen(true);
    }
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      localStorage.setItem("isMenuOpen", "false");
    } else {
      setIsMenuOpen(true);
      localStorage.setItem("isMenuOpen", "true");
    }
  };

  const bgcolor = (pathname) => {
    switch (pathname) {
      case "/my-events":
      case "/account/profile":
      case "/account/password":
        return "bg-[#003266]";
      default:
        return "bg-white";
    }
  };

  const txtcolor = (pathname) => {
    switch (pathname) {
      case "/my-events":
      case "/profile":
      case "/account/profile":
      case "/account/password":
        return "text-white";
      default:
        return "text-[#003266]";
    }
  };

  const Logo = (pathname) => {
    switch (pathname) {
      case "/my-events":
      case "/profile":
      case "/account/profile":
      case "/account/password":
        return logo2;
      default:
        return logo;
    }
  };

  return (
    <nav
      className={`sm:px-[0px] md:p-5 tengah:px-6 ${bgcolor(
        location.pathname
      )} w-full lg:px-10 xl:px-[85px] py-5`}
    >
      <div className="flex justify-between items-center  px-[0px] w-full ">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={Logo(location.pathname)}
            alt="Logo"
            className="hover:scale-105 hover:filter hover:drop-shadow-lg transition duration-300 sm:max-w-[150px] md:max-w-[229px] tengah:max-w-[180px]"
          />
        </Link>
        <ul
          className={`hidden lg:flex space-x-8 items-center ${txtcolor(
            location.pathname
          )} text-[20px] font-medium`}
        >
          <Link to="/" className="transition-all duration-3000 hover:scale-105">
            <li>
              <a href="#">Home</a>
            </li>
          </Link>
          <Link
            to="/my-events"
            className="transition-all duration-3000 hover:scale-105"
          >
            <li>
              <a href="#">My Events</a>
            </li>
          </Link>
          <li>
            <li>
              <button
                onClick={aboutus}
                className="transition-all duration-3000 hover:scale-105 cursor-pointer"
              >
                About Us
              </button>
            </li>
          </li>
        </ul>

        <div className="flex justify-center gap-x-3 items-center">
          {isLoading ? (
            <div className="w-60 h-12 rounded-full hover:scale-105 transition duration-300 object-cover"></div>
          ) : userData ? (
            <Link
              to="/account/profile"
              className="sm:flex gap-x-[20px] sm:gap-x-[10px] item-center text-nowrap pl-[12rem]"
            >
              <img
                src={
                  userData.photo ||
                  `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                    userData.fullname || "User"
                  )}&size=250`
                }
                alt="profile"
                className="w-12 h-12 rounded-full hover:scale-105 transition duration-300 object-cover"
              />
            </Link>
          ) : (
            <div className="sm:flex gap-x-[20px] sm:gap-x-[10px] item-center text-nowrap">
              <Link to="/welcome">
                <button className="hover:scale-105 transition-all duration-300 bg-[#027FFF] border rounded-[10px] text-white sm:text-[15px] font-medium sm:w-[80px] sm:h-[30px] md:w-[155px] md:h-[46px] md:text-[20px] tengah:w-[120px] tengah:h-[36px] tengah:text-[17px]">
                  Login
                </button>
              </Link>
              <Link to="/user/register">
                <button className="hover:scale-105 transition-all duration-300 border-[#027FFF] border-2 rounded-[10px] text-[#027FFF] sm:text-[15px] font-medium sm:w-[80px] sm:h-[30px] md:w-[155px] md:h-[46px] md:text-[20px] tengah:w-[120px] tengah:h-[36px] tengah:text-[17px]">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <button
            onClick={toggleMenu}
            className="lg:hidden flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && !isLoading && (
        <div className="lg:hidden mt-4">
          <ul className="flex flex-col space-y-4 text-[#003266] text-[20px] font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/my-events">MyEvent</Link>
            </li>
            <li>
              <ScrollLink
                to="aboutus"
                smooth={true}
                duration={800}
                className="cursor-pointer"
              >
                <p>About Us</p>
              </ScrollLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
