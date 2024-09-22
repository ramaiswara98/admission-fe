import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

function Button(props) {
  return (
    <div className="font-invisible text-white bg-red-600 rounded-md px-8 py-2 text-center w-fit cursor-pointer" onClick={props.onClick}>
        {props.social?(
            <div className="flex flex-row justify-center items-center gap-2">
                <FontAwesomeIcon icon={props.icon} className="text-white"/>
                {props.text}</div>
        ):(
             props.text
        )}
     
    </div>
  );
}

export default Button;
