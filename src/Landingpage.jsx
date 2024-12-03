import React, { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
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
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";

function LandingPage() {
 
  const pageVariants = {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingCount, setTrendingCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  
  useEffect(() => {
    setIsLoading(true);
    fetch("https://campushub.web.id/api/events/all") // Ganti dengan URL API Anda
        .then((response) => {
            if (!response.ok) {
                throw new Error("Terjadi kesalahan saat mengambil data.");
            }
            return response.json();
        })
        .then((data) => {
            const { events, trending, category } = data;
            setEvents(events);
            setTrendingCount(trending);
            setCategoryCount(category);
            setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
}, []);

  const maxIndex = 4; 

  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMyEventClick = () => {
    if (!isLoggedIn) {
      alert("Anda harus login terlebih dahulu untuk mengakses MyEvent.");
      return;
    }
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

      <Navbar />

      <header className="bg-[#003266] w-full max-[1000px] ">
        
        <main className="flex justify-around text-white items-center my-auto py-10 w-full md:px-5">
          <div className="flex flex-col gap-y-[24px] ">
            <h1 className="font-bold  sm:text-[20px] md:text-[28px] lg:text-[54px] max-w-[640px] w-full tengah:text-[24px] ">
              Wujudkan Potensimu Melalui Pengalaman yang Tak Terbatas!
            </h1>
            <p className="max-w-[550px] font-medium sm:text-[15px] md:text-[23px] tengah:text-[20px] lg:text-[26px] ">
              Kembangkan dirimu sekarang dan raih prestasi luar biasa.
            </p>
            <ScrollLink to="acara" smooth={true} duration={800}><p className="max-w-[278px] px-[16px] py-[8px] bg-[#027FFF] rounded-[10px] sm:max-w-[200px] md:max-w-[278px] lg:max-w-[278px] tengah:max-w-[240px] flex justify-center cursor-pointer">
              Pesan
            </p>
            </ScrollLink>
            <div className="flex gap-x-[20px] sm:gap-x-[15px] sm:max-w-[200px] lg:gap-x-[20px] tengah:max-w-[530px] ">
            <div className="flex flex-col items-center">
            
              <h1 className="font-bold text-[38px] sm:text-[20px] lg:text-[38px] md:text-[38px]">{isLoading ? "..." : trendingCount}
              </h1>
              <p className="font-normal text-[18px] sm:text-[12px] lg:text-[18px] md:text-[18px]">Trending Events</p>
            </div>

            <div className="flex flex-col items-center">
            <h1 className="font-bold text-[38px] sm:text-[20px] lg:text-[38px] md:text-[38px]">{isLoading ? "..." : categoryCount}
            </h1>
              <p className="font-normal text-[18px] sm:text-[12px] lg:text-[18px] md:text-[18px]">Kategori Acara</p>
            </div>
            </div>

          </div>
          <img src={gambar} alt="Gambar utama" className="relative z-10 w-full sm:w-[200px] md:w-[440px] tengah:w-[300px] lg:w-[550px] " />
        </main>
      </header>

      
      <img src={circle5} alt="Circle dekorasi" className="absolute right-0 top-72 sm:hidden xl:block" />

     
      <div className="flex flex-col gap-y-[12px] mb-[12px] ">
        <h1 className="flex justify-center mt-[12px] items-center font-semibold text-[32px]">
          Kategori
        </h1>
        <ul className="flex gap-x-[64px] justify-center">
            <li>
            <Link to="/webinar"><img src={webinar} alt="Webinar" /></Link>
            </li>
            <li>
            <Link to="/seminar"><img src={seminar} alt="Seminar" /></Link>
            </li>
            <li>
            <Link to="/kuliah-tamu"><img src={kuliah} alt="Kuliah" /></Link>
            </li>
            <li>
            <Link to="/workshop"><img src={workshop} alt="Workshop" /></Link>
            </li>
            <li>
            <Link to="/sertifikasi"><img src={sertifikasi} alt="Sertifikasi" /></Link>
            </li>
          </ul>
      </div>

      
      <div id="acara" className="bg-[#EAF4FF] border-transparent rounded-t-[100px] flex flex-col items-center justify-center">
        <h1 className="font-semibold  text-[#003266] mt-[80px] mb-[80px] flex sm:text-[32px] md:text-[48px] ">
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
      <div id="aboutus">
      <Footer/>
      </div>
      </motion.div>
  );
}

export default LandingPage;
