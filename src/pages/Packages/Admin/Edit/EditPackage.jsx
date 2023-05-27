import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminLayout, AdminRoute } from "../../../../layouts";
import Swal from "sweetalert2";
import axios from "axios";

function EditPackage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [hotel, setHotel] = useState("");
  const [url, setUrl] = useState("");
  const [flight, setFlight] = useState("");
  const [meal, setMeal] = useState("");
  const [visa, setVisa] = useState("");
  const [inclusion, setInclusion] = useState("");
  const [day, setDay] = useState("");
  const [night, setNight] = useState("");
  const [description, setDescription] = useState("");
  const [editedTourID, setEditedTourID] = useState("");

  useEffect(() => {
    setCountry(state.tour.country);
    setName(state.tour.name);
    setPrice(state.tour.price);
    setHotel(state.tour.hotel);
    setUrl(state.tour.url);
    setFlight(state.tour.flight);
    setMeal(state.tour.meal);
    setVisa(state.tour.visa);
    setInclusion(state.tour.inclusion);
    setDay(state.tour.day);
    setNight(state.tour.night);
    setDescription(state.tour.description);
    setEditedTourID(state.tour._id);
  }, []);

  function sendTour(e) {
    e.preventDefault();

    const newTour = {
      country,
      name,
      price,
      hotel,
      url,
      flight,
      meal,
      visa,
      inclusion,
      day,
      night,
      description,
    };

    axios
      .put(`http://localhost:5000/api/tour/update/${editedTourID}`, newTour)
      .then(() => {
        Swal.fire(
          "Tour Package Edit",
          "Tour Package Details Successfully Updated",
          "success"
        ).then(() => {
          navigate("/admin/packages");
        });
      });
  }

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="dark:bg-gray-900 h-full overflow-y-auto">
          <form class="flex flex-col gap-4 px-60 py-10" onSubmit={sendTour}>
            <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
              Package - Edit a Package
            </h3>
            <div>
              <input
                name="country"
                type="text"
                id="country"
                className="input"
                value={country}
                placeholder="Enter Country Name"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                name="name"
                type="text"
                id="name"
                className="input"
                value={name}
                placeholder="Enter Package Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                name="price"
                type="text"
                id="price"
                className="input"
                value={price}
                placeholder="Enter Package Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                name="hotel"
                type="text"
                id="hotel"
                className="input"
                value={hotel}
                placeholder="Enter Hotel Name"
                onChange={(e) => {
                  setHotel(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                name="url"
                type="text"
                id="url"
                className="input"
                value={url}
                placeholder="Enter Hotel Image URL"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                name="flight"
                type="text"
                id="flight"
                className="input"
                value={flight}
                placeholder="Enter Flight Details"
                onChange={(e) => {
                  setFlight(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                name="meal"
                type="text"
                id="meal"
                className="input"
                value={meal}
                placeholder="Enter Meal Details"
                onChange={(e) => {
                  setMeal(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                name="visa"
                type="text"
                id="visa"
                className="input"
                value={visa}
                placeholder="Enter Visa, Passport & Insurance Details"
                onChange={(e) => {
                  setVisa(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                name="inclusion"
                type="text"
                id="inclusion"
                className="input"
                value={inclusion}
                placeholder="Enter Package Inclusions"
                onChange={(e) => {
                  setInclusion(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  name="day"
                  type="text"
                  id="day"
                  className="input"
                  value={day}
                  placeholder="Enter no of Days"
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                >
                  <option value="">--No of Days--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div>
                <div>
                  <select
                    name="night"
                    type="text"
                    id="night"
                    className="input"
                    value={night}
                    placeholder="Enter no of Nights"
                    onChange={(e) => {
                      setNight(e.target.value);
                    }}
                  >
                    <option value="">--No of Nights--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <input
                name="description"
                type="text"
                id="description"
                className="input"
                value={description}
                placeholder="Enter Package Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
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
    </AdminRoute>
  );
}

export default EditPackage;
