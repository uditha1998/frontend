import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { axiosclient } from "../../../../api";
import { AdminLayout } from "../../../../layouts";
import { isValidDate, isValidNumber, isValidString } from "../../../../utils";

const AddDestinations = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [travelM, settravelM] = useState({
    travelMeth: "",
    from: "",
    fromDate: "",
    to: "",
    toDate: "",
    price: "",
    toTime: "",
    fromTime: "",
    routNo: "",
  });

  const initialErrors = {
    travelMeth: "",
    from: "",
    fromDate: "",
    to: "",
    toDate: "",
    price: "",
    toTime: "",
    fromTime: "",
    routNo: "",
  };

  const [travelMError, settravelMError] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (travelMError[name]?.length) {
      settravelMError({
        ...travelMError,
        [name]: "",
      });
    }

    settravelM({
      ...travelM,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    let isFormError = false;
    // if (!isValidString(travelM.travelMeth)) {
    //   isFormError = true;
    //   settravelMError((prevState) => {
    //     return {
    //       ...prevState,
    //       travelMeth: "Airline name cannot be empty",
    //     };
    //   });
    // }

    if (!isValidString(travelM.from)) {
      isFormError = true;
      settravelMError((prevState) => {
        return {
          ...prevState,
          from: "Destination Method form cannot be empty",
        };
      });
    }

    if (!isValidString(travelM.to)) {
      isFormError = true;
      settravelMError((prevState) => {
        return {
          ...prevState,
          to: "Flight to cannot be empty",
        };
      });
    }

    // if (!isValidString(travelM.iataCode)) {
    //   isFormError = true;
    //   settravelMError((prevState) => {
    //     return {
    //       ...prevState,
    //       iataCode: "Iata code cannot be empty",
    //     };
    //   });
    // }

    if (!isValidNumber(travelM.price)) {
      isFormError = true;
      settravelMError((prevState) => {
        return {
          ...prevState,
          price: "Price should be a valid number",
        };
      });
    }

    if (!isValidDate(travelM.fromDate)) {
      isFormError = true;
      settravelMError((prevState) => {
        return {
          ...prevState,
          fromDate: "Travel Method from date should be a valid date",
        };
      });
    }

    if (!isValidDate(travelM.toDate)) {
      isFormError = true;
      settravelMError((prevState) => {
        return {
          ...prevState,
          toDate: "Travel Method to date should be a valid date",
        };
      });
    }

    if (isFormError === true) return;

    if (id) {
      axiosclient.put(`/api/flights/${id}`, travelM).then(() => {
        Swal.fire(
          "Travel method Edit",
          "You Travel Method details updated successfully!",
          "success"
        ).then(() => {
          navigate("/admin/flights");
        });
      });
    } else {
      axiosclient.post("/api/flights", travelM).then(() => {
        Swal.fire(
          "Travel Method Added",
          "You Travel Method has been added successfully!",
          "success"
        ).then(() => {
          navigate("/admin/flights");
        });
      });
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      console.log(id);
      axiosclient
        .get(`/api/flights/${id}`)
        .then((res) => {
          settravelM(res.data.flight);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full overflow-y-auto">
        <form class="flex flex-col gap-4 px-60 py-10" onSubmit={onFormSubmit}>
          <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
            Travel Method - Add a Travel Method
          </h3>
          <div>
            <input
              name="travelMeth"
              type="text"
              id="desname"
              class="input"
              // class={`input ${travelMError.travelMeth.length > 0 && "input-error"}`}
              placeholder="Travel Metho(Train/Bus) "
              value={travelM.travelMeth}
              onChange={handleChange}
            />
            {/* {travelMError.airline.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {travelMError.airline}
              </p>
            )} */}
          </div>

          <div>
            <input
              name="from"
              type="text"
              id="country"
              class={`input ${travelMError.from.length > 0 && "input-error"}`}
              placeholder="From"
              value={travelM.from}
              onChange={handleChange}
            />

            {travelMError.from.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {travelMError.from}
              </p>
            )}
          </div>

          <div>
            <input
              name="to"
              type="text"
              id="country"
              class={`input ${travelMError.to.length > 0 && "input-error"}`}
              placeholder="To"
              value={travelM.to}
              onChange={handleChange}
            />

            {travelMError.to.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {travelMError.to}
              </p>
            )}
          </div>

          <div>
            <input
              name="fromDate"
              type="date"
              id="iatacode"
              class={`input ${
                travelMError.fromDate.length > 0 && "input-error"
              }`}
              placeholder="From Date"
              value={travelM.fromDate}
              onChange={handleChange}
            />

            {travelMError.fromDate.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {travelMError.fromDate}
              </p>
            )}
          </div>

          <div>
            <input
              name="toDate"
              type="date"
              id="country"
              class={`input ${travelMError.toDate.length > 0 && "input-error"}`}
              placeholder="To Date"
              value={travelM.toDate}
              onChange={handleChange}
            />

            {travelMError.toDate.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {travelMError.toDate}
              </p>
            )}
          </div>

          <div>
            <input
              name="toTime"
              type="text"
              id="country"
              class={`input ${travelMError.toDate.length > 0 && "input-error"}`}
              placeholder="To time"
              value={travelM.toTime}
              onChange={handleChange}
            />

            {travelMError.toDate.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {travelMError.toTime}
              </p>
            )}
          </div>

          <div>
            <input
              name="fromTime"
              type="text"
              id="country"
              class={`input ${travelMError.toDate.length > 0 && "input-error"}`}
              placeholder="From Time"
              value={travelM.fromTime}
              onChange={handleChange}
            />

            {travelMError.toDate.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {travelMError.fromTime}
              </p>
            )}
          </div>

          <div>
            <input
              name="routNo"
              type="text"
              id="country"
              class="input"
              // class={`input ${
              //   travelMError.routNo.length > 0 && "input-error"
              // }`}
              placeholder="Route Code"
              value={travelM.routNo}
              onChange={handleChange}
            />

            {/* {travelMError.iataCode.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {travelMError.routNo}
              </p>
            )} */}
          </div>

          <div>
            <input
              name="price"
              type="text"
              id="country"
              class={`input ${travelMError.price.length > 0 && "input-error"}`}
              placeholder="Price"
              value={travelM.price}
              onChange={handleChange}
            />

            {travelMError.price.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {travelMError.price}
              </p>
            )}
          </div>

          <button
            type="submit"
            class="h-10 w-full focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
          >
            Submit
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddDestinations;
