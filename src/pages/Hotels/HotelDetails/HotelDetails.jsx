import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosclient } from "../../../api";
import { useGlobalState } from "../../../utils";

const HotelDetails = () => {
  const [OneHotel, setOnehotel] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageid, setpackageId] = useGlobalState("packageid");

  useEffect(() => {
    axiosclient
      .get(`/api/hotel/get/${id}`)
      .then((res) => {
        setOnehotel(res.data.hotel);
        console.log(res.data.hotel);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const createPackageHotel = async () => {
    await axiosclient
      .put(`/api/packages/hotel/${packageid}`, {
        name: OneHotel?.hotelName,
        price: Number(OneHotel?.price.split("$")[1]),
      })
      .then((res) => {
        toast.success("Hotel selected successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/cars/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-screen min-h-screen dark:bg-gray-900">
      <div
        style={{ backgroundImage: `url(${OneHotel?.imgUrl})` }}
        className="w-full overflow-x-hidden px-2 bg-cover h-[60vh] bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/sliit45/image/upload/v1661614552/SPMAPP/London_Houses_of_Parliament-1200x800_1_ppxive.webp')]"
      ></div>

      <div className="px-24 py-16">
        <div className="flex items-start justify-between w-full">
          <div>
            <div>
              <h2 class="text-4xl text-gray-900  font-extrabold font-primary dark:text-white">
                {OneHotel?.hotelName}
              </h2>
              <p class="font-primary text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                {OneHotel?.place}
              </p>
            </div>
          </div>

          <div>
            <h3 class="text-3xl text-center font-bold dark:text-white">
              {OneHotel?.price}
            </h3>
            <button
              onClick={createPackageHotel}
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

        <p class=" text-gray-500 whitespace-normal dark:text-gray-400 my-8">
          {OneHotel?.description}
        </p>

        <hr />

        <div className="my-8">
          <h2 class="text-3xl text-gray-900  font-extrabold font-primary dark:text-white">
            Facilities
          </h2>

          <div className="flex items-center justify-around py-8">
            <div className="flex flex-col items-center">
              <i class="fa-solid fa-phone dark:text-white"></i>
              <h3 class="text-2xl text-gray-900  font-extrabold font-primary dark:text-white">
                Free Calls
              </h3>
            </div>

            <div className="flex flex-col items-center">
              <i class="fa-solid fa-wifi dark:text-white"></i>
              <h3 class="text-2xl text-gray-900  font-extrabold font-primary dark:text-white">
                Free Wifi
              </h3>
            </div>

            <div className="flex flex-col items-center">
              <i class="fa-solid fa-message dark:text-white"></i>
              <h3 class="text-2xl text-gray-900  font-extrabold font-primary dark:text-white">
                Hotel Service
              </h3>
            </div>
          </div>
        </div>

        <hr />

        <div className="list-disc">
          <h2 class="my-8 text-3xl text-gray-900  font-extrabold font-primary dark:text-white">
            Rules
          </h2>

          <ul className="list-decimal">
            <li className="text-gray-500 whitespace-normal dark:text-gray-400 ">
              Please present your ID card, Passport or Temporary Residence Card
              upon Check-in. By Law visitors must present personal documents for
              hotel records. These documents will be returned upon departure.
            </li>

            <li className="text-gray-500 whitespace-normal dark:text-gray-400 ">
              The tariff is for the room only and is exclusive of any government
              taxes applicable Meals and other services are available at extra
              cost. To know your room tariff, please contact the Duty Manager,
              guest registration forms must be signed on arrivals.
            </li>

            <li className="text-gray-500 whitespace-normal dark:text-gray-400 ">
              Bills must be settled on presentation, personal cheques are not
              accepted.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
