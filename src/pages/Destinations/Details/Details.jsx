import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../utils";
import { toast } from "react-toastify";

import { axiosclient } from "../../../api";

const Details = () => {
  const [destination, setDestination] = useState();
  const [packageid, setpackageId] = useGlobalState("packageid");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosclient
      .get(`/api/destinations/${id}`)
      .then((res) => {
        setDestination(res.data.destination);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const createPackage = async (desname, price) => {
    await axiosclient
      .post(`/api/packages`, {
        name: desname,
        price: price,
      })
      .then((res) => {
        toast.success("Destination selected successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setpackageId(res.data._id);
        navigate(`/travel-m/${destination.destinationName}/${destination._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSelectButtonClick = async () => {
    await createPackage(
      destination.destinationName,
      destination.estimatedBudget
    );
  };

  return (
    <div className="w-screen min-h-screen dark:bg-gray-900">
      {destination && (
        <>
          <div
            style={{ backgroundImage: `url(${destination.image})` }}
            className={`w-full overflow-x-hidden px-2 bg-cover h-[60vh] bg-no-repeat bg-center bg-[url('https://i.postimg.cc/250jYWPb/pexels-szabolcs-toth-11047655.jpg')]`}
          ></div>

          <div className="px-24 py-16">
            <div className="flex items-start justify-between w-full">
              <div>
                <div>
                  <h2 class="text-4xl text-gray-900  font-extrabold font-primary dark:text-white">
                    {destination.destinationName}
                  </h2>
                  <p class="font-primary text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    {destination.slogan}
                  </p>

                  <p class="font-primary my-4 text-lg font-normal text-gray-500 lg:text-lg dark:text-gray-400">
                    Estimated Budget: $ {destination.estimatedBudget}
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={onSelectButtonClick}
                  type="button"
                  class="h-10 focus:outline-none text-white bg-orange-500 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
                >
                  Select Destination
                </button>
              </div>
            </div>

            <hr className="my-4" />

            <h5 class="text-xl font-bold text-orange-500 mt-5 dark:text-white">
              Best time of the year to visit {destination.destinationName}
            </h5>

            <li class=" text-gray-500 mt-3 whitespace-normal dark:text-gray-400">
              {destination.whenToVisit}
            </li>

            <h5 class="text-xl font-bold text-orange-500 mt-5 dark:text-white">
              Popularity
            </h5>
            <li class=" text-gray-500 mt-3 whitespace-normal dark:text-gray-400">
              {destination.destinationName} is popular for{" "}
              {destination.popularFor}.
            </li>

            <h5 class="text-xl font-bold text-orange-500 my-8 dark:text-white">
              A small description about {destination.destinationName}
            </h5>
            <p class=" text-gray-500 whitespace-normal dark:text-gray-400 my-8">
              {destination.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
