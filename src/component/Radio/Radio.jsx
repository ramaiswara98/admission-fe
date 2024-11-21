import React from 'react'

function Radio(props) {
  return (
    <div className="flex items-center mb-4">
    <input
      id={props.id}
      type="radio"
      value={props.value}
      name={props.name}
      checked={props.checked}
      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      onChange={(e)=> props.onChange(e)}
    />
    <label
      htmlFor={props.id}
      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"
    >
      {props.text}
    </label>
  </div>
  )
}

export default Radio