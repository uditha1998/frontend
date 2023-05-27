import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

import { axiosclient } from "../../../../api";
import { AdminLayout } from "../../../../layouts";
import { exportToCSV } from "../../../../utils";

const TravelMAdmin = () => {
  const [travelMs, setTravelM] = useState([]);

  useEffect(() => {
    axiosclient
      .get("/api/flights")
      .then((res) => {
        console.log("flights", res);
        setTravelM(res.data.flights);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDeleteClick = (desid) => {
    Swal.fire({
      title: "Do you really need to delete this?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosclient.delete(`/api/flights/${desid}`).then((res) => {
          if (res.status === 204) {
            axiosclient
              .get("/api/flights")
              .then((res) => {
                setTravelM(res.data.travelMs);

                Swal.fire(
                  "Travel Method Delete",
                  "You Travel Method deleted successfully!",
                  "success"
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Destination deletion canceled");
      }
    });
  };

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full p-10 overflow-x-auto">
        <div className="flex justify-end gap-2">
          <Link to="/admin/flights/new">
            <button
              type="button"
              class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Add a Travel Method
            </button>
          </Link>

          <button
            onClick={() => exportToCSV(travelMs, "travelMs")}
            type="button"
            class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
          >
            Download Report
          </button>
        </div>
        <h2 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
          Travel Method
        </h2>
        <div class="overflow-x-auto  relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-blue-900 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ID
                </th>
                <th scope="col" class="py-3 px-6">
                  Traveling method(Bus/Train)
                </th>
                <th scope="col" class="py-3 px-6">
                  From
                </th>
                <th scope="col" class="py-3 px-6">
                  From Time
                </th>
                <th scope="col" class="py-3 px-6">
                  To
                </th>
                <th scope="col" class="py-3 px-6">
                  To Time
                </th>
                <th scope="col" class="py-3 px-6">
                  Route Code
                </th>
                <th scope="col" class="py-3 px-6">
                  Price
                </th>
                <th scope="col" class="py-3 px-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {travelMs?.map((travelM) => (
                <tr
                  key={uuid()}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {travelM._id}
                  </th>
                  <td class="py-4 px-6">{travelM.travelMeth}</td>
                  <td class="py-4 px-6">{travelM.from}</td>
                  <td class="py-4 px-6">{travelM.fromTime}</td>
                  <td class="py-4 px-6">{travelM.to}</td>
                  <td class="py-4 px-6">{travelM.toTime}</td>
                  <td class="py-4 px-6">{travelM.routNo}</td>
                  <td class="py-4 px-6">{travelM.price}</td>
                  <td class="py-4 px-6 text-right flex justify-center gap-3">
                    <Link
                      to={`/admin/flights/edit/${travelM._id}`}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>

                    <p
                      onClick={() => onDeleteClick(travelM._id)}
                      class="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TravelMAdmin;
