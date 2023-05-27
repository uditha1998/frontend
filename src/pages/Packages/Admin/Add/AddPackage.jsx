import axios from "axios";
import React,{useState} from "react";
import { AdminLayout, AdminRoute } from "../../../../layouts";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { axiosclient } from "../../../../api";

const AddPackage = () => {

  const [error,setError] = useState(false);
  const navigate = useNavigate();

    const[country, setCountry] = useState("");
    const[name,setName] = useState("");
    const[price,setPrice] = useState("");
    const[hotel,setHotel] = useState("");
    const[url,setUrl] = useState("");
    const[flight,setFlight] = useState("");
    const[meal,setMeal] = useState("");
    const[visa,setVisa] = useState("");
    const[inclusion,setInclusion] = useState("");
    const[day,setDay] = useState("");
    const[night,setNight] = useState("");
    const[description,setDescription] = useState("");

    function sendData(e){
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
        description
      }

      if (!country || !name || !price || !hotel || !url || !flight || !meal || !visa || !inclusion || !day || !night || !description){
        setError(true);
        return false;
      }

      axiosclient.post("/api/tour/add",newTour)
      .then(()=>{
        Swal.fire(
        "Tour Package Added", 
        "Tour Package Added Successfully", 
        "success"
        ).then(()=>{
          navigate("/admin/packages");
       });
      });
      }

  return (
    <AdminRoute>
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full overflow-y-auto">
        <form class="flex flex-col gap-4 px-60 py-10" onSubmit={sendData}>
          <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
            Package - Add a Package
          </h3>
          <div>
            <input
              name="country"
              type="text"
              id="country"
              value={country}
              class={`input ${
                error && !country  && "input-error"
              }`}
              placeholder="Enter Country Name"
              onChange={(e)=>{
                setCountry(e.target.value);
              }}
            />
            { error && !country &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Country Name"}
            </p>
            } 
          </div>

          <div>
            <input
              name="name"
              type="text"
              id="name"
              value={name}
              class={`input ${
                error && !name  && "input-error"
              }`}
              placeholder="Enter Package Name"
              onChange={(e)=>{
                setName(e.target.value);
              }}
            />
            { error && !name &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Package Name"}
            </p>
            } 
          </div>

          <div>
            <input
              name="price"
              type="text"
              id="price"
              value={price}
              class={`input ${
                error && !price  && "input-error"
              }`}
              placeholder="Enter Package Price"
              onChange={(e)=>{
                setPrice(e.target.value);
              }}
            />
            { error && !price &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Package Price"}
            </p>
            } 
          </div>

          <div>
            <input
              name="hotel"
              type="text"
              id="hotel"
              value={hotel}
              class={`input ${
                error && !hotel  && "input-error"
              }`}
              placeholder="Accomodation"
              onChange={(e)=>{
                setHotel(e.target.value);
              }}
            />
            { error && !hotel &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Hotel Name"}
            </p>
            } 
          </div>

          <div>
            <input
              name="url"
              type="text"
              id="url"
              value={url}
              class={`input ${
                error && !url  && "input-error"
              }`}
              placeholder="Enter Hotel Image URL"
              onChange={(e)=>{
                setUrl(e.target.value);
              }}
            />
            { error && !url &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Hotel Image URL"}
            </p>
            } 
          </div>

          <div>
            <input
              name="flight"
              type="text"
              id="flight"
              value={flight}
              class={`input ${
                error && !flight  && "input-error"
              }`}
              placeholder="Flight Details"
              onChange={(e)=>{
                setFlight(e.target.value);
              }}
            />
            { error && !flight &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Flight Details"}
            </p>
            } 
          </div>

          <div>
            <input
              name="meal"
              type="text"
              id="meal"
              value={meal}
              class={`input ${
                error && !meal  && "input-error"
              }`}
              placeholder="Meals"
              onChange={(e)=>{
                setMeal(e.target.value);
              }}
            />
            { error && !meal &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Meal Details"}
            </p>
            } 
          </div>

          <div>
            <input
              name="visa"
              type="text"
              id="visa"
              value={visa}
              class={`input ${
                error && !visa  && "input-error"
              }`}
              placeholder="Visa, Passport & Insurance"
              onChange={(e)=>{
                setVisa(e.target.value);
              }}
            />
            { error && !visa &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Visa, Passport & Insurance Details"}
            </p>
            } 
          </div>

          <div>
            <input
              name="inclusion"
              type="text"
              id="inclusion"
              value={inclusion}
              class={`input ${
                error && !inclusion  && "input-error"
              }`}
              placeholder="Package Inclusions"
              onChange={(e)=>{
                setInclusion(e.target.value);
              }}
            />
            { error && !inclusion &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Package Inclusions"}
            </p>
            } 
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
              name="day"
              type="text"
              id="day"
              value={day}
              class={`input ${
                error && !day  && "input-error"
              }`}
              placeholder="Enter no of Days"
              onChange={(e)=>{
                setDay(e.target.value);
              }}>
                <option value="">--No of Days--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
            </select>
            { error && !day &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter no of Days"}
            </p>
            } 
            </div>

            <div>
              <div>
              <select
              name="night"
              type="text"
              id="night"
              value={night}
              class={`input ${
                error && !night  && "input-error"
              }`}
              placeholder="Enter no of Nights"onChange={(e)=>{
                setNight(e.target.value);
              }}>
                <option value="">--No of Nights--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
            </select>
            { error && !night &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter no of Nights"}
            </p>
            } 
              </div>
            </div>
          </div>

          <div>
            <textarea
              name="description"
              type="textarea"
              rows="4"
              cols="50"
              id="description"
              value={description}
              class={`input ${
                error && !description  && "input-error"
              }`}
              placeholder="Enter Package Description"
              onChange={(e)=>{
                setDescription(e.target.value);
              }}
            />
            { error && !description &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {" Please Enter Package Description"}
            </p>
            } 
          </div>

          <button
            type="submit"
            class="h-10 w-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
          >
            Submit
          </button>
        </form>
      </div>
      </AdminLayout>
      </AdminRoute>
  );
};

export default AddPackage;
