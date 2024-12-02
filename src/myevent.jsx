import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Menu from "../src/assets/Image/menu.svg";
import "./css/MyEvents.css";

const MyEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  
  const events = [
    {
      id: 1,
      title: "React Workshop",
      date: "2024-12-05",
      image: "https://via.placeholder.com/150",
      status: "Registered",
    },
    {
      id: 2,
      title: "Node.js Seminar",
      date: "2024-11-30",
      image: "https://via.placeholder.com/150",
      status: "Canceled",
    },
    {
      id: 3,
      title: "JavaScript Bootcamp",
      date: "2024-12-10",
      image: "https://via.placeholder.com/150",
      status: "Registered",
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((event) => (statusFilter === "All" ? true : event.status === statusFilter));

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const allCount = events.length;
  const registeredCount = events.filter((event) => event.status === "Registered").length;
  const canceledCount = events.filter((event) => event.status === "Canceled").length;

  return (
    <div className="myevents py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="content-box flex flex-col">
          <div className="page-features flex flex-wrap justify-between px-4 sm:px-6 lg:px-20 pt-16">
            <h1 className="text-3xl font-bold">MyEvents</h1>
            <div className="features flex flex-wrap gap-4 items-center mt-4 lg:mt-0 w-full sm:w-auto">
              <div className="search flex-1 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl px-4 py-2 border border-gray-300 rounded-lg flex items-center">
                <input
                  type="text"
                  placeholder="Cari acara..."
                  className="focus:outline-none w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn ml-2">
                  <i className="ri-search-line"></i>
                </button>
              </div>
              <div className="sort relative sm:max-w-[200px] lg:max-w-[150px]" ref={dropdownRef}>
                <div
                  className="dropdown-select flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <span className="text-sm sm:text-base">{sortOption === "date" ? "By date" : "A-Z"}</span>
                  <img src={Menu} alt="menu" className="dropdown-icon" />
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-menu absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-full">
                    <ul>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSortChange("date")}
                      >
                        By date
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSortChange("title")}
                      >
                        A-Z
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="event-status flex flex-wrap gap-8 sm:gap-12 lg:gap-16 py-4">
            <ul className="flex gap-8 sm:gap-12 lg:gap-16 w-full text-sm sm:text-base justify-center lg:justify-start lg:px-20">
              <li
                className={`cursor-pointer ${statusFilter === "All" ? "font-bold underline" : ""}`}
                onClick={() => handleStatusFilter("All")}
              >
                All ({allCount})
              </li>
              <li
                className={`cursor-pointer ${statusFilter === "Registered" ? "font-bold underline" : ""}`}
                onClick={() => handleStatusFilter("Registered")}
              >
                Registered ({registeredCount})
              </li>
              <li
                className={`cursor-pointer ${statusFilter === "Canceled" ? "font-bold underline" : ""}`}
                onClick={() => handleStatusFilter("Canceled")}
              >
                Canceled ({canceledCount})
              </li>
            </ul>
          </div>

          <div className="event-list flex flex-col gap-6 px-4 sm:px-6 lg:px-20 py-2">
            {sortedEvents.length > 0 ? (
              sortedEvents.map((event) => (
                <div
                  key={event.id}
                  className="event-box p-4 border border-customBlue rounded-2xl shadow-md hover:shadow-lg transition duration-300 px-4 py-2 flex justify-between items-center"
                  onClick={() => navigate("/myeventsregister")}
                >
                  <div className="event-data flex items-center">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-20 h-20 object-cover rounded-full my-2"
                    />
                    <div className="event-details flex flex-col px-4">
                      <span className="event-title block font-semibold text-lg mb-2">
                        {event.title}
                      </span>
                      <span className="event-date text-sm text-gray-500 mb-1 block">
                        Join date: {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Link to="/description-registered">
                    <i className="ri-more-fill text-4xl"></i>
                  </Link>
                </div>
              ))
            ) : (
              <div>No events found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
