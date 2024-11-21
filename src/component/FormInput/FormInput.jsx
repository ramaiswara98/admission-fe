import React from "react";

function FormInput(props) {
  return (
    <div className="mb-4">
      <p className="font-invisible">{props.label}</p>
      {props.type === "textarea" ? (
        <textarea
          className={`form-input px-4 py-3 rounded-md ${props.width ? props.width : 'w-96'}`}
          name={props.name}
          value={props.value}
          onChange={(e) => props.onChange(e)}
          rows={props.rows || 4} // Default number of rows is 4 if not specified
        />
      ) : (
        <>
          {props.currency?(
          <div className="flex flex-row items-center gap-1">
            <div className="bg-gray-300 px-2 py-3 rounded-l-md">
              <p>{props.currency}</p>
            </div>
            <input
            type={props.type}
            className={`form-input px-4 py-3 rounded-r-md ${props.width ? props.width : 'w-96'}`}
            name={props.name}
            value={props.value}
            onChange={(e) => props.onChange(e)}
          />
          </div>):(
            <input
            type={props.type}
            className={`form-input px-4 py-3 rounded-md ${props.width ? props.width : 'w-96'}`}
            name={props.name}
            value={props.value}
            onChange={(e) => props.onChange(e)}
          />
          )}
        </>
        
      )}
    </div>
  );
}

export default FormInput;
