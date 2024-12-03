import { useState } from "react";
import CardPage from "./components/CardPage";
import circle6 from "./assets/Image/circle6.svg";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

function Webinarpage() {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setIsLoading(true); // Set state untuk mulai loading
    fetch("https://campushub.web.id/api/events/webinar") // URL API
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

    <Navbar/>

      <div className="font-sans flex flex-col box-border mx-auto w-full">

        <div className="bg-[#EAF4FF] border-transparent rounded-t-[100px] flex flex-col items-center justify-center">
          <h1 className="font-semibold  text-[#003266] mt-[80px] mb-[80px] flex sm:text-[32px] md:text-[48px]">
            Jelajahi Webinar
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

export default Webinarpage;
