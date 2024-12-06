import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Ellipse from "../assets/image/Ellipse.svg";
import Ellipse2 from "../assets/image/Ellipse2.svg";
import "../css/KodeUnik.css";
import { useParams } from "react-router-dom";

const KodeUnik = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigation = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      navigate(`/my-events/${id}/participants`);
    }, 1000);
  };

  const handleCheckIn = async () => {
    const response = await fetch(
      `https://campushub.web.id/api/my-events/${id}/check-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          kode: code.join(""),
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Check in success:", data);
      navigate(`/my-events/${id}/participants`);
    } else {
      console.error("Check in failed:", data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/welcome", { replace: true });
      return;
    }

    document.getElementById(`input-0`).focus();
  }, []);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const newCode = [...code];

    if (value.match(/^[a-zA-Z0-9]$/)) {
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleBackspace = (e, index) => {
    const newCode = [...code];
    if (e.key === "Backspace") {
      newCode[index] = "";
      setCode(newCode);

      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
    } else if (e.key === "ArrowRight") {
      if (index < code.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    } else if (e.key === "Delete") {
      newCode[index] = "";
      setCode(newCode);

      if (index < code.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    } else if (/^[a-zA-Z0-9]$/.test(e.key)) {
      if (code[index] !== "") {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="unique-code h-screen mx-4 sm:mx-12 lg:mx-20 flex items-center justify-center">
      <div
        className={`container w-full sm:w-3/4 lg:w-1/2 h-auto sm:h-11/12 py-6 bg-white shadow-lg rounded-2xl flex flex-col items-center ${fadeClass}`}
      >
        <div className="content-box flex flex-col items-center py-8 px-6 sm:px-14">
          <h1 className="font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-center py-2">
            Masukkan Kode Tiket
          </h1>
          <p className="font-regular text-[14px] sm:text-[16px] lg:text-[16px] text-center py-4 sm:py-8">
            Masukkan kode unik sebagai bukti pemesanan tiket peserta. Perhatikan
            kode dengan baik dan daftarkan peserta terdaftar dalam acara Anda.
          </p>

          <div className="unique-code bg-[#027FFF] w-full sm:w-11/12 lg:w-8/12 h-full flex flex-col mb-4 items-center px-2 sm:px-12 py-4 sm:py-6 rounded-xl mx-auto">
            <form className="unique-code-output grid grid-cols-4 gap-4 sm:gap-6 px-4">
              {code.map((char, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  type="text"
                  maxLength={1}
                  value={char}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-14 sm:w-16 lg:w-20 h-16 sm:h-20 lg:h-24 text-center text-[24px] sm:text-[32px] lg:text-2xl font-bold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </form>
          </div>

          <div className="border-t-2 border-[#003266] w-10/12 my-6 sm:my-12"></div>
          <button
            className="bg-[#027FFF] border-2 border-white font-regular w-3/4 sm:w-1/2 lg:w-1/2 h-10 sm:h-11 my-1 sm:my-2 rounded-lg text-medium text-white text-[14px] sm:text-[16px]"
            onClick={handleCheckIn}
          >
            Check In
          </button>
          <button
            className="bg-transparent border-2 border-[#027FFF] font-regular w-3/4 sm:w-1/2 lg:w-1/2 h-10 sm:h-11 my-1 sm:my-2 rounded-lg text-medium text-black text-[14px] sm:text-[16px]"
            onClick={handleNavigation}
          >
            Kembali
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 -z-10">
        <img
          src={Ellipse}
          alt="Background"
          className="w-[200px] sm:w-[50px] lg:w-[300px]"
        />
      </div>
      <div className="fixed bottom-0 right-0 -z-10">
        <img
          src={Ellipse2}
          alt="Background"
          className="w-[200px] sm:w-[50px] lg:w-[300px]"
        />
      </div>
    </div>
  );
};

export default KodeUnik;
