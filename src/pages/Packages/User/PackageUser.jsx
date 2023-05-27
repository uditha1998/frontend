import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import UserCard from "../../../components/UserCard/UserCard";

export default function PackageUser() {
  const [bookings, setBookings] = useState([]);

  //Retrieve Data
  useEffect(() => {
    function getBookings() {
      axios
        .get("http://localhost:5000/api/booking/")
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getBookings();
  }, []);

  //Delete Data
  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",

      confirmButtonText: "Yes, cancel booking!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/booking/delete/${id}`);
        Swal.fire(
          "Deleted!",
          "Package Booking has been cancelled Successfully.",
          "success"
        ).then(() => {
          window.location = "/user/packages";
        });
      }
    });
  };

  return (
    <div className="dark:bg-gray-900 h-full p-10">
      <h2 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
        Selected Packages
      </h2>
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <card className="align-self-start w-25">
          {/* <thead class="text-xs text-white uppercase bg-orange-500 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ID
                </th>
                <th scope="col" class="py-3 px-6">
                  Date
                </th>
                <th scope="col" class="py-3 px-6">
                  Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Address
                </th>
                <th scope="col" class="py-3 px-6">
                  Email
                </th>
                <th scope="col" class="py-3 px-6">
                  Contact
                </th>
                <th scope="col" class="py-3 px-6">
                  Adult
                </th>
                <th scope="col" class="py-3 px-6">
                  Children
                </th>
                <th scope="col" class="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead> */}
          <tbody>
            {bookings &&
              bookings.map((booking) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-4 px-6">{booking.date}</td>
                  <td className="py-4 px-6">{booking.pname}</td>
                  <td className="py-4 px-6">{booking.address}</td>
                  <td className="py-4 px-6">{booking.email}</td>
                  <td className="py-4 px-6">{booking.contact}</td>
                  <td className="py-4 px-6">{booking.adult}</td>
                  <td className="py-4 px-6">{booking.children}</td>
                  <td>
                    <p
                      onClick={() => onDelete(booking._id)}
                      class="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Cancel
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </card>
      </div>

      <div className="px-24">
        <div className="flex flex-col gap-5 my-5">
          {bookings &&
            bookings.map((booking) => (
              <UserCard
                id={booking._id}
                date={booking.date}
                pname={booking.pname}
                address={booking.address}
                email={booking.email}
                contact={booking.contact}
                adult={booking.adult}
                children={booking.children}
                total={booking.total}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
