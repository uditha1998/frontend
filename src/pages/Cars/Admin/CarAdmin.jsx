import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AdminLayout, AdminRoute } from "../../../layouts";
import { axiosclient } from "../../../api";
import { useState } from "react";
import Swal from "sweetalert2";
import { exportToCSV } from "../../../utils";

const CarAdmin = () => {
  const [vehicles, Setvehicles] = useState([]);

  useEffect(() => {
    axiosclient.get("/api/vehicles/get").then((res) => {
      Setvehicles(res.data.existingPosts);
    });
  }, []);

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
        axiosclient.delete(`/api/vehicles/delete/${id}`);
        Swal.fire(
          "Deleted!",
          "Hotel has been deleted Successfully.",
          "success"
        ).then(() => {
          window.location = "/admin/cars";
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="dark:bg-gray-900 h-full p-10 overflow-y-auto">
          <div className="flex justify-end gap-2">
            <Link to="/admin/cars/new">
              <button
                type="button"
                class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
              >
                Add a car
              </button>
            </Link>

            <button
              onClick={() => exportToCSV(vehicles, "Vehicles")}
              type="button"
              class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Download Report
            </button>
          </div>

          <h2 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
            Cars
          </h2>
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-white uppercase bg-blue-900 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Vehicle Number
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Vehicle Brand
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Vehicle Model
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Img URL
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Year
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Type
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Fule Type
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Engine CC
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Condition
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Status
                  </th>
                  <th scope="col" class="py-3 px-6">
                    price
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Action
                  </th>
                  <th scope="col" class="py-3 px-6">
                    <span class="sr-only">Edit</span>{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {vehicles &&
                  vehicles.map((prod) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td
                        scope="row"
                        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {prod.vehicleNumber}
                        {/* {console.log(prod)} */}
                      </td>
                      <td class="py-4 px-6">{prod.vehicleName}</td>
                      <td class="py-4 px-6">{prod.vehicleModel}</td>
                      <td class="py-4 px-6">{prod.imgURL.slice(0, 20)}...</td>
                      <td class="py-4 px-6">{prod.year}</td>
                      <td class="py-4 px-6">{prod.type}</td>
                      <td class="py-4 px-6">{prod.fule}</td>
                      <td class="py-4 px-6">{prod.engine}</td>
                      <td class="py-4 px-6">{prod.condition}</td>
                      <td class="py-4 px-6">{prod.status}</td>
                      <td class="py-4 px-6">{prod.price}</td>

                      <td class="py-4 px-6 text-right">
                        <Link
                          to={`/admin/cars/edit/${prod._id}`}
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>{" "}
                        &nbsp; &nbsp;
                        <a
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          href="#"
                          onClick={() => onDelete(prod._id)}
                        >
                          &nbsp;DELETE
                        </a>
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

export default CarAdmin;
