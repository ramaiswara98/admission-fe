import React from 'react'

function Button(props) {
  return (
    <div className='font-invisible text-white bg-red-600 rounded-md px-8 py-2 text-center w-fit'>{props.text}</div>
  )
}

export default Button