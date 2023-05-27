import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosclient } from "../../../api";
import { HotelsCard } from "../../../components";

const Hotels = () => {
  const location = useLocation();
  // const [HotelSearch, setHotelSearch] = useState([]);

  // useEffect(() => {
  //   axiosclient
  //     .get("/api/hotel/read")
  //     .then((res) => {
  //       setHotelSearch(res.data.existingPosts);
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // }, []);

  console.log(location);
  const [placeNewSearch, setSearchName] = useState(
    location.state.newSearchHotel.placeSearch
  );
  const [noRoomsNewSearch, setSearchRooms] = useState(
    location.state.newSearchHotel.noRoomsSearch
  );
  const [noPersonNewSearch, setSearchPerson] = useState(
    location.state.newSearchHotel.noOfPersons
  );
  const [checkInNewDate, setCheckInDate] = useState(
    location.state.newSearchHotel.checkInDate
  );
  const [checkOutNewDate, setCheckOutDate] = useState(
    location.state.newSearchHotel.checkOutDate
  );


  return (
    <div className="w-screen overflow-x-hidden min-h-screen dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center !overflow-x-hidden px-2 bg-cover h-[60vh] bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dxrksxul/image/upload/v1661608608/SLIIT/TravelApp/pexels-pixabay-258154_x0pen8.webp')]">
        <form class="flex w-2/5 items-center flex-col gap-1 h-20">
          <div className="flex items-center w-full gap-1">
            <input
              type="text"
              id="placeNewSearch"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              value={placeNewSearch}
              
            />

            <input
              type="text"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              value={checkOutNewDate}
              required
            />

            <input
              type="text"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              value={noPersonNewSearch}
            />
          </div>
          <div className="flex items-center w-full gap-1">
            <input
              type="text"
              id="email"
              class="w-4/5 flex-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              value={noRoomsNewSearch}
            />
              <input
              type="text"
              id="email"
              class="w-4/5 flex-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              value={checkInNewDate}
            />

            <button
              type="button"
              class="w-1/5 h-10 focus:outline-none text-white bg-orange-500 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center gap-10 py-5 w-full overflow-x-hidden px-2 bg-cover h-[10vh] bg-no-repeat bg-center bg-[#D9D9D9] dark:bg-navbar-background-dark">
        <img
          src="https://i.ibb.co/yyFdDPS/990b56ba19c6b3b43a13cea1a71e5811-hotel-logo-hotels-removebg-preview.png"
          alt="American Airlines Logo"
          className="w-36"
        />
        <img
          src="https://i.ibb.co/ZgbD1QT/download-removebg-preview.png"
          alt="American Airlines Logo"
          className="w-20"
        />
        <img
          src="https://i.ibb.co/J5C9TSD/images-removebg-preview-1.png"
          alt="American Airlines Logo"
          className="w-36"
        />
        <img
          src="https://i.ibb.co/K0hBv6c/images-removebg-preview.png"
          alt="American Airlines Logo"
          className="w-36"
        />
        <img
          src="https://i.ibb.co/HHkP3Z1/images-1-removebg-preview.png"
          alt="American Airlines Logo"
          className="w-36"
        />
      </div>

      <div className="px-24">
        <div className="my-10">
          <h2 class="text-4xl text-gray-900  font-extrabold font-primary dark:text-white">
            Hotels and Stays
          </h2>
          <p class="font-primary text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Hotels in London
          </p>
        </div>
        <div className="flex flex-col gap-5 my-5">
          <HotelsCard
            placeNewSearch={placeNewSearch}
            noRoomsNewSearch={noRoomsNewSearch}
            checkInDate={checkInNewDate}
            noOfPersons={noPersonNewSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Hotels;
