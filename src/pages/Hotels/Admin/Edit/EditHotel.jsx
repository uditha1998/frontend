import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminLayout } from "../../../../layouts";
import Swal from "sweetalert2";
import axios from "axios";

const EditHotel = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [place, setName] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [noRooms, setNoofRooms] = useState("");
  const [noPerson, setPersons] = useState("");
  const [checkDate, setCheckDate] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState("");
  const [editedHotelID, setEditedhotelID] = useState("");

  useEffect(() => {
    setName(state.hotels.place);
    setHotelName(state.hotels.hotelName);
    setNoofRooms(state.hotels.noRooms);
    setPersons(state.hotels.noPerson);
    setCheckDate(state.hotels.checkDate);
    setPrice(state.hotels.price);
    setDescription(state.hotels.description);
    setImgUrl(state.hotels.imgUrl);
    setStatus(state.hotels.status);
    setEditedhotelID(state.hotels._id);
  }, []);

  function sendSubmit(e) {
    e.preventDefault();

    const newHotel = {
      place,
      hotelName,
      noRooms,
      noPerson,
      checkDate,
      price,
      description,
      imgUrl,
      status,
    };

    axios
      .put(`http://localhost:5000/api/hotel/update/${editedHotelID}`, newHotel)
      .then(() => {
        Swal.fire(
          "Hotel Edit",
          "Hotel Details Successfully Updated",
          "success"
        ).then(() => {
          navigate("/admin/hotels");
        });
      });
  }

  return (
    <div>
      <AdminLayout>
        <div className="dark:bg-gray-900 h-full overflow-y-auto">
          <form class="flex flex-col gap-4 px-60 py-10" onSubmit={sendSubmit}>
            <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
              Hotels - Update a Hotel
            </h3>
            <div>
              <input
                name="name"
                type="text"
                id="place"
                value={place}
                class="input"
                placeholder="Place"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                name="hotelName"
                type="text"
                id="country"
                value={hotelName}
                class="input"
                placeholder="Hotel Name"
                onChange={(e) => {
                  setHotelName(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  name="noOfRooms"
                  type="text"
                  id="country"
                  value={noRooms}
                  class="input"
                  placeholder="No of rooms"
                  onChange={(e) => {
                    setNoofRooms(e.target.value);
                  }}
                />
              </div>

              <div>
                <input
                  name="country"
                  type="text"
                  id="country"
                  value={noPerson}
                  class="input"
                  placeholder="No of persons"
                  onChange={(e) => {
                    setPersons(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  name="country"
                  type="text"
                  id="country"
                  value={checkDate}
                  class="input"
                  placeholder="Checkin Date"
                  onChange={(e) => {
                    setCheckDate(e.target.value);
                  }}
                />
              </div>

              <div>
                <div>
                  <input
                    name="country"
                    type="text"
                    id="country"
                    value={price}
                    class="input"
                    placeholder="Price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <input
                name="country"
                type="text"
                id="country"
                value={imgUrl}
                class="input"
                placeholder="Image"
                onChange={(e) => {
                  setImgUrl(e.target.value);
                }}
              />
            </div>

            <div>
              <textarea
                name="country"
                type="text"
                id="country"
                value={description}
                class="input"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  id="status"
                  name="status"
                  class="input"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option selected="">Availability</option>
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              class="h-10 w-full focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
            >
              Edit
            </button>
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

export default EditHotel;
