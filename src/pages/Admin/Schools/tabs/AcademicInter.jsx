import React, { useEffect, useState } from 'react'

import schoolsAPI from '../../../../api/schools'
import CostumeSelect from '../../../../component/CostumeSelect/CostumeSelect'
import FormInput from '../../../../component/FormInput/FormInput'
import Alert from '../../../../component/Alert/Alert';
import Button from '../../../../component/Button/Button';

function AcademicInter(props) {
    const school_id = props.id;
    const [curriculumOptions, setCurriculumOptions] = useState([]);
    const [selectedCurriculum, setSelectedCurriculum] = useState([]);
    const [curriculumAlert, setCurriculumAlert] = useState("")
    const [languageOptions, setLanguageOptions] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [languageAlert, setLanguageAlert] = useState("")
    const [average, setAverage] = useState("");
    const [maximum, setMaximum] = useState("");
    const [classAlert, setClassAlert]= useState("");

    useEffect(() => {
        getCurriculumnInter();
        getSchoolCurriculumInter();
        getLanguageInterList();
        getSchoolLanguageInter();
        getSchoolClasses();
    },[])


    const getCurriculumnInter = async() => {
        const curriculumList = await schoolsAPI.getCurriculumInter();
        if(curriculumList.status == "success"){
            const cList = curriculumList.data;
            const cArray =  [];
            await cList.map((curriculum, index) => {
                const intem = {
                    value:curriculum.id,
                    label:curriculum.curriculum
                }
                cArray.push(intem)
            })
            setCurriculumOptions(cArray)
        }else{

        }
    }

    const getSchoolCurriculumInter = async() => {
        const data ={
            school_id
        }
        const schoolCurriculumInterList = await schoolsAPI.getSchoolCurriculumInter(data);
        if(schoolCurriculumInterList.status == "success"){
            const curriculumSchool = schoolCurriculumInterList.data;
            if(curriculumSchool.length > 0){
                const schoolCurriculumArray = [];
                await curriculumSchool.map((item, index) => {
                    const items ={
                        value:item.curriculum_inter_id,
                        label:item.curriculum
                    }
                    schoolCurriculumArray.push(items);
                })
                setSelectedCurriculum(schoolCurriculumArray)
            }
        }
    }

    const getSchoolLanguageInter = async () => { // Updated function name
        const data = {
            school_id
        };
        const schoolLanguageInterList = await schoolsAPI.getSchoolLanguageInter(data); // Updated API call
        if (schoolLanguageInterList.status === "success") {
            const languageSchool = schoolLanguageInterList.data; // Updated variable name
            if (languageSchool.length > 0) {
                const schoolLanguageArray = []; // Updated variable name
                await languageSchool.map((item) => { // Updated variable name
                    const items = {
                        value: item.language_inter_id, // Updated property name
                        label: item.language // Updated property name
                    };
                    schoolLanguageArray.push(items); // Updated variable name
                });
                setSelectedLanguage(schoolLanguageArray); // Updated function call
            }
        }
    };
    

    const getLanguageInterList = async() => {
        const getLanguage = await schoolsAPI.getLanguageInter();
        if(getLanguage.status == "success"){
            const languageList = getLanguage.data;
            if(languageList.length> 0){
                const languageArray = [];
                await languageList.map((language, index) => {
                    const item = {
                        value:language.id,
                        label:language.language
                    }
                    languageArray.push(item);
                })
                setLanguageOptions(languageArray)
            }
        }else{

        }
    }

    const saveCurriculumClicked = async() => {
        const data ={
            school_id,
            curriculum:selectedCurriculum
        }

        const saveData = await schoolsAPI.saveSchoolCurriculumInter(data);
        if(saveData.status == "success"){
            setCurriculumAlert(<Alert type={"success"} message={"successfully save school curriculum"} />)
            setTimeout(()=>{
                setCurriculumAlert("")
            },3000)
        }else{
            setCurriculumAlert(<Alert type={"danger"} message={"failed to save school curriculum, something wrong!"} />)
            setTimeout(()=>{
                setCurriculumAlert("")
            },3000)
        }
    }

    const saveLanguageClicked = async () => { // Updated function name
        const data = {
            school_id,
            language: selectedLanguage // Changed curriculum to language
        };
    
        const saveData = await schoolsAPI.saveSchoolLanguageInter(data); // Updated API call
        if (saveData.status === "success") {
            setLanguageAlert(<Alert type={"success"} message={"successfully saved school language"} />); // Updated message
            setTimeout(() => {
                setLanguageAlert("");
            }, 3000);
        } else {
            setLanguageAlert(<Alert type={"danger"} message={"failed to save school language, something went wrong!"} />); // Updated message
            setTimeout(() => {
                setLanguageAlert("");
            }, 3000);
        }
    };

    const onFormChange = (e) => {
        const target = e.target;
        if(target.name == "average"){
            setAverage(target.value)
        }

        if(target.name == "maximum"){
            setMaximum(target.value)
        }
    }

    const saveClass = async() => {
        const data = {
            school_id,
            average,
            maximum
        }

        const saveData = await schoolsAPI.saveSchoolInterClasses(data);
        if(saveData.status == "success"){
            setClassAlert(<Alert type={"success"} message={"Successfully save class size"}/>)
            setTimeout(()=> {
                setClassAlert("")
            },3000)
        }else{
            setClassAlert(<Alert type={"danger"} message={"failed to save class size, something wrong!"}/>)
            setTimeout(()=> {
                setClassAlert("")
            },3000)
        }
    }

    const getSchoolClasses = async() => {
        const data = {
            school_id
        }
        const getSchool = await schoolsAPI.getSchoolInterClasses(data);
        if(getSchool.status == "success"){
            const schoolData = getSchool.data;
            console.log(schoolData);
            setAverage(schoolData[0].average);
            setMaximum(schoolData[0].maximum);
        }else{

        }
    }
    
  return (
    <div className=''>
        <div className='my-10'>
            <p className="font-invisible text-xl">Curriculum</p>
            <CostumeSelect isMulti={true} placeholder={"Select Curriculum"} options={curriculumOptions} value={selectedCurriculum} onChange={setSelectedCurriculum}/>
            {curriculumAlert}
            <Button text="Save Curriculum" onClick={() => {saveCurriculumClicked()}}/>
        </div>
        {/* <div>
            <p className="font-invisible text-xl">Learning Qualification</p>
            <CostumeSelect isMulti={true} placeholder={"Select Curriculum"}/>
        </div> */}
        <div className='my-10'>
            <p className="font-invisible text-xl">Language of Instruction</p>
            <CostumeSelect isMulti={true} placeholder={"Select Curriculum"} options={languageOptions} value={selectedLanguage} onChange={setSelectedLanguage}/>
            {languageAlert}
            <Button text="Save Language of Instruction" onClick={() => {saveLanguageClicked()}}/>
        </div>
        <div className='my-10'>
            <p className="font-invisible text-xl">Class Size:</p>
            <div className='flex flex-row gap-8 items-center'>
            <FormInput type={"number"} label={"Average Student / Class"} name={"average"} value={average} onChange={onFormChange} width={"w-20"}/>
            <FormInput type={"number"} label={"Maximum Student / Class"} name={"maximum"} value={maximum} onChange={onFormChange} width={"w-20"}/>
            </div>
            {classAlert}
            <Button text={"Save Class Size"} onClick={() => {saveClass()}}/>
        </div>
    </div>
  )
}

export default AcademicInter