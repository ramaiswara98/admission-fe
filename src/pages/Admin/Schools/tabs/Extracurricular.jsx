import React, { useEffect, useState } from "react";


import CostumeSelect from "../../../../component/CostumeSelect/CostumeSelect";
import Button from "../../../../component/Button/Button";
import schoolsAPI from "../../../../api/schools";
import Alert from "../../../../component/Alert/Alert";

function Extracurricular(props) {
  const school_id = props.id;
  const [ccas,setCcas] = useState([]);
  const [selectedCcas, setSelectedCcas] = useState([]);
  const [ccasAlert, setCcasAlert] = useState("");
  const [dsa, setDsa] = useState([]);
  const [selectedDSA, setSelectedDSA] = useState([]);
  const [dsaAlert, setDsaAlert] = useState("");


  useEffect(()=> {
    getCCASLIST();
    getSchoolCCAs();
    getDSATalent();
    getSchoolDSA();
  },[])

  const getCCASLIST = async() => {
    const ccasList = await schoolsAPI.getCCAsList();
    if(ccasList.status == "success"){
        const ccasData = ccasList.data;
        const ccasArray = [];
        await ccasData.map((ccas, index)=> {
            const options = {
                value:ccas.id,
                label:ccas.ccas
            }
            ccasArray.push(options)
        });
        setCcas(ccasArray);
    }else{
        console.log(ccasList)
    }
  }

  const getDSATalent = async() => {
    const dsaTalent = await schoolsAPI.getDSATalentList();
    if(dsaTalent.status == "success"){
        const dsaTalentList = dsaTalent.data;
        const dsaTalentArray =[];
        dsaTalentList.map((talent, index) => {
            const item ={
                value:talent.id,
                label:talent.talent
            }
            dsaTalentArray.push(item);
        })
        setDsa(dsaTalentArray);
    }
  }

  const getSchoolCCAs = async() => {
    const data = {
        school_id
    }
    const schoolCCAs = await schoolsAPI.getSchoolCCAs(data);
    if(schoolCCAs.status == "success"){
        const schoolCCASsList = schoolCCAs.data;
        const schoolCCAsArray = [];
        if(schoolCCASsList.length > 0){
            await schoolCCASsList.map((ccas, index) => {
                const item = {
                    value:ccas.ccas_id,
                    label:ccas.ccas
                }
                schoolCCAsArray.push(item)
            });
            setSelectedCcas(schoolCCAsArray);
        }else{

        }
    } else{

    }
  }

  const getSchoolDSA = async() => {
    const data = {
        school_id
    }

    const schoolDsa =  await schoolsAPI.getSchoolDSAs(data);
    if(schoolDsa.status == "success"){
        const schoolDsaList = schoolDsa.data;
        if(schoolDsaList.length > 0){
            const schoolDsaArray = [];
            await schoolDsaList.map((talent, index) => {
                const item = {
                    value: talent.dsa_talent_id,
                    label:talent.talent
                }
                schoolDsaArray.push(item)
            })
            setSelectedDSA(schoolDsaArray);
        }
    }
  }

  const saveSchoolCCAs = async() => {
    const data = {
        school_id,
        ccas:selectedCcas
    }

    const storeCCAs = await schoolsAPI.saveSchoolCCAs(data);
    console.log(storeCCAs);
    if(storeCCAs.status == "success"){
        setCcasAlert(<Alert type={"success"} message={"successfully save Schools CCAs"} />)
        setTimeout(() => {
            // Code to be executed after 3 seconds
            setCcasAlert("");
          }, 3000);
    }else{
        setCcasAlert(<Alert type={"danger"} message={"failed to save Schools CCAs, something wrong!"} />)
        setTimeout(() => {
            setCcasAlert("");
          }, 3000);

    }
  }

  const onClickSaveDSA = async() => {
    const data = {
        school_id,
        dsa_talents:selectedDSA
    }

    const saveDSA = await schoolsAPI.saveSchoolDSAs(data);
    console.log(saveDSA);
    if(saveDSA.status == "success"){
        setDsaAlert(<Alert type={"success"} message={"Successfully Save School DSA Talent"} />)
        setTimeout(() => {
            setDsaAlert("");
          }, 3000);

    }else{
        setDsaAlert(<Alert type={"danger"} message={"Failed to Save School DSA Talent, something wrong!"} />)
        setTimeout(() => {
            setDsaAlert("");
          }, 3000);

    }
  }
  return (
    <div className="flex flex-row gap-10 my-10">
      <div>
        <p className="font-invisible text-xl">
          Co-Curricular Activities (CCAs)
        </p>
        <CostumeSelect
            isMulti={true}
            options={ccas}
            onChange={setSelectedCcas}
            value={selectedCcas}
        />
        {ccasAlert}
        <Button text={"Sace CCAs"} onClick={()=> {saveSchoolCCAs()}}/>
      </div>
      <div>
        <p className="font-invisible text-xl">
          DSA Talent Areas
        </p>
        <CostumeSelect
            isMulti={true}
            options={dsa}
            value={selectedDSA}
            onChange={setSelectedDSA}
            
        />
        {dsaAlert}
        <Button text={"Save DSA"} onClick={() => {onClickSaveDSA()}}/>
      </div>
    </div>
  );
}

export default Extracurricular;
