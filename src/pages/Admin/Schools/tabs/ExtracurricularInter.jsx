import React, { useState } from 'react'
import FormInput from '../../../../component/FormInput/FormInput'
import Button from '../../../../component/Button/Button'
import schoolsAPI from '../../../../api/schools'
import Alert from '../../../../component/Alert/Alert'

function ExtracurricularInter(props) {
    const school_id = props.id
    const [extracurricular, setExtracurricular] = useState("");
    const [sportActivity, setSportActivity] = useState("");
    const [sportTeam, setSportTeam] = useState("");
    const [extracurricularAlert, setExtracurricularAlert] = useState("");


    const onFormChange = (e) => {
        const target = e.target;
        if(target.name == "extracurricular"){
            setExtracurricular(target.value);
        }

        if(target.name == "sport-activity") {
            setSportActivity(target.value)
        }

        if(target.name == "sport-team"){
            setSportTeam(target.value)
        }
    }

    const onSaveClicked = async() => {
        const data = {
            extracurricular,
            sportActivity,
            sportTeam,
            school_id
        }

        const saveData = await schoolsAPI.saveSchoolInterExtracurricular(data);

        if(saveData.status == "success"){
            setExtracurricularAlert(<Alert type={"success"} message={"Successfully save the school extracurricula"}/>)
            setTimeout(()=> {
                setExtracurricularAlert("")
            },3000)
        }else{
            setExtracurricularAlert(<Alert type={"danger"} message={"Failed save the school extracurricula, something wrong!"}/>)
            setTimeout(()=> {
                setExtracurricularAlert("")
            },3000)
        }
    }

  return (
    <div>
        <div className='my-5'>
            <p className="font-invisible text-xl">Extracurricular</p>
        </div>
        <div>
            <FormInput type={'textarea'} label={'Extracurricular activities or clubs offered'} name={"extracurricular"} onChange={onFormChange} value={extracurricular}/>
        </div>
        <div>
            <FormInput type={'textarea'} label={'Sports activities included'} name={"sport-activity"} onChange={onFormChange} value={sportActivity}/>
        </div>
        <div>
            <FormInput type={'textarea'} label={'Sports teams or sport competitions available for students'} name={'sport-team'} onChange={onFormChange} value={sportTeam}/>
        </div>
        <div>
            {extracurricularAlert}
        </div>
        <div>
            <Button text={"Save Extracurricullar"} onClick={()=> {onSaveClicked()}}/>
        </div>
    </div>
  )
}

export default ExtracurricularInter