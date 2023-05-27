import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import BgVideo from '../../../components/videos/bgVideo.mp4';

import { axiosclient } from "../../../api";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchedDestinations, setSearchedDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosclient
      .get("/api/destinations")
      .then((res) => {
        setDestinations(res.data.destinations);
        setSearchedDestinations(res.data.destinations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDestinationClick = (destination) => {
    navigate(`/destinations/${destination}`);
  };

  const search = () => {
    setSearchedDestinations(
      destinations.filter((destination) =>
        destination.destinationName.toLowerCase().startsWith(searchString)
      )
    );
  };
  

  return (
    <div className="container w-screen min-h-screen">
      <div className="px-2 bg-cover flex items-center bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dkxt3vacv/image/upload/v1685132595/bg_iubqwo.jpg')] w-screen min-h-screen">
        <div className="text-white px-24">
          <h1 className="text-5xl font-bold font-primary">
          Sri Lanka Explore
          </h1>
          <p className="text-xl font-primary">
          Tours | Travel | Guide
          </p>
        </div>
      </div>

      <div className="w-screen min-h-screen dark:bg-gray-900">
        <div className="dark:bg-gray-800 flex flex-col gap-3 justify-center rounded-lg px-10 w-2/4 h-40 translate-x-1/2 -translate-y-1/2 bg-white shadow-md">
          <h2 class="font-primary mb-3 text-gray-700 text-4xl text- font-bold text-center dark:text-white ">
            Destination: Enter. Explore.
          </h2>

          <form class="flex items-center gap-2 h-10">
            <input
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter Destination"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />

            <button
              onClick={search}
              type="button"
              class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Search
            </button>
          </form>
        </div>

        {/* Destinations */}

        <div className="dark:bg-gray-900">
          <div className="px-24">
            <h2 class="text-4xl text-gray-900  font-extrabold font-primary dark:text-white">
              Destinations in Sri Lanka
            </h2>
            <p class="font-primary text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              40 Years, 450 Branches, One Destination - Sri Lanka.
              <mark class="px-2 text-white bg-blue-900 rounded dark:bg-blue-900 ">
              Sri Lanka Explore
              </mark>
              is the Sri Lanka's largest independent travel agent.
            </p>
          </div>

          {/* Destinations */}

          <div className="px-24 py-24 sm:grid-cols-1 grid md:grid-cols-2 gap-10">
            {searchedDestinations.map((destination) => (
              <figure
                key={uuid()}
                onClick={() => onDestinationClick(destination._id)}
                class="shadow-xl dark:shadow-gray-800 relative max-w-full h-auto transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
              >
                <img
                  class="rounded-lg w-full h-full object-cover"
                  src={destination.image}
                  alt="Sri Lanka Explore Destination"
                />

                <h3 className="absolute bottom-6 px-4 sm:text-large md:text-5xl text-white  font-extrabold   dark:text-white">
                  {destination.destinationName}
                </h3>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
