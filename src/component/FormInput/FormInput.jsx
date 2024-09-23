import React from "react";

function FormInput(props) {
  return (
    <div className="mb-4">
      <p className="font-invisible">{props.label}</p>
      <input type={props.type} className="form-input px-4 py-3 rounded-md w-96" name={props.name} value={props.value} onChange={(e) =>{props.onChange(e)}}/>
    </div>
  );
}

export default FormInput;
