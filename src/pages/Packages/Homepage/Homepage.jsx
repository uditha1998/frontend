import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="container w-screen min-h-screen">
      <div className=" h-[100vh] px-2 bg-cover flex items-center bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dkxt3vacv/image/upload/v1682107030/samples/bike.jpg')] w-screen">
        <div className="text-white px-24 w-4/5 flex flex-col gap-4">
          <h1 className="text-6xl dark:text-white font-bold font-primary">
            Find your tour package
          </h1>
          <p className="text-xl dark:text-white  font-primary">
            ‘A vacation is having nothing to do and all day to do it in’
          </p>

          <p>
            Traveling is an art and should be done the right way. Traveling is
            all about indulging in different activities and experiences. The
            same is taken care of by Sri Lanka Explore with a wide range of tour
            packages. Tour packages offered by Sri Lanka Explore are loved and
            considered by every traveler type for years now. Sri Lanka Explore is the
            one stop for all your holiday package needs. No matter whether you
            are searching for domestic or international packages, SOTC has got
            your back.
          </p>

          <Link to="/packages">
          <button
            type="button"
            class="w-1/5 h-10 focus:outline-none text-white bg-orange-500 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
          >
            Get Started
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
