import React from "react";
import { Link } from "react-router-dom";
import PackageCardIcon from "../PackageCardIcon/PackageCardIcon";

const PackageCard = (props) => {
  return (
    <div className="flex gap-5">
      <div className="w-3/4 card w-full bg-custom-gray rounded shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex items-center py-5 gap-5 pl-6">
          <div className="w-1/4">
            <img src={props.image} alt="" className="w-full" />
          </div>
          <div className="flex-1">
            <div className="mb-5 flex justify-between pr-5">
              <h5 class="text-xl font-bold dark:text-white">{props.name}</h5>
              <p class="my-1 text-sm font-bold text-gray-900 dark:text-white">
                {props.night} nights {props.day} Days
              </p>
            </div>

            <hr className="border-white" />

            <div className="mt-5 flex gap-5">
              <PackageCardIcon name="Flights" />
              <PackageCardIcon name="Hotels" />
              <PackageCardIcon name="Visa" />
              <PackageCardIcon name="Meals" />
            </div>
          </div>
        </div>
      </div>
      <div className=" px-10 flex-1 flex items-center flex-col justify-center bg-custom-gray rounded shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h3 class="text-3xl text-center font-bold dark:text-white">
          {props.price}
        </h3>
        <p class="my-1 text-sm text-center  text-gray-900 dark:text-white">
          Starting price per adult
        </p>
        <Link to={`/packages/${props.id}`}>
          <button
            type="button"
            class="my-5 font-bold flex items-center gap-2 h-10 focus:outline-none text-white bg-orange-500 hover:bg-orange-600  rounded text-sm px-5 py-2.5"
          >
            BOOK ONLINE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
