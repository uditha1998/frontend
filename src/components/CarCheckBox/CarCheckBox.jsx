import React from 'react'
const CarCheckBox = (props) => {
  return (
    <div class="flex items-center justify-between">
    <div className="flex items-center">
      <input
        id="checked-checkbox"
        type="checkbox"
        value=""
        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for="checked-checkbox"
        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
       {props.type}
      </label>
    </div>
    <div>
      <p class="text-xs font-bold text-orange-500 dark:text-white">
        {props.amount}
      </p>
    </div>
  </div>
  )
}
export default CarCheckBox