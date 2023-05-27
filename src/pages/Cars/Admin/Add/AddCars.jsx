import React, { useState } from "react";
import { AdminLayout, AdminRoute } from "../../../../layouts";
import axios from "axios";
import swal from "sweetalert2";
import { axiosclient } from "../../../../api";

export default function AddCars() {
  const [vehicleName, SetvName] = useState("");
  const [vehicleModel, SetModel] = useState("");
  const [vehicleNumber, SetvNumber] = useState("");
  const [imgURL, SetimgURL] = useState("");
  const [year, Setyear] = useState("");
  const [engine, SetengineCC] = useState("");
  const [price, Setprice] = useState("");
  const [type, SetselectsType] = useState("");
  const [fule, SetvehicleFule] = useState("");
  const [status, SetvehicleAvailability] = useState("");
  const [condition, Setvehicles] = useState("");

  const [error, setError] = useState(false);

  function sendData(e) {
    e.preventDefault();

    const newCar = {
      vehicleName,
      vehicleModel,
      vehicleNumber,
      imgURL,
      year,
      engine,
      price,
      type,
      fule,
      status,
      condition,
    };
    console.log(newCar);
    // /Validation/
    if (
      !vehicleNumber ||
      !vehicleModel ||
      !imgURL ||
      !year ||
      !price ||
      !type ||
      !fule ||
      !status ||
      !condition ||
      !vehicleName
    ) {
      setError(true);
      return false;
    }

    axiosclient
      .post("/api/vehicles/add", newCar)
      .then(() => {
        swal.fire("success ", "Vehicle added successfully!", "success");
        SetvName("");
        SetModel("");
        SetvNumber("");
        SetimgURL("");
        Setyear("");
        SetengineCC("");
        Setprice("");
        SetselectsType("");
        SetvehicleFule("");
        SetvehicleAvailability("");
        Setvehicles("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="dark:bg-gray-900 h-full overflow-y-auto">
          <form className="flex flex-col gap-4 px-60 py-10">
            <h3 className="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
              Cars - Add a Car
            </h3>

            <div>
              <input
                name="vName"
                type="text"
                id="nNam"
                class={`input ${error && !vehicleName && "input-error"}`}
                placeholder="Vehicle Brand Type"
                required
                onChange={(e) => {
                  SetvName(e.target.value);
                }}
              />
              {error && !vehicleName && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" Please Enter Vehicle Barnd Type"}
                </p>
              )}
            </div>

            <div>
              <input
                name="vModel"
                type="text"
                id="vMod"
                class={`input ${error && !vehicleModel && "input-error"}`}
                placeholder="Vehicle Model"
                required
                onChange={(e) => {
                  SetModel(e.target.value);
                }}
              />
              {error && !vehicleModel && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" Please Enter Vehicle Model"}
                </p>
              )}
            </div>

            <div>
              <input
                name="vNumber"
                type="text"
                id="nNum"
                class={`input ${error && !vehicleNumber && "input-error"}`}
                placeholder="Vehicle Number"
                required
                onChange={(e) => {
                  SetvNumber(e.target.value);
                }}
              />
              {error && !vehicleNumber && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" Please Enter Vehicle Number"}
                </p>
              )}
            </div>

            <div>
              <input
                name="imgURL"
                type="text"
                id="imgurl"
                class={`input ${error && !imgURL && "input-error"}`}
                placeholder="Img URL"
                required
                onChange={(e) => {
                  SetimgURL(e.target.value);
                }}
              />
              {error && !imgURL && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" Please Enter Image URL"}
                </p>
              )}
            </div>

            <div>
              <input
                name="year"
                type="text"
                id="year"
                class={`input ${error && !year && "input-error"}`}
                placeholder="Vehicle YOM"
                required
                onChange={(e) => {
                  Setyear(e.target.value);
                }}
              />
              {error && !year && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" Please Enter vehicle Year"}
                </p>
              )}
            </div>

            <div>
              <input
                name="engineCC"
                type="text"
                id="engine"
                class={`input ${error && !engine && "input-error"}`}
                placeholder="Engine CC"
                required
                onChange={(e) => {
                  SetengineCC(e.target.value);
                }}
              />
              {error && !engine && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {"Please Enter Engine CC "}
                </p>
              )}
            </div>

            <div>
              <input
                name="price"
                type="text"
                id="price"
                class={`input ${error && !price && "input-error"}`}
                placeholder="Per day price"
                required
                onChange={(e) => {
                  Setprice(e.target.value);
                }}
              />
              {error && !price && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {"Please Enter Price"}
                </p>
              )}
            </div>
            <div>
              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Select an option
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  id="vehicleType"
                  class={`input ${error && !type && "input-error"}`}
                  onChange={(e) => {
                    SetselectsType(e.target.value);
                  }}
                >
                  <option selected="">Vehicle Type</option>
                  <option>Van</option>
                  <option>Car</option>
                  <option>Bus</option>
                  <option>SUV</option>
                </select>
                {error && !type && (
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {"Please Select vehicle type"}
                  </p>
                )}
              </div>
              <div>
                <select
                  id="vehicleFule"
                  class={`input ${error && !fule && "input-error"}`}
                  onChange={(e) => {
                    SetvehicleFule(e.target.value);
                  }}
                >
                  <option selected="">Fule Type</option>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                </select>
                {error && !fule && (
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {" Please Select fule type"}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  id="vehicleAvailability"
                  class={`input ${error && !status && "input-error"}`}
                  onChange={(e) => {
                    SetvehicleAvailability(e.target.value);
                  }}
                >
                  <option selected="">Availability</option>
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
                {error && !status && (
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {" Please Select Availability "}
                  </p>
                )}
              </div>

              <div>
                <select
                  id="vehicles"
                  class={`input ${error && !status && "input-error"}`}
                  onChange={(e) => {
                    Setvehicles(e.target.value);
                  }}
                >
                  <option selected="">Condition</option>
                  <option value="Best">Best</option>
                  <option value="Normal">Normal</option>
                </select>
                {error && !condition && (
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {" Please Select condition "}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              class="h-10 w-full focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
              onClick={sendData}
            >
              Submit
            </button>
          </form>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}
