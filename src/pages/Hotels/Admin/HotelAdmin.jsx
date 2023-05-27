import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosclient } from "../../../api";
import { AdminLayout } from "../../../layouts";
import axios from "axios";
import Swal from "sweetalert2";
import { exportToCSV } from "../../../utils";

const HotelAdmin = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosclient
      .get("/api/hotel/read")
      .then((res) => {
        setHotels(res.data.existingPosts);
        console.log("all data", res);
      })
      .catch((err) => {
        alert(err.message);
      });
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
        axios.delete(`http://localhost:5000/api/hotel/delete/${id}`);
        Swal.fire(
          "Deleted!",
          "Hotel has been deleted Successfully.",
          "success"
        ).then(() => {
          window.location = "/admin/hotels";
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full p-10">
        <div className="flex justify-end gap-2">
          <Link to="/admin/hotels/new">
            <button
              type="button"
              class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Add a hotel
            </button>
          </Link>

          <button
            onClick={() => exportToCSV(hotels, "Hotels")}
            type="button"
            class="h-10 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
          >
            Download Report
          </button>
        </div>
        <h2 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
          Hotels
        </h2>
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-blue-900 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ID
                </th>
                <th scope="col" class="py-3 px-6">
                  Place
                </th>
                <th scope="col" class="py-3 px-6">
                  Hotel Name
                </th>
                <th scope="col" class="py-3 px-6">
                  No of Rooms
                </th>
                <th scope="col" class="py-3 px-6">
                  No of persons
                </th>
                <th scope="col" class="py-3 px-6">
                  Check Date
                </th>
                <th scope="col" class="py-3 px-6">
                  Price
                </th>
                <th scope="col" class="py-3 px-6">
                  Description
                </th>
                <th scope="col" class="py-3 px-6">
                  Img URL
                </th>
                <th scope="col" class="py-3 px-6">
                  Status
                </th>
                <th scope="col" class="py-3 px-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {hotels &&
                hotels.map((hotels, index) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td class="py-4 px-6">{hotels.place}</td>
                    <td class="py-4 px-6">{hotels.hotelName}</td>
                    <td class="py-4 px-6">{hotels.noRooms}</td>
                    <td class="py-4 px-6">{hotels.noPerson}</td>
                    <td class="py-4 px-6">{hotels.checkDate}</td>
                    <td class="py-4 px-6">{hotels.price}</td>
                    <td class="py-4 px-6">{hotels.description.slice(0, 20)}</td>
                    <td class="py-4 px-6">{hotels.imgUrl.slice(0, 20)}</td>
                    <td class="py-4 px-6">{hotels.status.slice(0, 20)}</td>
                    <td>
                      {/* <a className="btn btn-warning" onClick={()=>{navigate("/admin/hotels/edit/:id", {
                         state:{hotels},
                     })}}>
                     EDIT</a>&nbsp; */}

                      <p
                        onClick={() => {
                          navigate("/admin/hotels/edit/:id", {
                            state: { hotels },
                          });
                        }}
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </p>

                      <p
                        onClick={() => onDelete(hotels._id)}
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

export default HotelAdmin;
