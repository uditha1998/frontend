import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosclient } from "../../../../api";

export default function SelectPackage() {
  const [tour, setTour] = useState();
  const { id } = useParams();

  useEffect(() => {
    axiosclient
      .get(`/api/tour/get/${id}`)
      .then((res) => {
        setTour(res.data.tours);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [pname, setPname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [adult, setAdult] = useState("");
  const [children, setChildren] = useState("");
  const [total, setTotal] = useState();

  function sendData(e) {
    e.preventDefault();

    const newBooking = {
      date,
      pname,
      address,
      email,
      contact,
      adult,
      children,
      country: tour.country,
      price: Number(tour.price.split("$")[1]) * adult + children / 2,
    };

    if (
      !date ||
      !pname ||
      !address ||
      !email ||
      !contact ||
      !adult ||
      !children
    ) {
      setError(true);
      return false;
    }

    axiosclient.post("/api/booking/add", newBooking).then(() => {
      Swal.fire(
        "Tour Package Selected",
        "Tour Package Selected Successfully",
        "success"
      ).then(() => {
        navigate("/");
      });
    });
  }

  function addition() {
    setTotal(adult * 100 + children * 50);
  }

  return (
    <div className="dark:bg-gray-900 h-full overflow-y-auto">
      <form class="mt-24 flex flex-col gap-4 px-60 py-10" onSubmit={sendData}>
        <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
          Book a Package
        </h3>
        <div>
          <input
            name="date"
            type="date"
            id="date"
            value={date}
            class={`input ${error && !date && "input-error"}`}
            placeholder="Enter Date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          {error && !date && (
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Date"}
            </p>
          )}
        </div>

        <div>
          <input
            name="pname"
            type="text"
            id="pname"
            value={pname}
            class={`input ${error && !pname && "input-error"}`}
            placeholder="Enter Your Name"
            onChange={(e) => {
              setPname(e.target.value);
            }}
          />
          {error && !pname && (
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Your Name"}
            </p>
          )}
        </div>

        <div>
          <input
            name="address"
            type="text"
            id="address"
            value={address}
            class={`input ${error && !address && "input-error"}`}
            placeholder="Enter Your Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          {error && !address && (
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Your Address"}
            </p>
          )}
        </div>

        <div>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            class={`input ${error && !email && "input-error"}`}
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {error && !email && (
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Your Email"}
            </p>
          )}
        </div>

        <div>
          <input
            name="contact"
            type="text"
            id="contact"
            value={contact}
            class={`input ${error && !contact && "input-error"}`}
            placeholder="Enter Your Contact Number"
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
          {error && !contact && (
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Your Contact Number"}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              name="adult"
              type="number"
              id="adult"
              value={adult}
              class={`input ${error && !adult && "input-error"}`}
              placeholder="Enter no of Adults"
              onChange={(e) => {
                setAdult(+e.target.value);
              }}
            />
            {error && !adult && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" Please Enter no of Adults"}
              </p>
            )}
          </div>

          <div>
            <div>
              <input
                name="children"
                type="number"
                id="children"
                value={children}
                class={`input ${error && !children && "input-error"}`}
                placeholder="Enter no of Children"
                onChange={(e) => {
                  setChildren(+e.target.value);
                }}
              />
              {error && !children && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" Please Enter no of Children"}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="h-10 w-full focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
