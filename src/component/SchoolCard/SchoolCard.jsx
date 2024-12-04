import React, { Image, useEffect, useState } from "react";
import mapsAPI from "../../api/maps";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import SchoolDefault from "../../assets/images/school.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons"

function SchoolCard({ schoolName, schoolType, schoolAddress, schoolArea,schoolCurriculum,schoolLanguage, schoolId, schoolLogo }) {
  const position= [37.7749, -122.4194];
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

      <div className="">
      <MapContainer center={position} zoom={13} style={{ height: "200px", width: "200px" }}>
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"   

      />
      <Marker position={position}>
        <Popup>
          San   
 Francisco
        </Popup>
      </Marker>
    </MapContainer>
      </div>
    </div>
  );
}

export default SchoolCard;
