import React, { useEffect, useState } from "react";
import TopNav from "../../../component/TopNav/TopNav";
import LeftNav from "../../../component/LeftNav/LeftNav";
import Button from "../../../component/Button/Button";
import FormInput from "../../../component/FormInput/FormInput";
import Radio from "../../../component/Radio/Radio";
import areasAPI from "../../../api/areas";
import schoolsAPI from "../../../api/schools";
import subjectAPI from "../../../api/subject";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleCheck,
  faContactBook,
  faGraduationCap,
  faImage,
  faInfo,
  faInfoCircle,
  faMoneyBill,
  faPersonRunning,
  faTrashCan,
  faWheelchairMove,
} from "@fortawesome/free-solid-svg-icons";
import CostumeSelect from "../../../component/CostumeSelect/CostumeSelect";
import Alert from "../../../component/Alert/Alert";
import Acamedic from "./tabs/acamedic";
import Extracurricular from "./tabs/Extracurricular";
import AcademicInter from "./tabs/AcademicInter";
import ExtracurricularInter from "./tabs/ExtracurricularInter";
import Fees from "./tabs/Fees";
import FeesInter from "./tabs/FeesInter";
import Media from "./tabs/Media";

function EditSchools() {
  const [areaList, setAreaList] = useState([]);
  const [schoolType, setSchoolType] = useState("");
  const [schoolAgeLevel, setSchoolAgeLevel] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolArea, setSchoolArea] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolInfo, setSchoolInfo] = useState("");
  const [minimumAge, setMinimumAge] = useState(0);
  const [maximumAge, setMaximumAge]= useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const [schoolLogo, setSchoolLogo] = useState(null);

  useEffect(() => {
    const getAreasData = async () => {
      const area = await areasAPI.getAllAreas();
      if (area.status == "success") {
        const list = area.data;
        setAreaList(list);
      } else {
      }

      const schools = await schoolsAPI.getSchoolsById(id);
      if (schools.status == "success") {
        const schoolInfos = schools.data[0];
        setSchoolInfo(schools.data[0]);
        setSchoolType(schoolInfos.school_type);
        setSchoolAgeLevel(schoolInfos.school_level);
        setSchoolName(schoolInfos.school_name);
        setSchoolArea(schoolInfos.school_area);
        setSchoolAddress(schoolInfos.school_address);
        setEmail(schoolInfos.email);
        setPhone(schoolInfos.phone);
        setWebsite(schoolInfos.website);
        setMaximumAge(schoolInfos.maximum_age);
        setMinimumAge(schoolInfos.minimum_age)
        setSchoolLogo(schoolInfos.logo);
        
      } else {
      }
    };

    getAreasData();
  }, []);

  const onSelectChange = (e) => {
    if (e.target.name == "school-type") {
      setSchoolType(e.target.value);
    }
    if (e.target.name == "school-age-level") {
      setSchoolAgeLevel(e.target.value);
    }
    if (e.target.name == "school-area") {
      setSchoolArea(e.target.value);
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "school-name") {
      setSchoolName(e.target.value);
    }

    if (e.target.name == "school-address") {
      setSchoolAddress(e.target.value);
    }

    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "phone") {
      setPhone(e.target.value);
    }
    if (e.target.name == "website") {
      setWebsite(e.target.value);
    }
    if(e.target.name  == "minimum-age"){
      setMinimumAge(e.target.value)
    }

    if(e.target.name  == "maximum-age"){
      setMaximumAge(e.target.value)
    }
  };

  const onCreateNewSchoolsClicked = async () => {
    const data = {
      schoolType,
      schoolAgeLevel,
      schoolName,
      schoolArea,
      schoolAddress,
    };
    await sendToServer(data);
  };

  const sendToServer = async (data) => {
    const schools = await schoolsAPI.createNewSchools(data);
    console.log(schools);
  };

  const onTabClicked = (value) => {
    setTab(value);
  };

  const onSaveSchoolContactClicked = async () => {
    const data = {
      email,
      phone,
      website,
      id,
    };

    const setContact = await schoolsAPI.setSchoolContact(data);
    if (setContact.status == "success") {
      window.location.reload();
    }
  };
  return (
    <div>
      <TopNav />
      <div className="flex flex-row gap-1 min-h-screen h-fit">
        <LeftNav menu={"schools"} submenu={"none"} />
        <div className="bg-white w-full py-4 px-4">
          <p className="font-invisible text-2xl">{schoolInfo.school_name}</p>
          <div className={"bg-red-600 w-10 h-1 mb-4"}></div>
          <div className="flex flex-row">
            <div
              className={`py-4 px-4 font-invisible flex flex-row items-center gap-2 hover:bg-gray-400 cursor-pointer ${
                tab == 0 ? "bg-red-600 text-white" : ""
              }`}
              onClick={() => {
                onTabClicked(0);
              }}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                className={`text-xl ${
                  tab == 0 ? "text-white" : "text-blue-950"
                } `}
              />
              <p>School Info</p>
            </div>
            <div
              className={`py-4 px-4 font-invisible flex flex-row items-center gap-2 hover:bg-gray-400 cursor-pointer ${
                tab == 1 ? "bg-red-600 text-white" : ""
              }`}
              onClick={() => {
                onTabClicked(1);
              }}
            >
              <FontAwesomeIcon
                icon={faContactBook}
                className={`text-xl ${
                  tab == 1 ? "text-white" : "text-blue-950"
                } `}
              />
              <p>School Contact</p>
            </div>
            <div
              className={`py-4 px-4 font-invisible flex flex-row items-center gap-2 hover:bg-gray-400 cursor-pointer ${
                tab == 2 ? "bg-red-600 text-white" : ""
              }`}
              onClick={() => {
                onTabClicked(2);
              }}
            >
              <FontAwesomeIcon
                icon={faGraduationCap}
                className={`text-xl ${
                  tab == 2 ? "text-white" : "text-blue-950"
                } `}
              />
              <p>Academic</p>
            </div>
            <div
              className={`py-4 px-4 font-invisible flex flex-row items-center gap-2 hover:bg-gray-400 cursor-pointer ${
                tab == 3 ? "bg-red-600 text-white" : ""
              }`}
              onClick={() => {
                onTabClicked(3);
              }}
            >
              <FontAwesomeIcon
                icon={faPersonRunning}
                className={`text-xl ${
                  tab == 3 ? "text-white" : "text-blue-950"
                } `}
              />
              <p>Extracurricular Activities</p>
            </div>
            <div
              className={`py-4 px-4 font-invisible flex flex-row items-center gap-2 hover:bg-gray-400 cursor-pointer ${
                tab == 4 ? "bg-red-600 text-white" : ""
              }`}
              onClick={() => {
                onTabClicked(4);
              }}
            >
              <FontAwesomeIcon
                icon={faWheelchairMove}
                className={`text-xl ${
                  tab == 4 ? "text-white" : "text-blue-950"
                } `}
              />
              <p>Special Needs Support</p>
            </div>
            <div
              className={`py-4 px-4 font-invisible flex flex-row items-center gap-2 hover:bg-gray-400 cursor-pointer ${
                tab == 5 ? "bg-red-600 text-white" : ""
              }`}
              onClick={() => {
                onTabClicked(5);
              }}
            >
              <FontAwesomeIcon
                icon={faMoneyBill}
                className={`text-xl ${
                  tab == 5 ? "text-white" : "text-blue-950"
                } `}
              />
              <p>Fees</p>
            </div>
            <div
              className={`py-4 px-4 font-invisible flex flex-row items-center gap-2 hover:bg-gray-400 cursor-pointer ${
                tab == 6 ? "bg-red-600 text-white" : ""
              }`}
              onClick={() => {
                onTabClicked(6);
              }}
            >
              <FontAwesomeIcon
                icon={faImage}
                className={`text-xl ${
                  tab == 6 ? "text-white" : "text-blue-950"
                } `}
              />
              <p>Media</p>
            </div>
          </div>
          {tab == 0 && (
            <div>
              <div className="my-4 flex flex-col">
                <p className="font-invisible mb-2">School Type:</p>
                <select
                  className="form-input px-4 py-3 rounded-md w-96"
                  name="school-type"
                  value={schoolType}
                  onChange={(e) => {
                    onSelectChange(e);
                  }}
                >
                  <option disabled value={""}>
                    Select School Type
                  </option>
                  <option value={0}>Goverment</option>
                  <option value={1}>International</option>
                </select>
              </div>
              <div className="my-4 flex flex-col">
                <p className="font-invisible mb-2">School Age Level:</p>
                {schoolType == 1 ? (
                  <div className=" flex flex-row gap-4">
                    <FormInput
                      label={"Minimum Age"}
                      width={"w-32"}
                      name={"minimum-age"}
                      value={minimumAge}
                      onChange={(e) => {
                        onInputChange(e);
                      }}
                    />
                    <FormInput
                      label={"Maximum Age"}
                      width={"w-32"}
                      name={"maximum-age"}
                      value={maximumAge}
                      onChange={(e) => {
                        onInputChange(e);
                      }}
                    />
                  </div>
                ) : (
                  <select
                    className="form-input px-4 py-3 rounded-md w-96"
                    name="school-age-level"
                    value={schoolAgeLevel}
                    onChange={(e) => {
                      onSelectChange(e);
                    }}
                  >
                    <option disabled value={""} className="">
                      Select School Age Level
                    </option>
                    <option value={1}>3-5</option>
                    <option value={2}>6-11</option>
                    <option value={3}>12-16</option>
                    <option value={4}>17-18</option>
                  </select>
                )}
              </div>
              <FormInput
                label="School Name"
                name={"school-name"}
                value={schoolName}
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
              <div className="my-4 flex flex-col">
                <p className="font-invisible">School Area</p>
                <select
                  className="form-input px-4 py-3 rounded-md w-96"
                  name="school-area"
                  onChange={(e) => {
                    onSelectChange(e);
                  }}
                  value={schoolArea}
                >
                  <option disabled value={""}>
                    Select School Area
                  </option>
                  {areaList.length > 0 &&
                    areaList.map((area, index) => {
                      return (
                        <option key={area.id} value={area.id}>
                          {area.area_name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <FormInput
                label="School Address"
                name={"school-address"}
                value={schoolAddress}
                onChange={(e) => {
                  onInputChange(e);
                }}
              />

              <Button
                text={"Save Schools Info"}
                onClick={() => {
                  onCreateNewSchoolsClicked();
                }}
              />
            </div>
          )}
          {tab == 1 && (
            <div className="my-4">
              <FormInput
                label="Email"
                name={"email"}
                value={email}
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
              <FormInput
                label="Phone"
                name={"phone"}
                value={phone}
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
              <FormInput
                label="Website"
                name={"website"}
                value={website}
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
              <Button
                text={"Save Schools Contact"}
                onClick={() => {
                  onSaveSchoolContactClicked();
                }}
              />
            </div>
          )}

          {/* Academic */}
          {tab === 2 && (
            <div>
              {schoolType === 0 ? (
                <Acamedic id={id} />
              ) : (
                <AcademicInter id={id} />
              )}
            </div>
          )}

          {/* Extracurricullar */}
          {tab === 3 && (
            <div>
              {schoolType === 0 ? (
                 <Extracurricular id={id} />
              ) : (
                <ExtracurricularInter id={id} />
              )}
            </div>
          )}

          {/* Fees */}
          {tab === 5 && (
            <div>
              {schoolType === 0 ? (
                 <Fees id={id} />
              ) : (
                <FeesInter id={id} />
              )}
            </div>
          )}

          {/* Media */}
          {tab === 6 && (
            <div>
              {schoolType === 0 ? (
                 <Media id={id} schoolLogo={schoolLogo} />
              ) : (
                <Media id={id} schoolLogo={schoolLogo} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditSchools;
