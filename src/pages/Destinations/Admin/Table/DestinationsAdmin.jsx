import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

import { axiosclient } from "../../../../api";
import { AdminLayout, AdminRoute } from "../../../../layouts";
import { exportToCSV } from "../../../../utils";

const DestinationsAdmin = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axiosclient
      .get("/api/destinations")
      .then((res) => {
        setDestinations(res.data.destinations);
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
        axiosclient.delete(`/api/destinations/${desid}`).then((res) => {
          console.log(res);
          if (res.status === 204) {
            axiosclient
              .get("/api/destinations")
              .then((res) => {
                setDestinations(res.data.destinations);

                Swal.fire(
                  "Destination Delete",
                  "You destination deleted successfully!",
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
    <AdminRoute>
      <AdminLayout>
        <div className="dark:bg-gray-900 h-full p-10 overflow-x-auto">
          <div className="flex justify-end gap-2">
            <Link to="/admin/destinations/new">
              <button
                type="button"
                class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
              >
                Add a destination
              </button>
            </Link>

            <button
              onClick={() => exportToCSV(destinations, "Destinations")}
              type="button"
              class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Download Report
            </button>
          </div>
          <h2 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
            Destinations
          </h2>
          <div class="overflow-x-auto  relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-white uppercase bg-blue-900 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Destination Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Slogan
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Country
                  </th>
                  <th scope="col" class="py-3 px-6">
                    When to visit
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Estimated Budget
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Image
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Description
                  </th>
                  <th scope="col" class="py-3 px-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((destination) => (
                  <tr
                    key={uuid()}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {destination._id}
                    </th>
                    <td class="py-4 px-6">{destination.destinationName}</td>
                    <td class="py-4 px-6">
                      {destination.slogan.slice(0, 20)}...
                    </td>
                    <td class="py-4 px-6">{destination.country}</td>
                    <td class="py-4 px-6">
                      {destination.whenToVisit.slice(0, 20)}...
                    </td>
                    <td class="py-4 px-6">$ {destination.estimatedBudget}</td>
                    <td class="py-4 px-6">
                      <a
                        href={destination.image}
                        alt="A soultravel destination"
                      >
                        {destination.image.slice(0, 20)}...
                      </a>
                    </td>
                    <td class="py-4 px-6">
                      {destination.description.slice(0, 20)}...
                    </td>
                    <td class="py-4 px-6 text-right flex justify-center gap-3">
                      <Link
                        to={`/admin/destinations/edit/${destination._id}`}
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>

                      <p
                        onClick={() => onDeleteClick(destination._id)}
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
    </AdminRoute>
  );
};

export default DestinationsAdmin;
