import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosclient } from "../../../api";
// import { Link } from "react-router-dom";
import { PackageCard } from "../../../components";

const PackagesSearch = () => {
  const { destination } = useParams();
  const [tours, setTours] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    axiosclient
      .get(`/api/tour/filter/${destination}`)
      .then((res) => {
        setTours(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [destination]);

  const onSearch = () => {
    if (searchString === "") {
      axiosclient
        .get(`/api/tour/filter/${destination}`)
        .then((res) => {
          setTours(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosclient
        .get(`/api/tour/filter/${searchString}`)
        .then((res) => {
          setTours(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="w-screen overflow-x-hidden min-h-screen dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center !overflow-x-hidden px-2 bg-cover h-[60vh] bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dxrksxul/image/upload/v1661526398/SLIIT/TravelApp/zurich-switzerland_1_nxhu2l.svg')]">
        <div className="w-2/5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              value={searchString}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              type="text"
              id="datepicker"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter Destination"
            />

            <button
              onClick={onSearch}
              type="button"
              class="h-10 focus:outline-none text-white bg-orange-500 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="px-24">
        <div className="flex flex-col gap-5 my-5">
          {tours &&
            tours.map((tour, i) => (
              <PackageCard
                id={tour._id}
                key={i}
                name={tour.name}
                night={tour.night}
                day={tour.day}
                price={tour.price}
                image={tour.url}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesSearch;
