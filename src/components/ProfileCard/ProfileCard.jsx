import React from "react";

const ProfileCard = ({
  destination,
  flight,
  hotel,
  vehicle,
  hotelPrice,
  destinationPrice,
  flightPrice,
  vehiclePrice,
  nuOfChild,
  nuOfAdults,
  price,
  type,
  bookedBy,
}) => {
  return (
    <div className="card my-6 w-full bg-custom-gray rounded shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div class="block bg-[#FF7E36] rounded-tl rounded-tr">
        <h5 class="mb-2 px-10 py-3 text-white text-2xl font-bold tracking-tight   dark:text-white">
          Booking to {destination}
        </h5>
      </div>

      {type === "booking" && (
        <div className="flex items-center py-5 ">
          <div className="flex-1 px-10">
            <div className="flex justify-between mt-5 mb-5">
              <div>
                <h5 class="text-xl font-bold dark:text-white"> No of adults</h5>
              </div>

              <div className="my-1 text-sm font-bold text-gray-900 dark:text-white">
                {nuOfAdults}
              </div>
            </div>

            <hr className="border-white" />

            <div className="flex justify-between mt-5 mb-5">
              <div>
                <h5 class="text-xl font-bold dark:text-white">
                  {" "}
                  No of children
                </h5>
              </div>

              <div className="my-1 text-sm font-bold text-gray-900 dark:text-white">
                {nuOfChild}
              </div>
            </div>

            <hr className="border-white" />

            <div className="flex justify-between mt-5 mb-5">
              <div>
                <h5 class="text-xl font-bold dark:text-white"> Booked by</h5>
              </div>

              <div className="my-1 text-sm font-bold text-gray-900 dark:text-white">
                {bookedBy}
              </div>
            </div>

            <hr className="border-white" />

            <hr className="border-white" />

            <div className="mt-5 mb-5 flex justify-between">
              <h5 class="text-xl font-bold dark:text-white"> Total</h5>
              <p class="my-1 text-sm font-bold text-gray-900 dark:text-white">
                ${price}
              </p>
            </div>
          </div>
        </div>
      )}

      {!(type === "booking") && (
        <div className="flex items-center py-5 ">
          <div className="flex-1 px-10">
            <div className="flex justify-between mt-5 mb-5">
              <div>
                <h5 class="text-xl font-bold dark:text-white"> Travel Method </h5>
                <p class="my-1 text-sm font-bold text-gray-900 dark:text-white">
                  {flight}
                </p>
              </div>

              <div className="my-1 text-sm font-bold text-gray-900 dark:text-white">
                ${flightPrice}
              </div>
            </div>

            <hr className="border-white" />

            <div className="flex justify-between mt-5 mb-5">
              <div>
                <h5 class="text-xl font-bold dark:text-white"> Hotel</h5>
                <p class="my-1 text-sm font-bold text-gray-900 dark:text-white">
                  {hotel}
                </p>
              </div>

              <div className="my-1 text-sm font-bold text-gray-900 dark:text-white">
                ${hotelPrice}
              </div>
            </div>

            <hr className="border-white" />

            <div className="mt-5 mb-5 flex justify-between">
              <div>
                <h5 class="text-xl font-bold dark:text-white"> Vehicle</h5>
                <p class="my-1 text-sm font-bold text-gray-900 dark:text-white">
                  {vehicle}
                </p>
              </div>

              <div className="my-1 text-sm font-bold text-gray-900 dark:text-white">
                ${vehiclePrice}
              </div>
            </div>

            <hr className="border-white" />

            <div className="mt-5 mb-5 flex justify-between">
              <h5 class="text-xl font-bold dark:text-white"> Total</h5>
              <p class="my-1 text-sm font-bold text-gray-900 dark:text-white">
                $
                {Number(flightPrice) +
                  Number(hotelPrice) +
                  Number(vehiclePrice)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
