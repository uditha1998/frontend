import React, { Component } from 'react'
import { AdminLayout, AdminRoute } from "../../../../layouts";
import { useParams } from "react-router";
import swal from 'sweetalert2';
import { axiosclient } from '../../../../api';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}


class EditCar extends Component{

  constructor(props){
    super(props);
    this.state={
      vehicleName:"",
      vehicleNumber:"",
      vehicleModel:"",
      imgURL:"",
      year:"",
      type:"",
      fule:"",
      engine:"",
      condition:"",
      status:"",
      price:""
    }
}

handleInputChange = (e) =>{
   const {name,value} = e.target;

   this.setState({
    ...this.state,
    [name]:value
   })
}

onSubmit = (e) =>{
   e.preventDefault();
   const id = this.props.params.id;

   const{vehicleName,vehicleNumber,vehicleModel,imgURL,year,type,fule,engine,condition,status,price} = this.state;

   const data ={
    vehicleName:vehicleName,
    vehicleNumber:vehicleNumber,
    vehicleModel:vehicleModel,
    imgURL: imgURL,
    year:year,
    type:type,
    fule:fule,
    engine:engine,
    condition:condition,
    status:status,
    price:price

   }

   console.log(data)


   axiosclient.put(`/api/vehicles/update/${id}`,data).then((res) => {
       if(res.data.success){
        swal.fire("success ", "Vehicle data upadated successfully!", "success");
           this.setState(
               {
                vehicleName:"",
                vehicleNumber:"",
                vehicleModel:"",
                imgURL:"",
                year:"",
                type:"",
                fule:"",
                engine:"",
                condition:"",
                status:"",
                price:""
               });
       }
   });

};


  componentDidMount(){
    const id = this.props.params.id;
     axiosclient.get(`/api/vehicles/oneV/${id}`).then((res)=>{
     
        if(res.data.success){
          this.setState({
            vehicleName:res.data.vehicle.vehicleName, 
            vehicleNumber:res.data.vehicle.vehicleNumber,
            vehicleModel:res.data.vehicle.vehicleModel,
            imgURL:res.data.vehicle.imgURL,
            year:res.data.vehicle.year,
            type:res.data.vehicle.type,
            fule:res.data.vehicle.fule,
            engine:res.data.vehicle.engine,
            condition:res.data.vehicle.condition,
            status:res.data.vehicle.status,
            price:res.data.vehicle.price,
          })
        }
     });
     
  }

  
  render(){
    return (
      <AdminRoute>
      <AdminLayout>
        <div className="dark:bg-gray-900 h-full overflow-y-auto">
          <form className="flex flex-col gap-4 px-60 py-10"  >
            <h3 className="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
              Cars - Add a Car
            </h3>
  
            <div>
   
            <input
              name="vehicleName"
              class="input"
              type="text"
              id="nNam"
              value={this.state.vehicleName}
              placeholder="Vehicle Brand Type"
              onChange={this.handleInputChange}
              required
            />
 
            </div>


            <div>
   
            <input
              name="vehicleModel"
              class="input"
              type="text"
              id="nMod"
              value={this.state.vehicleModel}
              placeholder="Vehicle Model"
              onChange={this.handleInputChange}
              required
            />
 
            </div>

            <div>
  
              <input
                name="vehicleNumber"
                class="input"
                type="text"
                id="nNum"
                value={this.state.vehicleNumber}
                placeholder="Vehicle Number"
                onChange={this.handleInputChange}
                required
              />
            </div>
  
            <div>
              <input
                name="imgURL"
                class="input"
                type="text"
                id="imgurl"
                value={this.state.imgURL}
                placeholder="Img URL"
                onChange={this.handleInputChange}
                required
              />
            </div>
  
            <div>
              <input
                name="year"
                class="input"
                type="text"
                id="year"
                value={this.state.year}
                placeholder="Vehicle YOM"
                onChange={this.handleInputChange}
                required
              />
            </div>
  
  
            <div>
                <input
                  name="engine"
                  class="input"
                  type="text"
                  id="engine"
                  value={this.state.engine}
                  placeholder="Engine CC"
                  onChange={this.handleInputChange}
                  required
                />
              </div>
  
  
              <div>
              <input
                name="price"
                class="input"
                type="text"
                id="price"
                value={this.state.price}
                placeholder="Per day price"
                onChange={this.handleInputChange}
                required
              />
            </div>
              <div>
              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Select an option
              </label>
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <div>
            <select id="type" name="type" class="input"  value={this.state.type} onChange={this.handleInputChange} >
                <option selected="">Vehicle Type</option>
                <option >Van</option>
                <option >Car</option>
                <option >Bus</option>
                <option >SUV</option>
              </select>
              </div>
              <div>
              <select id="fule" name="fule" class="input"  value={this.state.fule} onChange={this.handleInputChange}>
                <option selected="">Fule Type</option>
                <option >Petrol</option>
                <option >Diesel</option>
                <option >Hybrid</option>
              </select>
              </div>
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <div> 
            <select id="status" name="status" class="input" value={this.state.status} onChange={this.handleInputChange}>
                <option selected="">Availability</option>
                <option  >Available</option>
                <option  >Unavailable</option>
              </select>
              </div>
            
            <div>
            <select id="condition" name="condition" class="input"  value={this.state.condition} onChange={this.handleInputChange}>
                <option selected="">Condition</option>
                <option value="Best">Best</option>
                <option value="Normal">Normal</option>
              </select> 
            </div>
            </div>
            <button
            onClick={this.onSubmit}
              type="button"
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
}
export default withParams(EditCar);
