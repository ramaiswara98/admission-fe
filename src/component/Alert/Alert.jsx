import React from 'react'

function Alert(props) {
    const type = () => {
        if(props.type == 'danger'){
            return 'bg-red-300 text-red-600'
        }
        if(props.type == 'normal'){
            return 'bg-gray-300 text-gray-600'
        }
        if(props.type == 'success'){
            return 'bg-green-300 text-green-600'
        }
    }
  return (
    <div className={`${type()} font-sans w-full px-2 py-2 rounded-sm my-1`}>
        <p>{props.message}</p>
    </div>
  )
}

export default Alert