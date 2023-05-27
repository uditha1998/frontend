import React from 'react'

const CarCard = (props) => {
  return (
    <figure class="shadow-xl dark:shadow-gray-800 relative max-w-full h-auto transition-all duration-300 cursor-pointer  ">
    <img
      class="rounded-lg w-full"
      src={props.image}
      alt="Sample Destinations"
    />

    <h3 className="absolute bottom-6 px-4 sm:text-large md:text-5xl text-white  font-extrabold dark:text-white">
     {props.name}
    </h3>
  </figure>
  )
}
export default CarCard