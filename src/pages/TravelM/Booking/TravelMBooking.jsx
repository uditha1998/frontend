import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { axiosclient } from "../../../api";
import { FlightCard } from "../../../components";

const TravelMBooking = () => {
  const { destination, destinationId } = useParams();

  const [destinationName, setDestinationname] = useState("");
  const [date, setDate] = useState("");
  const [travelM, setTravelMs] = useState([]);
  const location = useLocation();

  const [searchedtravelM, setSearchedTravelMs] = useState([]);

  useEffect(() => {
    setDestinationname(destination);
  }, [destination]);

  useEffect(() => {
    axiosclient
      .get(`/api/destinations/${destinationId}`)
      .then((res) => {
        axiosclient
          .get(
            `/api/flights/get/${res.data.destination.iataCode.toLowerCase()}`
          )
          .then((res) => {
            setTravelMs(res.data.destinations);
            setSearchedTravelMs(res.data.destinations);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [destinationId]);

  const search = () => {
    setSearchedTravelMs(
      destinationName === ""
        ? travelM
        : travelM.filter(
            (flight) =>
              flight.from.toLowerCase().startsWith(destinationName) &&
              flight.fromDate === date
          )
    );
  };

  return (
    <div className="w-screen overflow-x-hidden min-h-screen dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center !overflow-x-hidden px-2 bg-cover h-[60vh] bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dxrksxul/image/upload/v1683450501/SLIIT/TravelApp/sri-lanka-photos-0251_ojwd97.jpg')]">
        <div className="w-2/5 flex flex-col gap-3">
          <input
            type="email"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter Destination"
            value={destinationName}
            onChange={(e) => {
              setDestinationname(e.target.value);
            }}
          />

          <div className="flex items-center gap-2">
            <input
              type="date"
              id="datepicker"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter Date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />

            <button
              onClick={search}
              type="button"
              class="h-10 focus:outline-none text-white bg-orange-500 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center gap-10 py-5 w-full overflow-x-hidden px-2 bg-cover h-[10vh] bg-no-repeat bg-center bg-[#D9D9D9] dark:bg-navbar-background-dark">
        <img
          src="https://res.cloudinary.com/dxrksxul/image/upload/v1661526705/SLIIT/TravelApp/American_Airlines_logo_1_zode5o.svg"
          alt="American Airlines Logo"
          className="w-36"
        />
        <img
          src="https://res.cloudinary.com/dxrksxul/image/upload/v1661526705/SLIIT/TravelApp/Tignerair_xfmp96.svg"
          alt="American Airlines Logo"
          className="w-20"
        />
        <img
          src="https://res.cloudinary.com/dxrksxul/image/upload/v1661526705/SLIIT/TravelApp/westjet_z3tkzw.svg"
          alt="American Airlines Logo"
          className="w-36"
        />
        <img
          src="https://res.cloudinary.com/dxrksxul/image/upload/v1661526705/SLIIT/TravelApp/vietnam-airlines-logo_1_uhzikn.svg"
          alt="American Airlines Logo"
          className="w-36"
        />
        <img
          src="https://res.cloudinary.com/dxrksxul/image/upload/v1661526705/SLIIT/TravelApp/Air_New_Zealand_logo_1_t5ju1g.svg"
          alt="American Airlines Logo"
          className="w-36"
        />
      </div> */}

      <div className="px-24">
        <div className="my-10">
          <h2 class="text-4xl text-gray-900  font-extrabold font-primary dark:text-white">
            Travel Options
          </h2>
          <p class="font-primary text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Select the option you need
          </p>
        </div>
        <div className="flex flex-col gap-5 my-5">
          {searchedtravelM.map((f) => (
            <FlightCard
              key={uuid()}
              travelMeth={f.travelMeth}
              from={f.from}
              to={f.to}
              price={f.price}
              fromDate={f.fromDate}
              toDate={f.toDate}
              toTime={f.toTime}
              fromTime={f.fromTime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelMBooking;
