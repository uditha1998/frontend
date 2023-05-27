import React, { useEffect, useState } from "react";
import { HotelHomeCard } from "../../../components";
import { axiosclient } from "../../../api";
import { useNavigate,Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const [HotelSearch, setHotelSearch] = useState("");

  const navigator = useNavigate();

  // set use state
  const [placeSearch, setSearchName] = useState("");
  const [noRoomsSearch, setSearchRooms] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [noOfPersons, setNoOfPersons] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [error,setError] = useState(false);


  useEffect(() => {
    axiosclient
      .get("/api/hotel/read")
      .then((res) => {
        setHotelSearch(res.data.existingPosts);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const onSearchSubmit = (e) => {
    const newSearchHotel = {
      placeSearch,
      noRoomsSearch,
      checkInDate,
      checkOutDate,
      noOfPersons
    };

    
    /*Validation*/
    console.log(!placeSearch)
    if(!placeSearch){
      setError(true);
      return false;
    }


    navigator("/hotels", { state: { newSearchHotel } });

  };

  return (
    <div className="container w-screen min-h-screen">
      <div className=" h-[60vh] px-2 bg-cover flex items-center bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dxrksxul/image/upload/v1661582033/SLIIT/TravelApp/hotelbookingbackground_qn6vsw.svg')] w-screen">
        <div className="text-white px-24">
          <h1 className="text-6xl dark:text-white font-bold font-primary">
            Find your next stay
          </h1>
          <p className="text-xl dark:text-white  font-primary">
            You can book your accomodation from here...
          </p>
        </div>
      </div>

      <div className="w-screen min-h-screen dark:bg-gray-900">
        <div className="dark:bg-gray-800 flex flex-col gap-3 justify-center rounded-lg px-10 w-2/4 h-48 translate-x-1/2 -translate-y-1/2 bg-white shadow-md">
          <h2 class="font-primary mb-3 text-gray-700 text-4xl text- font-bold text-center dark:text-white ">
            Find Your Next Stay
          </h2>

          <form
            class="flex items-center flex-col gap-2 h-20"
            onSubmit={onSearchSubmit}
          >
            <div className="flex items-center w-full gap-4">
              <div>
              <input
                type="place"
                id="place"
                class={`{shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light input ${
                  error && !placeSearch && "input-error"
                  }}`}
                placeholder="Enter Destination"
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
              />
                   { error && !placeSearch &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Please location</span>
              </p>
            } 
              </div>
              
              
              <div>
              <input
                type="date"
                id="email"
                class={`{shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light input ${
                  error && !checkOutDate && "input-error"
                  }}`}
                placeholder="Check in"
                onChange={(e) => {
                  setCheckOutDate(e.target.value);
                }}
              />
                { error && !checkOutDate &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Please Enter date</span>
              </p>
            }
              </div>
              
              <div>
              <input
                type="text"
                id="email"
                class={`{shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light input ${
                  error && !noOfPersons && "input-error"
                  }}`}
                placeholder="No of Persons"
                onChange={(e) => {
                  setNoOfPersons(e.target.value);
                }}
              />
              { error && !noOfPersons &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Enter no of persons need to stay</span>
              </p>
            }
            </div>
            </div>

            <div className="flex items-center w-full gap-2">
            <div>
              <input
                type="text"
                id="room"
                min={1}
                class={`{w-4/5 flex-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light input ${
                  error && !noRoomsSearch && "input-error"
                  }}`}
                placeholder="No of rooms"
                onChange={(e) => {
                  setSearchRooms(e.target.value);
                }}
              />
              { error && !noRoomsSearch &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Enter no of rooms</span>
              </p>
            }
             </div>

             <div>
             <input
                type="text"
                id="room"
                min={1}
                class={`{w-4/5 flex-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light input ${
                  error && !checkInDate && "input-error"
                  }}`}
                placeholder="No of days want to stay "
                onChange={(e) => {
                  setCheckInDate(e.target.value);
                }}
              />
              { error && !checkInDate &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Enter no of day you need to stay</span>
              </p>
            }
              </div>

              <button
                type="button"
                class="w-1/5 h-10 focus:outline-none text-white bg-orange-500 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
                onClick={() => {
                  onSearchSubmit();
                }}
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Destinations */}

        <div className="dark:bg-gray-900">
          <div className="px-24">
            <h2 class="text-4xl text-gray-900  font-extrabold font-primary dark:text-white">
              Homes guests love
            </h2>
            <p class="font-primary text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              These popular stays have a lot to offer
            </p>
          </div>

          {/* Hotels */}

          <div className="px-24 py-24 sm:grid-cols-1 grid md:grid-cols-3 gap-10">
          {HotelSearch &&
            HotelSearch.map((HotelSearch) => (   
              <Link to={`/hotels/${HotelSearch._id}`}>
                 <HotelHomeCard 
                  nameHotel={HotelSearch.hotelName} 
                  imageHotel={HotelSearch.imgUrl}
                  />
              </Link>
              ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
