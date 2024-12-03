import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Menu from "../src/assets/Image/menu.svg";
import "./css/MyEvents.css";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login...");
        navigate("/user/login");
        return;
      }

      try {
        const response = await fetch(
          "https://campushub.web.id/api/my-events/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events:", response.status);
          if (response.status === 401) {
            // Token tidak valid atau sudah kadaluarsa
            localStorage.removeItem("token");
            navigate("/user/login");
          }
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [navigate]);

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
      event.judul.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((event) =>
      statusFilter === "All"
        ? true
        : event.status.toLowerCase() === statusFilter.toLowerCase()
    );

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(a.join_date) - new Date(b.join_date);
    } else if (sortOption === "title") {
      return a.judul.localeCompare(b.judul);
    }
    return 0;
  });

  const allCount = events.length;
  const registeredCount = events.filter(
    (event) => event.status.toLowerCase() === "registered"
  ).length;
  const canceledCount = events.filter(
    (event) => event.status.toLowerCase() === "cancelled"
  ).length;

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
              </div>
              <div
                className="sort relative sm:max-w-[200px] lg:max-w-[150px]"
                ref={dropdownRef}
              >
                <div
                  className="dropdown-select flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <span className="text-sm sm:text-base">
                    {sortOption === "date" ? "By date" : "A-Z"}
                  </span>
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
                className={`cursor-pointer ${
                  statusFilter === "All" ? "font-bold underline" : ""
                }`}
                onClick={() => handleStatusFilter("All")}
              >
                All ({allCount})
              </li>
              <li
                className={`cursor-pointer ${
                  statusFilter === "Registered" ? "font-bold underline" : ""
                }`}
                onClick={() => handleStatusFilter("Registered")}
              >
                Registered ({registeredCount})
              </li>
              <li
                className={`cursor-pointer ${
                  statusFilter === "Canceled" ? "font-bold underline" : ""
                }`}
                onClick={() => handleStatusFilter("Cancelled")}
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
                  className="event-box p-4 border border-[#027FFF] rounded-2xl shadow-md hover:shadow-lg transition duration-300 px-4 py-2 flex justify-between items-center"
                  onClick={() => {
                    // Cek status event, jika 'cancelled' arahkan ke halaman cancel
                    if (event.status.toLowerCase() === "cancelled") {
                      navigate(`/${event.id}/cancel`);
                    } else {
                      // Jika event belum dibatalkan, arahkan ke halaman register
                      navigate(`/myeventsregister/${event.id}`);
                    }
                  }}
                >
                  <div className="event-data flex items-center">
                    <img
                      src={event.foto_event}
                      alt={event.judul}
                      className="w-20 h-20 object-cover rounded-full my-2"
                    />
                    <div className="event-details flex flex-col px-4">
                      <span className="event-title block font-semibold text-lg mb-2">
                        {event.judul}
                      </span>
                      <span className="event-date text-sm text-gray-500 mb-1 block">
                        Join date:{" "}
                        {new Date(event.join_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Link to={`/myeventsregister/${event.id}`}>
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
