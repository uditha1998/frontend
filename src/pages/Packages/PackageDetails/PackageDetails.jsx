import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosclient } from "../../../api";
import { PackageCardIcon } from "../../../components";

const PackageDetails = () => {
  const [tour, setTour] = useState();
  const { id } = useParams();

  useEffect(() => {
    axiosclient
      .get(`/api/tour/get/${id}`)
      .then((res) => {
        setTour(res.data.tours);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="w-screen min-h-screen dark:bg-gray-900">
      <div className="w-full overflow-x-hidden px-2 bg-cover h-[60vh] bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dkxt3vacv/image/upload/v1682107033/samples/people/bicycle.jpg')]"></div>

      <div className="flex px-24 py-16 gap-8">
        <div className="w-3/5">
          <div className="flex items-start justify-between w-full">
            <div>
              <div>
                <h2 class="text-4xl text-gray-900  font-extrabold font-primary dark:text-white">
                  {tour?.name}
                </h2>
                <p class="font-primary text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                  {tour?.country}
                </p>
              </div>
            </div>
          </div>

          <p class=" text-gray-500 whitespace-normal dark:text-gray-400 my-8">
            {tour?.description}
          </p>

          <hr />

          <div className="my-8">
            <h2 class="mb-2 text-xl font-semibold text-orange-500 dark:text-white">
              Flight Details
            </h2>
            <ul class="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
              <li>{tour?.flight}</li>
            </ul>
          </div>

          <hr />

          <div className="my-8">
            <h2 class="mb-2 text-xl font-semibold text-orange-500 dark:text-white">
              Meals
            </h2>
            <ul class="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
              <li>{tour?.meal}</li>
            </ul>
          </div>

          <hr />

          <div className="my-8">
            <h2 class="mb-2 text-xl font-semibold text-orange-500 dark:text-white">
              Visa, Passport & Insurance
            </h2>
            <ul class="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
              <li>{tour?.visa}</li>
            </ul>
          </div>

          <hr />

          <div className="my-8">
            <h2 class="mb-2 text-xl font-semibold text-orange-500 dark:text-white">
              Accomodation
            </h2>
            <div className="flex items-start gap-5">
              <div className="w-1/4">
                <img src={tour?.url} alt="" />
              </div>
              <div className="flex flex-col gap-3">
                <p class=" text-gray-500 whitespace-normal dark:text-gray-400">
                  {tour?.hotel}
                </p>

                <div className="flex flex-col">
                  <div className="mt-1 flex gap-5">
                    <PackageCardIcon name="Flights" />
                    <PackageCardIcon name="Hotels" />
                    <PackageCardIcon name="Visa" />
                    <PackageCardIcon name="Meals" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8">
          <h2 class="mb-2 text-xl font-semibold text-orange-500 dark:text-white">
            Inclusions
          </h2>

          <p class=" text-gray-500 whitespace-normal dark:text-gray-400 my-3">
            What's your package includes?
          </p>
          <ul class="space-y-5 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
            <b>Sightseeing:</b>
            <li>{tour?.inclusion}</li>
          </ul>

          <Link to={`/user/packages/new/${id}`}>
            <button
              type="button"
              class="h-10 my-8 w-full focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              BOOK NOW
            </button>
          </Link>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default PackageDetails;
