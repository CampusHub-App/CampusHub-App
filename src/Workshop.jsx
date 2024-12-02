import { useState } from "react";
import profile from "./assets/Image/profile.svg";
import gambar from "./assets/Image/gambarutama.svg";
import webinar from "./assets/Image/webinar.svg";
import seminar from "./assets/Image/seminar.svg";
import kuliah from "./assets/Image/kuliah.svg";
import workshop from "./assets/Image/workshop.svg";
import sertifikasi from "./assets/Image/sertifikasi.svg";
import circle5 from "./assets/Image/circle5.svg";
import CardPage from "./components/CardPage";
import circle6 from "./assets/Image/circle6.svg";
import arrowLeft from "./assets/Image/icon/arrow-circle-left.svg";
import arrowRight from "./assets/Image/icon/arrow-circle-right.svg";
import logo from "./assets/Image/logo.svg";
import detail from "./assets/Image/detail.svg";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import Footer from "./components/footer";
import { useEffect } from "react";

function WorkshopPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const maxIndex = 4;

  useEffect(() => {
    setIsLoading(true); // Set state untuk mulai loading
    fetch("https://campushub.web.id/api/events/workshop") // URL API
        .then((response) => {
            if (!response.ok) {
                throw new Error("Terjadi kesalahan saat mengambil data."); // Tangani error HTTP
            }
            return response.json(); // Konversi response ke JSON
        })
        .then((data) => {
            if (Array.isArray(data) && data.length > 0) { 
                setEvents(data); // Set data langsung ke state
                setError(null); // Reset error jika sukses
            } else {
                setError("Tidak ada data acara."); // Tangani jika array kosong
            }
        })
        .catch((err) => setError(err.message)) // Tangani error
        .finally(() => setIsLoading(false)); // Akhiri loading
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pageVariants = {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  };

  return (
    <motion.div
      className="font-sans flex flex-col box-border w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="font-sans flex flex-col box-border mx-auto w-full">
        <header className="w-full">
          <nav className="p-5 bg-white sm:px-0 ">
            <div className="flex justify-between items-center px-5 tengah:px-[62px] sm:px-[0]">
            <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="hover:filter hover:drop-shadow-lg transition duration-300"
            />
          </Link>
              <ul className="hidden lg:flex gap-8 items-center text-[#003266] text-[20px] font-medium">
                <Link to="/home">
                  <li>
                    <a href="#">Home</a>
                  </li>
                </Link>
                <li>
                  <a href="#">MyEvents</a>
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
              <div className="flex items-center gap-4">
                <img src={profile} alt="Profile" className="hidden sm:block" />
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
            {isMenuOpen && (
  <div className="lg:hidden mt-4">
    <ul className="flex flex-col space-y-4 text-[#003266] text-[20px] font-medium">
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/MyEvent">MyEvent</Link>
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

            <img
              src={detail}
              alt="Detail gambar"
              className="w-full sm:px-0 tengah:px-[62px]  mt-5"
            />
          </nav>
        </header>

        <div className="bg-[#EAF4FF] border-transparent rounded-t-[100px] flex flex-col items-center justify-center">
          <h1 className="font-semibold  text-[#003266] mt-[80px] mb-[80px] flex sm:text-[32px] md:text-[48px]">
            Jelajahi Acara Unggulan
          </h1>
          <div className="flex flex-wrap justify-center">
            {isLoading ? (
                <p>Memuat data...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <CardPage events={events} />
            )}
            <img
                src={circle6}
                alt="Circle dekorasi"
                className="absolute left-0 top-[1300px]"
            />
        </div>
        </div>
      </div>
      <div id="aboutus">
        <Footer />
      </div>
    </motion.div>
  );
}

export default WorkshopPage;
