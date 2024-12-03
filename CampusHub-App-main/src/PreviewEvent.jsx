import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate, Link } from "react-router-dom";
import PopUpCheckout from './components/PopUpCheckout';
import Ellipse2 from './assets/image/Ellipse2.svg';
import "./css/PreviewEvent.css";
import Calendar from './assets/image/date.svg';
import Chair from './assets/image/chair.svg';

const PreviewEvent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Periksa autentikasi sebelum menampilkan halaman
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login untuk mengakses halaman ini.");
      navigate("/login/user"); // Redirect ke halaman login jika tidak ada token
    }
  }, [navigate]);

  // Ambil data event berdasarkan ID
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`https://campushub.web.id/api/events/${id}/view`);
        if (!response.ok) {
          throw new Error("Gagal mendapatkan data event.");
        }
        const data = await response.json();
        setEventData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEventData();

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda belum login. Silakan login terlebih dahulu.");
        navigate("/Loginpeserta");
        return;
      }

      const response = await fetch(`https://campushub.web.id/api/events/${id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: id,
          seats: seatsToBook,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowPopup(true);
        setTimeout(() => {
          navigate(`/${eventData.id}/kode-unik`);
        }, 2000);
      } else {
        alert(`Booking gagal: ${data.message || "Coba lagi nanti."}`);
      }
    } catch (err) {
      console.error("Error booking the event:", err);
      alert("Terjadi kesalahan saat booking. Silakan coba lagi.");
    }
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(`/${eventData.id}/view`);
    }, 500);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!eventData) {
    return null;
  }

  return (
    <div className="preview-event h-[1024px] pt-10 mx-4 lg:mx-20 relative">
      <div className={`preview-event-container ${isLoaded ? "loaded" : ""} ${isExiting ? "exiting" : ""}`}>
        <div className="breadcrumb pt-auto flex ml-2 pb-10">
          <ol className="list-none flex text-black text-medium">
            <li>
              <Link to="#" className="hover:underline">Home</Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link to={`/event-details/${eventData.id}`} className="hover:underline">{eventData.category_name}</Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link to="/preview-event" className="hover:underline">Booking</Link>
            </li>
          </ol>
        </div>
        <div className="content-box flex flex-col lg:flex-row gap-8">
          <div className="event-description border-2 border-dashed border-black p-4 custom-dashed rounded-2xl lg:w-[1000px] w-full">
            <div className="event-detail flex flex-col lg:flex-row px-4">
              <div className="PosterEvent w-full lg:w-1/2 h-11/12">
                <img
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                  src={eventData.foto_event || Poster}
                  alt="Poster Event"
                />
              </div>
              <div className="description text-left mx-4 mt-4 lg:mt-0 lg:w-8/12 sm:w-full">
                <span className="bg-[#027FFF] font-regular px-8 py-1 rounded-full text-white text-[14px]">
                  {eventData.category_name}
                </span>
                <h1 className="font-bold text-[32px] py-4">{eventData.judul}</h1>
                <div className="border-b-2 border-[#003266] w-full my-4"></div>
                <div className="flex gap-2 ml-2">
                  <img src={Calendar} alt="Calendar" className="text-4xl" />
                  <div className="flex w-full">
                    <span className="font-medium text-[16px] mt-2">{eventData.date}</span>
                    <span className="font-medium text-[16px] mt-2 ml-auto">{eventData.start_time} - {eventData.end_time}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-1 my-4">
                  <i className="ri-map-pin-2-fill text-4xl"></i>
                  <span className="font-medium text-[16px] mt-2">{eventData.tempat}</span>
                  <img src={Chair} alt="Location" className="text-4xl ml-auto" />
                  <span className="font-medium text-[16px] mt-2">{eventData.available_slot} Kursi</span>
                </div>
                <div className="border-b-2 border-[#003266] w-full my-4"></div>
                <div className="lecturer flex gap-2 ml-2 items-center">
                  <img
                    src={eventData.foto_pembicara || Lecturer}
                    alt="Profile"
                    className="w-16 h-16 text-4xl sm:text-3xl rounded-full"
                  />
                  <div className="lecturername flex flex-col ml-4 gap-4">
                    <span className="font-semibold text-[20px]">
                      {eventData.pembicara}
                    </span>
                    <span className="text-regular text-[16px]">
                      {eventData.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] sm:w-full lg:w-[845px] my-4 mx-auto"></div>
            <div>
              <p className="eventdescription font-regular text-wrap px-8 text-[16px] block w-full lg:w-[900px]">
                {eventData.deskripsi}
              </p>
            </div>
          </div>
          <div className="booking w-full h-full px-6 py-6 mx-auto lg:mx-8 bg-white shadow-lg rounded-2xl flex flex-col lg:relative">
            <div className="sub-total flex gap-4">
              <span className="text-left my-2 font-medium text-[14px] pl-2 me-auto">
                Sub Total
              </span>
              <span className="text-right my-2 font-medium text-[14px] ms-auto">
                {seatsToBook} seat(s)
              </span>
            </div>
            <span className="event-type my-2 font-medium text-[14px] pl-2">Webinar</span>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div className="total flex gap-4">
              <span className="text-left my-2 font-semibold text-[18px] pl-2 me-auto">Total</span>
              <span className="text-right my-2 font-semibold text-[18px] ms-auto">
                {seatsToBook} seat(s)
              </span>
            </div>
            <div className="checkout flex flex-col">
              <button
                className="bg-[#027FFF] font-regular w-full h-11 my-2 rounded-lg text-medium text-white text-[16px]"
                onClick={handleBooking}
              >
                Pesan
              </button>
              <button
                className="bg-transparent border-2 border-[#027FFF] font-regular w-full h-11 my-2 rounded-lg text-medium text-black text-[16px] hover:bg-red-300 hover:border-red-500"
                onClick={handleExit}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <PopUpCheckout />}
      <div className="fixed bottom-0 right-0 -z-10">
        <img src={Ellipse2} alt="Background" className="w-[300px]" />
      </div>
      <div className="circle-animation"></div>
    </div>
  );
};

export default PreviewEvent;
