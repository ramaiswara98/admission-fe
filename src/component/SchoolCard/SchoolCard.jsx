import React, { Image } from "react";

import SchoolDefault from "../../assets/images/school.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons"

function SchoolCard({ schoolName, schoolType, schoolAddress, schoolArea,schoolCurriculum,schoolLanguage, schoolId, schoolLogo }) {
  return (
    <div className="bg-white p-4 rounded-sm flex flex-row justify-between items-center my-4 cursor-pointer" onClick={()=>{ window.location.href = '/schools/'+schoolType+'/'+schoolId}}>
      <div className="flex flex-row gap-4 items-center">
        <div className="h-44 w-44 flex flex-row items-center justify-center bg-gray-300 rounded-md">
        <img src={schoolLogo !== null ? schoolLogo:SchoolDefault} className={"w-36 h-36 rounded-md"} />
        </div>
        <div>
          <p className="font-invisible text-2xl">{schoolName}</p>
          {schoolType == 0 ? (
            <div className="flex flex-row gap-3 items-start">
            
            <div>
              <p className="font-sans  mt-[-4px]">
               <span className="font-invisible">{schoolArea}</span>
              </p>
              <p className="font-sans">
                <span className="font-invisible">{schoolAddress}</span>
              </p>
              </div>
              {/* <p className="font-sans">
                Yearly Fees: <span className="font-invisible">IB</span>
              </p> */}
              </div>
          ) : (
            <>
              <p className="font-sans">
                Curriculum: <span className="font-invisible">{schoolCurriculum}</span>
              </p>
              <p className="font-sans">
                Language Of Instruction:{" "}
                <span className="font-invisible">{schoolLanguage}</span>
              </p>
              <p className="font-sans"><FontAwesomeIcon icon={faLocationDot} /> 
                <span className="font-invisible"> {schoolAddress}</span>
              </p>
              {/* <p className="font-sans">
                Yearly Fees: <span className="font-invisible">IB</span>
              </p> */}
            </>
          )}
        </div>
      </div>

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7373283412676!2d103.83846217587205!3d1.3337735986535875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da175cf71bbd25%3A0xff72342339285cab!2s490%20Thomson%20Rd%2C%20Singapore%20298191!5e0!3m2!1sid!2sid!4v1729187888477!5m2!1sid!2sid"
          width="150"
          height="150"
          className="rounded-lg"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default SchoolCard;
