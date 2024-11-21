import React from "react";
import Select from "react-select";

function CostumeSelect({options, onChange, value, isMulti, placeholder}) {
  return (
    <div>
      <Select className="pr-4 py-3 rounded-md w-96" isMulti={isMulti} value={value} options={options} placeholder={placeholder} onChange={(option)=>{onChange(option)}}/>
    </div>
  );
}

export default CostumeSelect;
