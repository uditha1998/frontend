import React from "react";
const PackageCardIcon = (props) => {
  return (
    <div>
      <div className="bg-blue-900 w-10 h-10 flex items-center justify-center p-4 rounded-full">
        <i className="fa-solid fa-plane-circle-check text-white"></i>
      </div>
      <div>
        <p class="my-1 text-sm   text-gray-900 dark:text-white">{props.name}</p>
      </div>
    </div>
  );
};
export default PackageCardIcon;
