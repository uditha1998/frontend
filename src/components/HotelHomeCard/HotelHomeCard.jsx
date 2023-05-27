import React, { useEffect, useState } from "react";
import {axiosclient} from '../../api'

export const HotelHomeCard = (props) => {


  return (
    <>
  
    <figure class="shadow-xl dark:shadow-gray-800 relative max-w-full h-auto transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
              <img
                class="rounded-lg w-full"
                src={props.imageHotel}
                alt="Sample Destinations"
                style={{width:'720px', height:'420px'}}
              />

              <h3 className="absolute bottom-6 px-4 sm:text-large md:text-5xl text-white  font-extrabold   dark:text-white">
                {props.nameHotel}
              </h3>
    </figure>
 
  </>
 )
}
