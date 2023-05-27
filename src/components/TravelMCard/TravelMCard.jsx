import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosclient } from "../../api";
import { useGlobalState } from "../../utils";

const TravelMCard = ({ travelMeth, from, fromDate, to, toDate, price, toTime , fromTime }) => {
  const navigate = useNavigate();
  const [packageid, setpackageId] = useGlobalState("packageid");

  const createTravelM = async () => {
    await axiosclient
      .put(`/api/packages/${packageid}`, {
        
          name: travelMeth,
          price: price,
       
      })
      .then((res) => {
        toast.success("Trevel Method selected successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/hotels/home", {
          state: { packageId: res.data._id },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card w-full bg-custom-gray rounded shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div class="block bg-blue-900 rounded-tl rounded-tr">
      <h5 class="mb-2 px-10 py-3 text-white text-2xl font-bold tracking-tight   dark:text-white">
          {travelMeth}
        </h5>
      </div>

      <div className="flex items-center py-5 ">
        <div className="flex-1 px-10">
          <div className="mb-5">
            <h5 class="text-xl font-bold dark:text-white"> {from}</h5>
           <span> <span class="my-1 text-sm font-bold text-gray-900 dark:text-white">
              {fromDate}
            </span>
            <span class="my-1 text-sm font-bold text-gray-900 dark:text-white ml-4">
              {fromTime}
            </span></span>
          </div>

          <hr className="border-white" />

          <div className="mt-5">
            <h5 class="text-xl font-bold dark:text-white"> {to}</h5>
            <span class="my-1 text-sm font-bold text-gray-900 dark:text-white">
              {toDate}
            </span>
            <span class="my-1 text-sm font-bold text-gray-900 dark:text-white ml-4">
              {toTime}
            </span>
          </div>
        </div>

        <div className="px-10">
          <h3 class="text-3xl text-center font-bold dark:text-white">
            {price}
          </h3>
          <button
            onClick={createTravelM}
            type="button"
            class="my-5 flex items-center gap-2 h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
          >
            <svg
              className="w-4"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5249 10.625H7.34625L7.57351 11.6875H16.8936C17.4283 11.6875 17.8247 12.1623 17.7062 12.661L17.5146 13.467C18.1636 13.7683 18.6111 14.4044 18.6111 15.1406C18.6111 16.1766 17.725 17.0147 16.6381 16.9998C15.6025 16.9856 14.7509 16.182 14.723 15.192C14.7077 14.6512 14.9342 14.1611 15.3064 13.8125H8.02695C8.38726 14.15 8.61111 14.6202 8.61111 15.1406C8.61111 16.1969 7.69 17.0475 6.57396 16.9979C5.58299 16.9539 4.77705 16.1883 4.72497 15.2409C4.68476 14.5093 5.08733 13.8645 5.69896 13.5281L3.25983 2.125H0.833334C0.37309 2.125 0 1.76823 0 1.32812V0.796875C0 0.356767 0.37309 0 0.833334 0H4.39337C4.78924 0 5.13045 0.266322 5.20979 0.637168L5.52806 2.125H19.1663C19.7011 2.125 20.0974 2.59984 19.9789 3.09848L18.3375 10.0047C18.2513 10.3675 17.914 10.625 17.5249 10.625ZM14.1667 5.57812H12.5V4.25C12.5 3.95658 12.2513 3.71875 11.9444 3.71875H11.3889C11.0821 3.71875 10.8333 3.95658 10.8333 4.25V5.57812H9.16667C8.85983 5.57812 8.61111 5.81596 8.61111 6.10937V6.64062C8.61111 6.93404 8.85983 7.17187 9.16667 7.17187H10.8333V8.5C10.8333 8.79341 11.0821 9.03125 11.3889 9.03125H11.9444C12.2513 9.03125 12.5 8.79341 12.5 8.5V7.17187H14.1667C14.4735 7.17187 14.7222 6.93404 14.7222 6.64062V6.10937C14.7222 5.81596 14.4735 5.57812 14.1667 5.57812Z"
                fill="white"
              />
            </svg>
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelMCard;
