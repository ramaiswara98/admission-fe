import React from 'react'

function Modal({open,onClose, children}) {
  return (
    <div
        className={`fixed inset-0 flex justify-center items-center transition-colors
            ${open? "visible bg-black/20":"invisible"}`}
    >
        <div className={`bg-white rounded-md shadow p-6 transition-all
            ${open?"scale-100 opacity-100":"scale-125 opacity-0"}`}>
            {children}
        </div>
        
    </div>
  )
}

export default Modal