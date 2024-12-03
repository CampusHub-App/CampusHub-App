import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Poster from "./assets/image/Poster.svg";
import Ellipse from "./assets/image/Ellipse.svg";
import Lecturer from "./assets/image/lecturer.svg";
import "./css/DescriptionPageCancel.css";
import Calendar from "./assets/image/date.svg";
import Chair from "./assets/image/chair.svg";

const DescriptionPageCancel = () => {
  const [eventData, setEventData] = useState(null);
  const [isCrossVisible, setIsCrossVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageAnimation, setPageAnimation] = useState("page-enter");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("welcome", { replace: true });
      return;
    }
    
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://campushub.web.id/api/events/${id}/view`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setEventData(data);
        setLoading(false);
      } catch (error) {
        setError(message);
        setLoading(false);
      }
    };

    fetchEventData();
    setTimeout(() => {
      setIsCrossVisible(true);
    }, 1000);
  }, []);

  const handleBack = () => {
    setPageAnimation("page-exit");
    setTimeout(() => navigate("/my-events"), 400);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader w-16 h-16 border-4 border-customBlue border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-red-500 text-2xl font-semibold">Error</h1>
          <p className="text-red-700 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-event min-h-screen pt-10 px-4 lg:mx-20">
      <div className={`container ${pageAnimation}`}>
        <div className="breadcrumb pt-auto flex ml-2 pb-10 text-sm lg:text-base">
          <ol className="list-none flex text-black text-medium">
            <li>
              <Link to="/my-events" className="hover:underline">
                MyEvents
              </Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link to="/my-events" state={{ activeTab: "Cancelled" }}>
                Canceled
              </Link>
            </li>
          </ol>
        </div>
        <div className="content-box flex flex-col lg:flex-row">
          <div className="PosterEvent w-full lg:w-1/2 h-auto lg:h-1/2">
            <img
              className="w-full h-auto object-cover rounded-2xl shadow-lg"
              src={eventData.foto_event || Poster}
              alt="Poster Event"
            />
          </div>
          <div className="description text-left mt-6 lg:mt-0 lg:mx-8">
            <span className="bg-[#027FFF] font-regular px-4 py-1 lg:px-8 lg:py-1 rounded-full text-white text-[12px] lg:text-[14px]">
              {eventData.category_name}
            </span>
            <h1 className="font-bold text-[20px] lg:text-[32px] py-4 max-w-[40rem]">
              {eventData.judul}
            </h1>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <div className="flex flex-wrap gap-2 ml-2">
              <img src={Calendar} alt="Calendar" className="w-5 lg:w-8" />
              <span className="font-medium text-[14px] lg:text-[16px] mt-1 lg:mt-2">
                {eventData.date}
              </span>
              <span className="font-medium text-[14px] lg:text-[16px] mt-1 lg:mt-2 ml-auto">
                {eventData.start_time} - {eventData.end_time}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 ml-1 my-4">
              <i className="ri-map-pin-2-fill w-5 lg:w-8 text-xl"></i>
              <span className="font-medium text-[14px] lg:text-[16px] mt-1 lg:mt-2">
                {eventData.tempat}
              </span>
              <img src={Chair} alt="Location" className="w-5 lg:w-8 ml-auto" />
              <span className="font-medium text-[14px] lg:text-[16px] mt-1 lg:mt-2">
                {eventData.available_slot} Kursi
              </span>
            </div>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <div className="lecturer flex gap-2 ml-2">
              <img
                src={eventData.foto_pembicara || Lecturer}
                alt="Profile"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
              <div className="lecturername flex flex-col ml-4">
                <span className="font-semibold text-[14px] lg:text-[16px]">
                  {eventData.pembicara}
                </span>
                <span className="text-regular text-[12px] lg:text-[14px]">
                  {eventData.role}
                </span>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <div>
              <p className="eventdescription font-regular text-wrap text-[14px] lg:text-[16px] block w-full lg:max-w-[486px]">
                {eventData.deskripsi}
              </p>
            </div>
          </div>

          <div className="booking lg:w-4/12 h-full mt-8 lg:mt-0 lg:ml-8 px-6 py-6 bg-white shadow-lg rounded-2xl">
            <div className="unique-code-output flex justify-center items-center">
              <div
                className={`relative w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center rounded-full border-4 transition-all duration-1000 ${
                  isCrossVisible
                    ? "bg-red-500 border-red-500"
                    : "bg-transparent border-gray-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-10 h-10 lg:w-16 lg:h-16 transform transition-all duration-1000 ${
                    isCrossVisible
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div className="confirmation-message flex flex-col items-center py-4">
              <span className="font-medium text-[16px] lg:text-[20px]">
                Dibatalkan
              </span>
              <p className="text-[14px] lg:text-[16px] text-center">
                Kamu sudah membatalkan acara ini, segera daftar ulang atau cari
                acara serupa
              </p>
            </div>
            <button
              className="bg-customBlue w-full h-10 lg:h-11 rounded-lg text-[14px] lg:text-[16px] text-white"
              onClick={handleBack}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 -z-10">
        <img src={Ellipse} alt="Background" className="w-40 lg:w-[300px]" />
      </div>
    </div>
  );
};

export default DescriptionPageCancel;
