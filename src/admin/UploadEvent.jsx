import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import upload from "../assets/image/adminimage/upload.svg";
import Navbar from "../components/Navbar";

function Uploadevent() {
  const [step, setStep] = useState(1); // Step of the form (1 or 2)
  const [file, setFile] = useState();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [speaker, setSpeaker] = useState("");
  const [role, setRole] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [venue, setVenue] = useState("");
  const navigate = useNavigate();

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const fileUrl = URL.createObjectURL(droppedFile);
      setFile(fileUrl);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const getFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const isFormValid = () => {
    return file && category && title && date && time && description;
  };

  const isSecondStepValid = () => {
    return speaker && role && ticketCount && (!isOffline || venue);
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const handlePreview = () => {
    navigate("/events/preview", {
      state: {
        file,
        category,
        title,
        date,
        time,
        description,
        speaker,
        role,
        ticketCount,
        isOffline,
        venue,
      },
    });
  };

  return (
    <div className="font-sans flex flex-col box-border mx-auto w-full relative bg-white">
      <Navbar />

      <div className="p-5">
        <div className="flex flex-col px-[62px]  pt-10">
          <div className="flex gap-x-[7px] text-[20px] mb-4 text-black">
            <Link>
              <p>Home</p>
            </Link>
            <p> &gt; </p>
            <Link>
              <p>Upload Event</p>
            </Link>
            <p> &gt; </p>
            <Link>
              <p>Detail Event</p>
            </Link>
          </div>

          <div className="mb-8 W-[750px]">
            <h1 className="font-semibold text-[38px] text-[#003266]">
              {step === 1 ? "Masukkan Acara Anda" : "Detail Acara"}
            </h1>
            <p className="font-light text-[20px] text-[#003266]">
              Isi kelengkapan acara Anda sebagai penyelenggara.
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row justify-between px-[62px] pb-16 gap-12">
          <div className="flex flex-col w-auto">
            <div
              className="border-dashed border-2 h-[30rem] border-[#003266] xl:w-[36rem] sm:w-full flex flex-col items-center justify-center text-[#003266] relative overflow-hidden"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <label
                htmlFor="file-upload"
                className="items-center justify-center flex flex-col cursor-pointer text-[#003266] text-[18px] font-light gap-y-[28px] h-full w-full"
              >
                {file ? (
                  <img
                    src={file}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <>
                    <img src={upload} alt="Upload" />
                    <div>
                      Drag and drop your file here or{" "}
                      <span className="underline">Select a file</span>
                    </div>
                  </>
                )}
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                className="hidden"
                onChange={getFile}
              />
            </div>
            <div className="flex justify-between max-w-[40rem]">
              <p className="text-[12px] mt-2">
                Supported format: PNG, JPG, PDF
              </p>
              <p className="text-[12px] mt-2">Ukuran maksimum: 25MB</p>
            </div>
          </div>

          <div className="w-max max-h-screen">
            <form className="flex flex-col gap-6 w-max">
              {step === 1 ? (
                <>
                  <div className="flex justify-between gap-x-[20px] items-center w-full">
                    <p className="text-[20px] font-semibold text-[#003266]">
                      Kategori
                    </p>
                    <select
                      className="border border-[#027FFF]  w-[54rem] rounded-lg p-3 xl:m-0 ml-[33px]"
                      style={{
                        color: category ? "black" : "#BFBFBF",
                      }}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Pilih kategori
                      </option>
                      <option value="1">Webinar</option>
                      <option value="2">Seminar</option>
                      <option value="3">Kuliah Tamu</option>
                      <option value="4">Workshop</option>
                      <option value="5">Sertifikasi</option>
                    </select>
                  </div>

                  <div className="flex justify-between gap-x-[20px] items-center">
                    <p className="text-[20px] font-semibold text-[#003266]">
                      Judul
                    </p>
                    <input
                      type="text"
                      placeholder="Masukkan judul acara"
                      className="border border-[#027FFF] rounded-lg p-3 w-[54rem]"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-[20px] ">
                    <div className="flex items-center w-full gap-x-[26px] ">
                      <p className="text-[20px] font-semibold text-[#003266]">
                        Tanggal
                      </p>
                      <input
                        type="date"
                        className="border border-[#027FFF] rounded-lg p-3 w-full  xl:m-0 ml-[30px]"
                        style={{
                          color: date ? "black" : "#BFBFBF",
                        }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex items-center  mt-6 gap-x-[20px]  lg:mt-0 w-full">
                      <p className="text-[20px] font-semibold text-[#003266]">
                        Pukul
                      </p>
                      <input
                        type="time"
                        className="border border-[#027FFF] rounded-lg p-3 w-full lg:m-0 ml-[64px]"
                        style={{
                          color: time ? "black" : "#BFBFBF",
                        }}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-between w-full gap-x-[20px] h-[13rem]">
                    <p className="text-[20px] font-semibold text-[#003266]">
                      Deskripsi
                    </p>
                    <textarea
                      placeholder="Tulis deskripsi di sini..."
                      rows="5"
                      className="border border-[#027FFF] rounded-lg p-3 w-[54rem]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-[20px] ">
                    <div className="flex items-center w-full gap-x-[2.4rem]">
                      <p className="text-[20px] font-semibold text-[#003266] ">
                        Pembicara
                      </p>
                      <input
                        type="text"
                        className="border border-[#027FFF] rounded-lg p-3 w-full xl:m-0 ml-[30px]"
                        value={speaker}
                        placeholder="Masukkan nama pembicara"
                        onChange={(e) => setSpeaker(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center mt-6 gap-x-[20px] lg:mt-0 w-full">
                      <p className="text-[20px] font-semibold text-[#003266]">
                        Role
                      </p>
                      <input
                        type="text"
                        placeholder="Masukkan pekerjaan pembicara"
                        className="border border-[#027FFF] rounded-lg p-3 w-full lg:m-0 ml-[64px]"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-x-[20px] items-center">
                    <p className="text-[20px] font-semibold text-[#003266]">
                      Jumlah Tiket
                    </p>
                    <input
                      type="text"
                      placeholder="Masukkan jumlah tiket"
                      className="border border-[#027FFF] rounded-lg p-3 w-[54rem]"
                      value={ticketCount}
                      onChange={(e) => setTicketCount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center mt-6 gap-x-[20px] lg:mt-0 w-full">
                    <p className="text-[20px] font-semibold text-[#003266]">
                      Online
                    </p>
                    <div className="flex items-center gap-x-[10px]">
                      <input
                        type="radio"
                        id="online"
                        name="eventType"
                        value="online"
                        checked={!isOffline}
                        onChange={() => setIsOffline(false)}
                        className="appearance-none w-6 h-6 border-2 border-[#003266] rounded-md checked:bg-[#003266] checked:border-[#003266] checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:font-bold checked:after:text-center"
                      />
                    </div>
                    <p className="text-[20px] font-semibold text-[#003266]">
                      Offline
                    </p>
                    <div className="flex items-center gap-x-[10px]">
                      <input
                        type="radio"
                        id="offline"
                        name="eventType"
                        value="offline"
                        checked={isOffline}
                        onChange={() => setIsOffline(true)}
                        className="appearance-none w-6 h-6 border-2 border-[#003266] rounded-md checked:bg-[#003266] checked:border-[#003266] checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:font-bold checked:after:text-center"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    {isOffline && (
                      <div className="flex justify-between gap-x-[20px] items-center">
                        <p className="text-[20px] font-semibold text-[#003266]">
                          Tempat
                        </p>
                        <input
                          type="text"
                          placeholder="Isi Alamat"
                          className="border border-[#027FFF] rounded-lg p-3 w-[54rem]"
                          value={venue}
                          onChange={(e) => setVenue(e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              <div
                className={`flex gap-[30px] justify-end ${
                  isOffline ? "mt-[12rem]" : "mt-[15.15rem]"
                }`}
              >
                <button
                  type="button"
                  className="w-full border-[#027FFF] border-2 text-[#003266] text-[20px] max-w-[279px] h-[46px] rounded-lg"
                  onClick={step === 1 ? () => navigate("/") : handleBack} // Step 1: No action, Step 2: Go back
                >
                  {step === 1 ? "Batal" : "Kembali"}
                </button>
                <button
                  type="button"
                  className={`w-full text-[20px] h-[46px] max-w-[279px] text-white rounded-lg ${
                    (step === 1 && isFormValid()) ||
                    (step === 2 && isSecondStepValid())
                      ? "bg-[#027FFF]"
                      : "bg-[#A2A2A2]"
                  }`}
                  onClick={step === 1 ? handleNext : handlePreview} // Step 1: Next, Step 2: Preview
                  disabled={
                    (step === 1 && !isFormValid()) ||
                    (step === 2 && !isSecondStepValid())
                  }
                >
                  {step === 1 ? "Lanjut" : "Preview"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uploadevent;
