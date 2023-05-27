import React, { useEffect } from "react";
import { CarCard } from "../../../components";
import { useState } from "react";
import { axiosclient} from "../../../api";
import { Link } from "react-router-dom"; 

const CarsList = () => {

    const[vehicles,Setvehicles] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [searchedVehicles, setSearchedVehicles] = useState([]);
  
  useEffect(() => {
  axiosclient.get('/api/vehicles/get').then((res) =>{
    Setvehicles(res.data.existingPosts);
    setSearchedVehicles(res.data.existingPosts);
  });
  },[])

  const search = () => {
    setSearchedVehicles(
      vehicles.filter((vehicle) =>
        vehicle.type.toLowerCase().startsWith(searchString.toLowerCase())
      )
    );
  };

  return (
    <div className="container w-screen min-h-screen">
      <div className="px-2 bg-cover flex items-center bg-no-repeat bg-center bg-[url('https://abrokenbackpack.com/wp-content/uploads/2021/06/advantages-and-disadvantages-of-travelling-by-car.jpg')] w-screen h-[60vh]">
        <div className="text-white px-24">
          <h1 className="text-6xl dark:text-white font-bold font-primary">
          Best Auto Rental Prices
          </h1>
          <p className="text-xl dark:text-white  font-primary">
          Practical and Convenient Auto Hire, As Low As  15 / day
          </p>
        </div>
      </div>

      <div className="w-screen min-h-screen dark:bg-gray-900">
        <div className="dark:bg-gray-800 flex flex-col gap-3 justify-center rounded-lg px-10 w-2/4 h-40 translate-x-1/2 -translate-y-1/2 bg-white shadow-md">
          <h2 class="font-primary mb-3 text-gray-700 text-4xl text- font-bold text-center dark:text-white ">
            Enter vehicle Type
          </h2>

          <form class="flex items-center gap-2 h-10">
            <input
              type="text"
              id="search"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Car \ Van \ Suv \ Bus"
              required
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />

            <button
              onClick={search}
              type="button"
              class="h-10 focus:outline-none text-white bg-orange-500 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Search
            </button>
          </form>
        </div>

        <div className="dark:bg-gray-900">
          <div className="px-24">
            <h2 class="text-4xl text-gray-900  font-extrabold font-primary dark:text-white">
              Vehicles
            </h2>
            <p class="font-primary text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              These are the popular vehicles in your travel destination
            </p>
          </div>

          <div className="px-24 py-24 sm:grid-cols-0 grid md:grid-cols-2 gap-10" >
          {searchedVehicles &&
           searchedVehicles.map((prod) => (   
              <Link to={`/cars/${prod._id}`}>
                 <CarCard 
                  name={prod.vehicleModel}
                  image={prod.imgURL}
                  />
              </Link>
              ))}
               </div>
        </div>
      </div>
    </div>
  );
};

export default CarsList;
