import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLayout, AdminRoute } from "../../../layouts";
import axios from "axios";
import Swal from "sweetalert2";
import { exportToCSV } from "../../../utils";
import { axiosclient } from "../../../api";

const PackageAdmin = () => {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  //Retrieve Data
  useEffect(() => {
    function getTours() {
      axiosclient
        .get("/api/tour/")
        .then((res) => {
          setTours(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getTours();
  }, []);

  //Delete Data
  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosclient.delete(`/api/tour/delete/${id}`);
        Swal.fire(
          "Deleted!",
          "Tour Package has been deleted Successfully.",
          "success"
        ).then(() => {
          window.location = "/admin/packages";
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="dark:bg-gray-900 h-full p-10">
          <div className="flex justify-end gap-2">
            <Link to="/admin/packages/new">
              <button
                type="button"
                class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
              >
                Add a package
              </button>
            </Link>

            <button
              onClick={() => exportToCSV(tours, "tours")}
              type="button"
              class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Download Report
            </button>
          </div>
          <h2 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
            Packages
          </h2>
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-white uppercase bg-blue-900 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Country
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Package Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Package Price
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Hotel Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Hotel Image URL
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Flight Details
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Meal Details
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Visa Details
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Package Inclusions
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Days
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Nights
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Package Description
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tours &&
                  tours.map((tour, index) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="py-4 px-6">{tour.country}</td>
                      <td className="py-4 px-6">{tour.name.slice(0, 14)}...</td>
                      <td className="py-4 px-6">{tour.price}</td>
                      <td className="py-4 px-6">
                        {tour.hotel.slice(0, 18)}...
                      </td>
                      <td className="py-4 px-6">
                        <a href={tour.url}>{tour.url.slice(0, 20)}...</a>
                      </td>
                      <td className="py-4 px-6">
                        {tour.flight.slice(0, 14)}...
                      </td>
                      <td className="py-4 px-6">{tour.meal.slice(0, 15)}...</td>
                      <td className="py-4 px-6">{tour.visa.slice(0, 11)}...</td>
                      <td className="py-4 px-6">
                        {tour.inclusion.slice(0, 19)}...
                      </td>
                      <td className="py-4 px-6">{tour.day}</td>
                      <td className="py-4 px-6">{tour.night}</td>
                      <td className="py-4 px-6">
                        {tour.description.slice(0, 17)}...
                      </td>
                      <td>
                        <p
                          onClick={() => {
                            navigate("/admin/packages/edit/:id", {
                              state: { tour },
                            });
                          }}
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </p>

                        <p
                          onClick={() => onDelete(tour._id)}
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

export default PackageAdmin;
