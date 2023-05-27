import React, { Component } from "react";
import { useParams, useNavigate } from "react-router";
import { useGlobalState } from "../../../utils";
import { axiosclient } from "../../../api";
import Swal from "sweetalert2";

function withParams(Component) {
  // const [packageid, setpackageId] = useGlobalState("packageid");

  return (props) => (
    <Component
      {...props}
      params={useParams()}
      state={useGlobalState("packageid")}
      navigate={useNavigate()}
    />
  );
}

class CarDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      report: {},
      error: null,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    console.log(value);

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const [packageId, setPackageID] = this.props.state;

    const { PicL, PicD, PicT, DropL, DropD, DropT } = this.state;
    // console.log(this.state);
    // if (
    //   PicL.length <= 0 ||
    //   PicD.length <= 0 ||
    //   PicT.length <= 0 ||
    //   DropL.length <= 0 ||
    //   DropD.length <= 0 ||
    //   DropT.length <= 0
    // ) {
    //   this.setState({
    //     ...this.state,
    //     error: "All the fields are required",
    //   });
    //   return;
    // }

    const data = {
      PicL: PicL,
      PicD: PicD,
      PicT: PicT,
      DropL: DropL,
      DropD: DropD,
      DropT: DropT,
    };

    const datefirst = data.PicD;
    const datesecond = data.DropD;

    const datesplit = datefirst.split("-");
    const datesplit2 = datesecond.split("-");

    var date1 = new Date(
      Number(datesplit[0]),
      Number(datesplit[1]),
      Number(datesplit[2])
    );
    var date2 = new Date(
      Number(datesplit2[0]),
      Number(datesplit2[1]),
      Number(datesplit2[2])
    );

    var diff = new Date(date2.getTime() - date1.getTime());

    const difference = diff.getUTCDate() - 1;

    const createFlight = async () => {
      await axiosclient
        .put(`/api/packages/vehicle/${packageId}`, {
          name: this.state.vehicleName1,
          price: this.state.price10 * difference,
        })
        .then((res) => {
          Swal.fire(
            "Package Created",
            "You package has been created successfully! We'll process your package manually",
            "success"
          ).then(() => {
            this.props.navigate("/");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    createFlight();
  };

  componentDidMount() {
    const id = this.props.params.id;
    axiosclient.get(`/api/vehicles/oneV/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          vehicleName1: res.data.vehicle.vehicleName,
          vehicleModela: res.data.vehicle.vehicleModel,
          vehicleNumber2: res.data.vehicle.vehicleNumber,
          imgURL3: res.data.vehicle.imgURL,
          year4: res.data.vehicle.year,
          type5: res.data.vehicle.type,
          fule6: res.data.vehicle.fule,
          engine7: res.data.vehicle.engine,
          condition8: res.data.vehicle.condition,
          status9: res.data.vehicle.status,
          price10: res.data.vehicle.price,
        });
      }
    });
  }

  render() {
    return (
      <div className="w-screen min-h-screen dark:bg-gray-900">
        <div className="flex items-center justify-center w-full overflow-x-hidden px-2 bg-cover h-[60vh] bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/sliit45/image/upload/v1661616769/SPMAPP/Rectangle_3_jfrxmm.webp')]">
          <div>
            <p className="text-5xl text-white dark:text-white">
              your choice is {this.state.type5}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 px-24  py-10">
          <div className="card w-full bg-white rounded shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="block bg-[#FF7E36] rounded-tl rounded-tr">
              <h5 className="bg-blue-900 px-12 py-3 text-white text-2xl font-bold tracking-tight   dark:text-white">
                {this.state.vehicleName1} - {this.state.vehicleModela}
              </h5>
            </div>
            <div className="">
              <img
                src={this.state.imgURL3}
                alt=""
                className="w-full object-cover h-full"
              />
            </div>

            <ul className="p-10 mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  Year :{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {this.state.year4}
                  </span>
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  Number :{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {this.state.vehicleNumber2}
                  </span>
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  Vehicle Type:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {this.state.type5}
                  </span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  Fule:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {this.state.fule6}
                  </span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  Engine CC:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {this.state.engine7}
                  </span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  Condition:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {this.state.condition8}
                  </span>
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  Status:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {this.state.status9}
                  </span>
                </span>
              </li>
            </ul>

            <div className="block bg-[#FF7E36] rounded-bl rounded-br">
              <h5 className="bg-blue-900 px-10 py-3 text-white text-2xl font-bold tracking-tight   dark:text-white">
                Price {this.state.price10}/Per Day
              </h5>
            </div>
          </div>

          <div className="relative card w-full bg-white rounded shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="block bg-[#FF7E36] rounded-tl rounded-tr">
              <h5 className="bg-blue-900 px-10 py-3 text-white text-2xl font-bold tracking-tight   dark:text-white">
                Book this vehicle now
              </h5>
            </div>

            <div className="px-10">
              <form className="w-full mt-5 h-full gap-5 flex flex-col justify-evenly">
                {/* <div>
                  <label
                    for="confirm_password1"
                    class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    SELECT PICK-UP LOCATION */}
                {/* </label>
                  <select
                    id="countries"
                    className="input"
                    name="PicL"
                    value={this.state.PicL}
                    onChange={this.handleInputChange}
                  >
                    <option selected="">Location</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Kandy">Kandy</option>
                  </select>
                </div> */}
                {/* {this.state.error && this.state.error.length > 0 && (
                  <h3 style={{ color: "#e60000" }}>  </h3>
                )} */}

                <div>
                  <label
                    for="confirm_password2"
                    class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    PICKUP DATE
                  </label>
                  <input
                    type="date"
                    id="picDate"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Enter Pick Up date"
                    name="PicD"
                    value={this.state.PicD}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    for="confirm_password3"
                    class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    PICKUP TIME
                  </label>
                  <input
                    type="time"
                    id="picTime"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Enter PickUp Time"
                    name="PicT"
                    value={this.state.PicT}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                {/* <div>
                  <label
                    for="confirm_password4"
                    class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    DROP OFF LOCATION
                  </label>
                  <select
                    id="countries"
                    className="input"
                    name="DropL"
                    value={this.state.DropL}
                    onChange={this.handleInputChange}
                  >
                    <option selected="">Location</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Kandy">Kandy</option>
                  </select>
                </div> */}

                <div>
                  <label
                    for="confirm_password5"
                    class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    DROP OFF DATE
                  </label>
                  <input
                    type="date"
                    id="drpDate"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Enter DROP OFF DATE"
                    name="DropD"
                    value={this.state.DropD}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    for="confirm_password6"
                    class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    DROP OFF TIME
                  </label>
                  <input
                    type="time"
                    id="prdTime"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Enter DROP OFF TIME"
                    name="DropT"
                    value={this.state.DropT}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <button
                  type="button"
                  class="absolute left-0 w-full bottom-0 h-14 focus:outline-none text-white bg-blue-900 hover:bg-orange-600  font-medium rounded-bl rounded-br text-sm px-5 py-2.5"
                  onClick={this.onSubmit}
                >
                  Book Car
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(CarDetails);
