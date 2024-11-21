import React from 'react'

function Lines({width}) {
  return (
    <div className={`bg-red-600 h-1 mb-4 ${width?width:'w-10'}`}></div>
  )
}

export default Lines