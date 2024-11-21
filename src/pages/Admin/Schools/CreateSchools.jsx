import React, { useEffect, useState } from "react";
import TopNav from "../../../component/TopNav/TopNav";
import LeftNav from "../../../component/LeftNav/LeftNav";
import Button from "../../../component/Button/Button";
import FormInput from "../../../component/FormInput/FormInput";
import Radio from "../../../component/Radio/Radio";
import areasAPI from "../../../api/areas";
import schoolsAPI from "../../../api/schools";

function CreateSchools() {
  const [areaList, setAreaList] = useState([]);
  const [schoolType, setSchoolType] = useState("");
  const [schoolAgeLevel, setSchoolAgeLevel] = useState(null);
  const [schoolName, setSchoolName] = useState("");
  const [schoolArea, setSchoolArea] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [minimumAge, setMinimumAge] = useState(0);
  const [maximumAge, setMaximumAge]= useState(0);

  useEffect(() => {
    const getAreasData = async () => {
      const area = await areasAPI.getAllAreas();
      if (area.status == "success") {
        const list = area.data;
        setAreaList(list);
      } else {
      }
    };

    getAreasData();
  }, []);


  const onSelectChange = (e) => {
    console.log(e.target.value);
    if(e.target.name == 'school-type'){
      setSchoolType(e.target.value);
    }
    if(e.target.name == 'school-age-level'){
      setSchoolAgeLevel(e.target.value)
    }
    if(e.target.name == 'school-area'){
      setSchoolArea(e.target.value)
    }
  }

  const onInputChange = (e)=> {
    if(e.target.name == "school-name"){
      setSchoolName(e.target.value)
    }

    if(e.target.name  == "school-address"){
      setSchoolAddress(e.target.value)
    }

    if(e.target.name  == "minimum-age"){
      setMinimumAge(e.target.value)
    }

    if(e.target.name  == "maximum-age"){
      setMaximumAge(e.target.value)
    }
  }

  const onCreateNewSchoolsClicked = async() => {
    const data ={
      schoolType,
      schoolAgeLevel,
      schoolName,
      schoolArea,
      schoolAddress,
      minimumAge,
      maximumAge
    }
    await sendToServer(data);
  }

  const sendToServer = async(data) => {
    const schools = await schoolsAPI.createNewSchools(data);
    if(schools.status == "success"){
      window.location.href = '/admin/edit-schools/'+schools.data.insertId
    }
    //console.log(schools);
  }

  return (
    <div>
      <TopNav />
      <div className="flex flex-row gap-1 h-min-screen h-fit">
        <LeftNav menu={"schools"} submenu={"none"} />
        <div className="bg-white w-full py-4 px-4">
          <p className="font-invisible text-2xl">Create New School</p>
          <div className={"bg-red-600 w-10 h-1 mb-4"}></div>
          <div className="my-4 flex flex-col">
          <p className="font-invisible mb-2">School Type:</p>
          <select className="form-input px-4 py-3 rounded-md w-96" name="school-type" value={schoolType} onChange={(e)=> {onSelectChange(e)}}>
            <option disabled value={""}>Select School Type</option>
             <option value={0}>Goverment</option>
             <option value={1}>International</option>
            </select>
            </div>
            <div className="my-4 flex flex-col">
          <p className="font-invisible mb-2">School Age Level:</p>
          {schoolType == 1? (
            <div className=" flex flex-row gap-4">
            <FormInput label={"Minimum Age"} width={"w-32"} name={"minimum-age"} value={minimumAge} onChange={(e)=>{onInputChange(e)}}/>
            <FormInput label={"Maximum Age"} width={"w-32"} name={"maximum-age"} value={maximumAge} onChange={(e)=>{onInputChange(e)}}/>
          </div>
          ):(
            <select className="form-input px-4 py-3 rounded-md w-96" name="school-age-level" value={schoolAgeLevel} onChange={(e)=>{onSelectChange(e)}}>
              <option disabled value={""} className="">Select School Age Level</option>
             <option value={1}>3-5</option>
             <option value={2}>6-11</option>
             <option value={3}>12-16</option>
             <option value={4}>17-18</option>
            </select>
          )
        
        }
            </div>
          <FormInput label="School Name" name={"school-name"} value={schoolName} onChange={(e)=>{onInputChange(e)}}/>
          <div className="my-4 flex flex-col">
            <p className="font-invisible">School Area</p>
            <select className="form-input px-4 py-3 rounded-md w-96" name="school-area" onChange={(e)=>{onSelectChange(e)}} value={schoolArea}>
              <option disabled value={""}>Select School Area</option>
              {areaList.length > 0 &&
                areaList.map((area, index) => {
                  return <option key={area.id} value={area.id}>{area.area_name}</option>;
                })}
            </select>
          </div>
          <FormInput label="School Address" name={"school-address"} value={schoolAddress} onChange={(e)=>{onInputChange(e)}}/>
          
          <Button text={"Create New School"} onClick={()=> {onCreateNewSchoolsClicked()}}/>
        </div>
      </div>
    </div>
  );
}

export default CreateSchools;
