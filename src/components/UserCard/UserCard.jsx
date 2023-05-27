import React from "react";
import { Link } from "react-router-dom";

const UserCard = (props) => {
  return (
    <div className="flex gap-5">
      <div className="w-3/4 card w-full bg-custom-gray rounded shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex items-center py-5 gap-5 pl-6">
          
          <div className="flex-1">
            <div className="mb-1 flex justify-between pr-5">
              <h5 class="text-xl font-semibold dark:text-white">{props.date}</h5>
              <h3 class="text-xl font-semibold dark:text-white">{props.pname}</h3>
              <h3 class="text-xl font-semibold dark:text-white">{props.address}</h3>
              <h3 class="text-xl font-semibold dark:text-white">{props.email}</h3>
              <h3 class="text-xl font-semibold dark:text-white">{props.contact}</h3>
              <p class="my-1 text-sm font-semibold text-gray-900 dark:text-white">
                {props.adult} Adults {props.children} Children
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" px-10 flex-1 flex items-center flex-col justify-center bg-custom-gray rounded shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h3 class="text-3xl text-center font-bold dark:text-white">
          {props.total}
        </h3>
        <p class="my-1 text-sm text-center  text-gray-900 dark:text-white">
          Total Price
        </p>
        
      </div>
    </div>
  );
};

export default UserCard;
