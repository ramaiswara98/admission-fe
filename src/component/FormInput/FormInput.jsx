import React from "react";

function FormInput(props) {
  return (
    <div className="mb-4">
      <p className="font-invisible">{props.label}</p>
      <input type={props.type} class="form-input px-4 py-3 rounded-md w-96" />
    </div>
  );
}

export default FormInput;
