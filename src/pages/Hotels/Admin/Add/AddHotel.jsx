import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AdminLayout } from "../../../../layouts";
import {axiosclient} from '../../../../api'
import Swal from "sweetalert2";


const AddHotel = () => {
  const [nameSelected, setNameSelected] = useState(false);

  const [place,setName] = useState("");
  const [hotelName,setHotelName] = useState("");
  const [noRooms,setNoofRooms] = useState("");
  const [noPerson,setPersons] = useState("");
  const [checkDate,setCheckDate] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const [imgUrl,setImgUrl] = useState("");
  const [status,setStatus] = useState("");
  const [error,setError] = useState(false);
  

  const onFormSubmit = (e) => {
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
    }
    
    /*Validation*/
    console.log(!place)
    if(!place || !hotelName ||!noRooms || !noPerson || !checkDate ||!price ||!description || !status){
      setError(true);
      return false;
    }

    Swal.fire({
      title:"Going to add new hotel",
      text:"Do you want to add?",
      icon:"warning",
      buttons: true,
      dangerMode: true
      
    }).then(respuesta=>{
       if(respuesta){
      axiosclient.post("/api/hotel/add",newHotel).then(()=>{
          Swal.fire({text:"Hotel Details Added",
                icon:"success"
                });
    
         
        }).catch((err)=>{
          alert(err)
          console.log(err);
        })
       }
    })

  };


  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full overflow-y-auto">
        <form class="flex flex-col gap-4 px-60 py-10" onSubmit={onFormSubmit}>
          <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
            Hotels - Add a Hotel
          </h3>
          <div>
            <input
              name="name"
              type="text"
              id="place"
              class={`input ${
                error && !place && "input-error"
                }`}
              placeholder="Place"
              onChange={(e)=>{
                setName(e.target.value)
              }}
            />
             {error && !place &&
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                   <span class="font-medium">Please Enter Place Name</span>
             </p>
             }
          </div>

          <div>
            <input
              name="hotelName"
              type="text"
              id="country"
              class={`input ${
                error && !hotelName && "input-error"
                }`}
              placeholder="Hotel Name"
              onChange={(e)=>{
                setHotelName(e.target.value)
              }}
            />
             {error && !hotelName &&
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span class="font-medium">Please Enter Hotel Name</span>
                 </p>
             }
            
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
            <input
              name="country"
              type="text"
              id="country"
              class={`input ${
                error && !noPerson && "input-error"
                }`}
              placeholder="No of persons"
              onChange={(e)=>{
                setPersons(e.target.value)
              }}
            />
              { error && !noPerson &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Please enter no of persons</span>
              </p>
            } 
          </div>

          
          <div>
            <input
              name="noOfRooms"
              type="text"
              id="country"
              class={`input ${
                error && !noRooms && "input-error"
                }`}
              placeholder="No of rooms can book"
              onChange={(e)=>{
                setNoofRooms(e.target.value)
              }}
            />
              { error && !noRooms &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Please enter no of rooms</span>
              </p>
            } 
          </div>

          
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="country"
                type="text"
                id="country"
                class={`input ${
                  error && !checkDate && "input-error"
                  }`}
                placeholder="No of days can stay"
                onChange={(e)=>{
                  setCheckDate(e.target.value)
                }}
              />
                { error && !checkDate &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Please enter no of days can stay</span>
              </p>
            } 
            </div>

            <div>
              <div>
                <input
                  name="country"
                  type="text"
                  id="country"
                  class={`input ${
                    error && !price && "input-error"
                    }`}
                  placeholder="Price"
                  onChange={(e)=>{
                    setPrice(e.target.value)
                  }}
                />
                  { error && !price &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Please enter price with $</span>
              </p>
            } 
              </div>
            </div>
          </div>

          {/* <div className="checkbox-container">
            <input
              name="country"
              type="checkbox"
              className="checkbox"
              id="facilities"
              placeholder="Facilities"
              onChange={() => {
                setNameSelected(!nameSelected);
              }}
            />
            <label htmlFor="facilities">Facilites</label>
          </div> */}

          <div>
            <input
              name="country"
              type="text"
              id="country"
              class={`input ${
                error && !imgUrl && "input-error"
              }`}
              placeholder="Image"
              onChange={(e)=>{
                setImgUrl(e.target.value)
              }}
            />
             { error && !imgUrl &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Please enter Image URL</span>
              </p>
            } 
             
          </div>

          <div>
            <textarea
              name="country"
              type="text"
              id="country"
              class={`input ${
                error && !description && "input-error"
              }`}
              placeholder="Description"
              onChange={(e)=>{
                setDescription(e.target.value)
              }}
            />
              { error && !description &&
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Please enter description</span>
              </p>
            } 
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
          <select id="hotelAvailability" class={`input ${error && !status && "input-error"}`}   onChange={(e) =>{
                setStatus(e.target.value);
              }}>
              <option selected="">Availability</option>
              <option  >Available</option>
              <option  >Unavailable</option>
            </select>
            { error && !status &&
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {" Please Select Availability "}
            </p>
            } 
            </div>
          
          
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
  );
};

export default AddHotel;