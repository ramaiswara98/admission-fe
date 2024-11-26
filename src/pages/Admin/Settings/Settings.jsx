import React, { useEffect, useState } from 'react'
import TopNav from '../../../component/TopNav/TopNav'
import LeftNav from '../../../component/LeftNav/LeftNav'
import Lines from '../../../component/Lines/Lines'
import FormInput from '../../../component/FormInput/FormInput'
import Button from '../../../component/Button/Button'
import settingsAPI from '../../../api/settings'
import Alert from '../../../component/Alert/Alert'

function Settings() {
    const [adminEmail, setAdminEmail] = useState(null);
    const [consultation, setConsultation] = useState(null);
    const [tuition, setTuition] = useState(null);
    const [alert, setAlert] = useState('');

    useEffect(()=> {
        getSettings();
    },[])

    const getSettings = async() => {
        const getSettingCall = await settingsAPI.getSettings();
        if(getSettingCall.status == "success"){
            const settings = getSettingCall.data;
            setAdminEmail(settings.admin_email);
            setConsultation(settings.consultation_price);
            setTuition(settings.tuition_price);
        }
    }

    const onChangeForm = (e) => {
        const target = e.target;
        if(target.name == 'email'){
            setAdminEmail(target.value)
        }
        if(target.name == 'consultation'){
            setConsultation(target.value)
        }
        if(target.name == 'tuition'){
            setTuition(target.value)
        }
    }

    const saveSettings = async() => {
        const data = {
            admin_email:adminEmail,
            consultation_price:consultation,
            tuition_price:tuition
        }

        const saveSettingsCall = await settingsAPI.saveSettings(data);
        if(saveSettingsCall.status == "success"){
            setAlert(<Alert type={'success'} message={'successfully saved settings'} />)
            setTimeout(()=> {
                setAlert('')
            },3000)
        }else{
            setAlert(<Alert type={'danger'} message={'failed to saved settings, something wrong'} />)
            setTimeout(()=> {
                setAlert('')
            },3000)
        }
    }
  return (
    <div>
        <TopNav/>
        <div className='flex flex-row gap-1'>
            <LeftNav menu={'settings'}/>
            <div className='bg-white min-h-screen w-full px-4 py-4'>
                <p className='font-invisible text-2xl'>Settings</p>
                <Lines/>
                <div>
                    <FormInput label={'Admin Email'} value={adminEmail} name={'email'} onChange={onChangeForm}/>
                    <FormInput label={'Consultation Price (SGD)'} value={consultation} name={'consultation'} onChange={onChangeForm}/>
                    <FormInput label={'Tuition Session Price (SGD)'} value={tuition} name={'tuition'} onChange={onChangeForm}/>
                    <div className='my-4'>
                        {alert}
                    </div>
                    <Button text={'Save Settings'} onClick = {()=> {saveSettings()}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings