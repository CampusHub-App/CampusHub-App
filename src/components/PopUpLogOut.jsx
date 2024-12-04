import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopUpLogout = ({ setShowPopUp }) => {
  const bookingRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    setIsVisible(true);

    const handleClickOutside = (event) => {
      if (bookingRef.current && !bookingRef.current.contains(event.target)) {
        triggerClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const triggerClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowPopUp(false);
    }, 600);
  };

  const handleLogout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("https://campushub.web.id/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Logout gagal: ${response.statusText}`);
      }

      localStorage.removeItem("token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("user");

      navigate("/");
    } catch (error) {
      console.error("Error saat logout:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all ${
        isExiting
          ? "opacity-0 duration-700"
          : isVisible
          ? "opacity-100 duration-700"
          : "opacity-0"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black transition-all ${
          isExiting
            ? "opacity-0 duration-700"
            : isVisible
            ? "opacity-30 duration-700"
            : "opacity-0"
        }`}
      ></div>

      <div
        ref={bookingRef}
        className={`relative booking w-[428px] h-[453px] px-6 py-6 mx-8 bg-white shadow-lg rounded-2xl flex flex-col justify-center gap-4 transition-all ${
          isExiting
            ? "opacity-0 scale-90 duration-700"
            : isVisible
            ? "opacity-100 scale-100 duration-700"
            : "opacity-0 scale-50 duration-700"
        }`}
      >
        <div className="confirmation-message flex flex-col items-center">
          <span className="font-medium text-[32px] text-center px-12 py-2">
            Apakah kamu yakin?
          </span>
          <p className="font-regular text-[20px] text-center px-10 py-2">
            Kamu akan logout dari akun ini, klik kembali jika tidak ingin
            logout.
          </p>
        </div>
        <div className="myevent-button flex flex-col py-2">
          <button
            onClick={triggerClose}
            className="bg-[#027FFF] font-regular w-full h-11 my-2 rounded-lg font-medium text-white text-[20px] shadow-md hover:shadow-lg transition duration-300"
          >
            Kembali
          </button>
          <button
            onClick={handleLogout}
            disabled={isProcessing}
            className={`bg-transparent border-2 ${
              isProcessing
                ? "border-gray-400 text-gray-400"
                : "border-[#027FFF] text-black"
            } font-medium w-full h-11 my-2 rounded-lg text-[20px] hover:bg-red-300 hover:border-red-500`}
          >
            {isProcessing ? "Memproses..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpLogout;
