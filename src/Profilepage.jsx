import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./assets/Image/Profile.svg";
import Verify from "./assets/image/Verify.svg";
import Ellipse from "./assets/image/Ellipse.svg";
import PopUpDelete from "./components/PopUpDelete.jsx";
import PopUpLogout from "./components/PopUpLogOut.jsx";
import Navbar from "./components/Navbar.jsx";
import "./css/ProfilePagePersonalInfo.css";

const ProfilePagePersonalInfo = () => {
  const [activePage, setActivePage] = useState("info-personal");
  const [user, setUser] = useState(null);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showLogoutPopUp, setShowLogoutPopUp] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  // Periksa autentikasi dan ambil data pengguna
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Anda harus login untuk mengakses halaman ini.");
          navigate("/login");
          return;
        }

        const response = await fetch("https://campushub.web.id/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data pengguna.");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
        alert("Gagal memuat data pengguna. Silakan coba lagi.");
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="profile-page h-screen">
      <Navbar />
      <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-32">
        <div
          className={`container ${showAnimation ? "animate-slide-up" : ""}`}
          style={{
            transition: "transform 0.8s ease-out",
          }}
        >
          <div className="content-box px-4 sm:px-8 md:px-16 py-0">
            <div className="header flex flex-col lg:flex-row justify-between lg:py-10 py-6">
              <div className="text-header flex flex-col">
                <span className="page-title font-semibold text-[24px] lg:text-[32px]">
                  Info Personal
                </span>
                <span className="description text-regular text-[14px] lg:text-[18px]">
                  Anda dapat memperbarui foto profil dan informasi pribadi di sini.
                </span>
              </div>
              <span className="title font-semibold text-[24px] lg:text-[32px] mt-4 lg:mt-0">
                Profil Akun
              </span>
            </div>
            <div className="content flex flex-col sm:flex-row justify-between gap-8">
              <div className="profile flex flex-col lg:flex-row lg:items-start justify-center lg:justify-between lg:w-10/12 py-10">
                <div className="profile-picture w-[120px] lg:w-2/12 mx-auto lg:mx-0 rounded-full">
                  <img
                    src={user?.photo || Profile}
                    alt="Foto Profil"
                    className="w-full rounded-full"
                  />
                </div>

                <div className="form flex flex-col w-full lg:w-10/12 gap-12 mt-6 lg:mt-0">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:w-11/12 pl-0 lg:pl-12">
                    <div className="form-label flex flex-col gap-6 lg:gap-20 w-full lg:w-4/12">
                      <label
                        htmlFor="name"
                        className="font-semibold text-[16px] lg:text-[20px] hidden sm:block"
                      >
                        Nama
                      </label>
                      <label
                        htmlFor="email"
                        className="font-semibold text-[16px] lg:text-[20px] hidden sm:block"
                      >
                        Alamat Email
                      </label>
                      <label
                        htmlFor="phone"
                        className="font-semibold text-[16px] lg:text-[20px] hidden sm:block"
                      >
                        Nomor Telepon
                      </label>
                    </div>
                    <div className="form-input flex flex-col gap-4 lg:gap-16 w-full lg:w-8/12">
                      <div className="flex flex-col sm:flex-col sm:items-start sm:gap-2">
                        <label
                          htmlFor="name"
                          className="sm:block lg:hidden font-semibold text-[16px]"
                        >
                          Nama
                        </label>
                        <div className="input-box p-3 border-2 border-[#027FFF] rounded-lg hover:shadow-lg transition duration-300 px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none">
                          <span>{user ? user.fullname : "Memuat..."}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="flex flex-col sm:flex-col sm:items-start sm:gap-2">
                          <label
                            htmlFor="email"
                            className="sm:block lg:hidden font-semibold text-[16px]"
                          >
                            Alamat Email
                          </label>
                          <div className="input-box p-3 border-2 border-[#027FFF] rounded-lg hover:shadow-lg transition duration-300 px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none">
                            <span>{user ? user.email : "Memuat..."}</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <label
                          htmlFor="phone"
                          className="sm:block lg:hidden font-semibold text-[16px]"
                        >
                          Nomor Telepon
                        </label>
                        <div className="input-box p-3 border-2 border-[#027FFF] rounded-lg hover:shadow-lg transition duration-300 px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none">
                          <span>{user ? user.nomor_telepon : "Memuat..."}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="action-list flex flex-col lg:text-right text-center gap-6 lg:gap-11">
                <ul className="flex flex-col gap-4 lg:gap-11">
                  <li>
                    <Link
                      to="/profile-info"
                      className={`font-regular text-lg ${
                        activePage === "info-personal" ? "font-semibold underline" : ""
                      } hover:underline`}
                      onClick={() => handlePageChange("info-personal")}
                    >
                      Info Personal
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/password"
                      className={`font-regular text-lg ${
                        activePage === "password" ? "font-semibold underline" : ""
                      } hover:underline`}
                      onClick={() => handlePageChange("password")}
                    >
                      Password
                    </Link>
                  </li>
                  <li>
                    <button
                      className={`font-regular text-lg ${
                        activePage === "delete-account" ? "font-semibold underline" : ""
                      } hover:underline`}
                      onClick={() => setShowDeletePopUp(true)}
                    >
                      Hapus Akun
                    </button>
                  </li>
                  <li>
                    <button
                      className={`font-regular text-lg ${
                        activePage === "logout" ? "font-semibold underline" : ""
                      } hover:underline`}
                      onClick={() => setShowLogoutPopUp(true)}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0">
          <img src={Ellipse} alt="Background" />
        </div>
        {showDeletePopUp && <PopUpDelete setShowPopUp={setShowDeletePopUp} />}
        {showLogoutPopUp && <PopUpLogout setShowPopUp={setShowLogoutPopUp} />}
      </div>
    </div>
  );
};

export default ProfilePagePersonalInfo;
