import React from "react";
import date from "../assets/Image/date.svg";

const Card = ({ children, onClick }) => {
  return (
    <div
      className="border-2 rounded-[20px] bg-white max-w-[420px] text-[#003266] shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="p-[24px] gap-y-[12px] flex flex-col">
        {children}
      </div>
    </div>
  );
};

const Body = ({ children, title }) => {
  return (
    <div className="w-full max-w-[369px] ">
      <h1 className="font-semibold text-[26px]">{title}...</h1>
      <p className="text-[16px] font-normal">{children}</p>
    </div>
  );
};

const Kategori = ({ kategori }) => {
  return (
    <div className="flex gap-x-[4px] text-white">
      <p className="border bg-[#027FFF] rounded-[20px] p-[4px] w-[122px] text-[14px] justify-center flex">
        {kategori}
      </p>
    </div>
  );
};

const Image = ({ image }) => {
  return (
    <img src={image} alt="" className="w-[372px] h-[232px]" />
  );
};

const Tanggal = ({ children }) => {
  return (
    <div className="flex gap-x-[12px]">
      <img src={date} alt="" />
      <p className="text-[16px] font-normal">{children}</p>
    </div>
  );
};

const Creator = ({ image, nama, title }) => {
  return (
    <div className="flex gap-x-[16px]">
      <img src={image} alt="" className="w-full max-w-[40px]" />
      <div>
        <p className="font-medium text-[16px]">{nama}</p>
        <p className="font-normal text-[14px]">{title}</p>
      </div>
    </div>
  );
};

Card.Body = Body;
Card.Creator = Creator;
Card.Image = Image;
Card.Tanggal = Tanggal;
Card.Kategori = Kategori;

export default Card;
