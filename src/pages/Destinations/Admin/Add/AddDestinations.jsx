import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { axiosclient } from "../../../../api";
import { AdminLayout, AdminRoute } from "../../../../layouts";
import {
  isValidCountry,
  isValidCurrencyAmount,
  isValidString,
} from "../../../../utils";

const AddDestinations = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [destination, setDestination] = useState({
    destinationName: "",
    slogan: "",
    country: "",
    iataCode: "",
    whenToVisit: "",
    popularFor: "",
    estimatedBudget: "",
    image: "",
    description: "",
  });

  const initialErrors = {
    destinationName: "",
    slogan: "",
    country: "",
    iataCode: "",
    whenToVisit: "",
    popularFor: "",
    estimatedBudget: "",
    image: "",
    description: "",
  };

  const [destinationError, setDestinationError] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (destinationError[name]?.length) {
      setDestinationError({
        ...destinationError,
        [name]: "",
      });
    }

    setDestination({
      ...destination,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    let isFormError = false;
    if (!isValidString(destination.destinationName)) {
      isFormError = true;
      setDestinationError((prevState) => {
        return {
          ...prevState,
          destinationName: "Destination name cannot be empty",
        };
      });
    }

    if (!isValidString(destination.slogan)) {
      isFormError = true;
      setDestinationError((prevState) => {
        return {
          ...prevState,
          slogan: "Destination's slogan cannot be empty",
        };
      });
    }

    if (!isValidString(destination.iataCode)) {
      isFormError = true;
      setDestinationError((prevState) => {
        return {
          ...prevState,
          iataCode: "Destination's iata code cannot be empty",
        };
      });
    }

    if (!isValidCountry(destination.country)) {
      isFormError = true;
      setDestinationError((prevState) => {
        return {
          ...prevState,
          country: "Destination's country should be a valid country",
        };
      });
    }

    if (!isValidString(destination.whenToVisit)) {
      isFormError = true;
      setDestinationError((prevState) => {
        return {
          ...prevState,
          whenToVisit: "Destination's visiting time cannot be empty",
        };
      });
    }

    if (!isValidString(destination.popularFor)) {
      isFormError = true;
      setDestinationError((prevState) => {
        return {
          ...prevState,
          popularFor: "Destination's popularity cannot be empty",
        };
      });
    }

    if (!isValidCurrencyAmount(destination.estimatedBudget)) {
      isFormError = true;
      setDestinationError((prevState) => {
        return {
          ...prevState,
          estimatedBudget:
            "Destination's estimated budget can only contain a number with comma separaters",
        };
      });
    }

    if (!isValidString(destination.image)) {
      isFormError = true;
      setDestinationError((prevState) => {
        return {
          ...prevState,
          image: "Image field cannot be empty",
        };
      });
    }

    if (destination.description.length < 20) {
      isFormError = true;
      setDestinationError((prevState) => {
        return {
          ...prevState,
          description: "A description should have at least 20 characters",
        };
      });
    }

    if (isFormError === true) return;

    if (id) {
      axiosclient.put(`/api/destinations/${id}`, destination).then(() => {
        Swal.fire(
          "Destination Edit",
          "You destination details updated successfully!",
          "success"
        ).then(() => {
          navigate("/admin/destinations");
        });
      });
    } else {
      axiosclient.post("/api/destinations", destination).then(() => {
        Swal.fire(
          "Destination Added",
          "You destination has been added successfully!",
          "success"
        ).then(() => {
          navigate("/admin/destinations");
        });
      });
    }
  };

  useEffect(() => {
    if (id !== null) {
      axiosclient
        .get(`/api/destinations/${id}`)
        .then((res) => {
          setDestination(res.data.destination);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="dark:bg-gray-900 h-full overflow-y-auto">
          <form class="flex flex-col gap-4 px-60 py-10" onSubmit={onFormSubmit}>
            <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
              Destinations - Add a destination
            </h3>
            <div>
              <input
                name="destinationName"
                type="text"
                id="desname"
                class={`input ${
                  destinationError.destinationName.length > 0 && "input-error"
                }`}
                placeholder="Enter Destination"
                value={destination.destinationName}
                onChange={handleChange}
              />
              {destinationError.destinationName.length > 0 && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" "}
                  {destinationError.destinationName}
                </p>
              )}
            </div>

            <div>
              <input
                name="slogan"
                type="text"
                id="country"
                class={`input ${
                  destinationError.slogan.length > 0 && "input-error"
                }`}
                placeholder="Slogan"
                value={destination.slogan}
                onChange={handleChange}
              />

              {destinationError.slogan.length > 0 && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {destinationError.slogan}
                </p>
              )}
            </div>

            <div>
              <input
                name="country"
                type="text"
                id="country"
                class={`input ${
                  destinationError.country.length > 0 && "input-error"
                }`}
                placeholder="Enter Country"
                value={destination.country}
                onChange={handleChange}
              />

              {destinationError.country.length > 0 && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {destinationError.country}
                </p>
              )}
            </div>

            <div>
              <input
                name="iataCode"
                type="text"
                id="iatacode"
                class={`input ${
                  destinationError.iataCode.length > 0 && "input-error"
                }`}
                placeholder="Enter IATA Code"
                value={destination.iataCode}
                onChange={handleChange}
              />

              {destinationError.iataCode.length > 0 && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {destinationError.iataCode}
                </p>
              )}
            </div>

            <div>
              <input
                name="whenToVisit"
                type="text"
                id="country"
                class={`input ${
                  destinationError.whenToVisit.length > 0 && "input-error"
                }`}
                placeholder="When to visit"
                value={destination.whenToVisit}
                onChange={handleChange}
              />

              {destinationError.whenToVisit.length > 0 && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" "}
                  {destinationError.whenToVisit}
                </p>
              )}
            </div>

            <div>
              <input
                name="popularFor"
                type="text"
                id="country"
                class={`input ${
                  destinationError.popularFor.length > 0 && "input-error"
                }`}
                placeholder="Popular For"
                value={destination.popularFor}
                onChange={handleChange}
              />

              {destinationError.popularFor.length > 0 && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" "}
                  {destinationError.popularFor}
                </p>
              )}
            </div>

            <div>
              <input
                name="estimatedBudget"
                type="text"
                id="country"
                class={`input ${
                  destinationError.estimatedBudget.length > 0 && "input-error"
                }`}
                placeholder="Estimated Budget"
                value={destination.estimatedBudget}
                onChange={handleChange}
              />

              {destinationError.estimatedBudget.length > 0 && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" "}
                  {destinationError.estimatedBudget}
                </p>
              )}
            </div>

            <div>
              <input
                name="image"
                type="text"
                id="country"
                class={`input ${
                  destinationError.image.length > 0 && "input-error"
                }`}
                placeholder="Image"
                value={destination.image}
                onChange={handleChange}
              />

              {destinationError.image.length > 0 && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {destinationError.image}
                </p>
              )}
            </div>

            <div>
              <textarea
                name="description"
                type="text"
                id="country"
                class={`input ${
                  destinationError.description.length > 0 && "input-error"
                }`}
                placeholder="Description"
                value={destination.description}
                onChange={handleChange}
              />

              {destinationError.description.length > 0 && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {destinationError.description}
                </p>
              )}
            </div>

            <button
              type="submit"
              class="h-10 w-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Submit
            </button>
          </form>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
};

export default AddDestinations;
