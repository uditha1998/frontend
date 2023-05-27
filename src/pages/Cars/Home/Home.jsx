import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container w-screen min-h-screen">
      <div className=" h-[100vh] px-2 bg-cover flex items-center bg-no-repeat bg-center bg-[url('https://srilankarentacar.lk/wp-content/uploads/2021/05/Toyota-car-driving-on-a-road-1-1024x683.jpg')] w-screen">
        <div className="text-white px-24 w-4/5 flex flex-col gap-4">
          <h1 className="text-6xl dark:text-white font-bold font-primary">
            About Our vehicle Rental Service
          </h1>
          <p className="text-xl dark:text-white  font-primary">
            Vehicle rental in Sri lanka is a necessity if you are planning on
            tourning this wonderful country.Rent a vehicle in Sri Lanka today
            with us
          </p>

          <Link to="/cars">
            <button
              type="button"
              class="w-1/5 h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>

      <div className=" h-[100vh] px-2 bg-cover flex items-center bg-no-repeat bg-center bg-[url('https://lp-cms-production.imgix.net/2023-01/Croatia-Brac-PATSTOCK-GettyImages-1360074206-RFC.jpg?auto=format&q=75&w=1024')] w-screen">
        <div className="text-white px-24 w-4/5 flex flex-col gap-4">
          <p className="text-xl dark:text-white   font-primary">
           Sri Lanka Explore Rent a Car for all the major tourist destinations in Sri
            Lanka.We are committed to offer you reliable and safe, world-class
            car rental service with the fleet of Luxury cars that are available
            with professionally trained and English speaking Chauffeur. As we
            make sure that you are offered the correct and best value for this
            luxury car service to every customer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
