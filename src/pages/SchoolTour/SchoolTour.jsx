import React, { useEffect, useState } from 'react'
import TopNav from '../../component/TopNav/TopNav'
import Lines from '../../component/Lines/Lines'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import FormInput from '../../component/FormInput/FormInput'
import Button from '../../component/Button/Button'
import { useParams } from 'react-router-dom'
import schoolAPI from '../../api/schools'
import userAPI from '../../api/users'
import bookingTourAPI from '../../api/bookingTour'
import { jwtDecode } from 'jwt-decode'
import Alert from '../../component/Alert/Alert'
import mailAPI from '../../api/mail'
import settingsAPI from '../../api/settings'

function SchoolTour() {
    const {id} = useParams();
    const [schoolBasic, setSchoolBasic] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState('');
    const [settings, setSettings] = useState(null);

    useEffect(()=> {
        const getSchoolInfo = async () => {
            const getSchool = await schoolAPI.getSchoolsById(id);
            if (getSchool.status == "success") {
                setSchoolBasic(getSchool.data[0]);
            }
          };

          getSchoolInfo();
          
    },[id])
    useEffect(() => {
        const token = localStorage.getItem("token");
            if (token !== null) {
             getTokenData(token);
            }
    },[])

    useEffect(()=> {
        getSettings();
       
        
    },[])

    const getSettings = async() => {
        const getSettingsCall = await settingsAPI.getSettings();
        if(getSettingsCall.status == 'success'){
            setSettings(getSettingsCall.data);
        }
    }

    async function getTokenData (token) {
        try {
            const decoded = jwtDecode(token);
            
            const getUser = await userAPI.getUserById({id:decoded.id});
            if(getUser.status == 'success'){
                setName(getUser.data[0].name);
                setEmail(getUser.data[0].email);
                setUser(getUser.data[0]);
            }
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    }

    const onFormChange = (e) => {
        const target = e.target;
        if(target.name == 'name'){
            setName(target.value)
        }

        if(target.name == 'email'){
            setEmail(target.value)
        }

        if(target.name == 'phone'){
            setPhone(target.value)
        }
    }

    const onButtonBookClick = async() => {
        setAlert(<Alert type={'normal'} message={'Loading...'} />)
        const data = {
            school_id:parseInt(id),
            user_id:user.id,
            name,
            email,
            phone
        }

        if(name == '' || email == '' || phone == ''){

        }else{
            const storeData = await bookingTourAPI.createBookingTour(data);
            if(storeData.status == 'success'){
                await sendMail()
                setAlert(<Alert type={'success'} message={'Successfully Book School Tour'} />)
                setTimeout(()=> {
                    setAlert('')
                },3000)
            }else{
                setAlert(<Alert type={'danger'} message={'Something Wrong!'} />)
                setTimeout(()=> {
                    setAlert('')
                },3000)
            }
            
        }
    }

    const sendMail = async()=> {
        const data = {
            fullname: name,
            email: email,
            subject: "Confirmation Booking School Tour At " + schoolBasic?.school_name,
            body: `<p>Dear ${name} </p>
                   <p>Thank your for submitting your booking request for a school tour. We received your booking for school tour at ${schoolBasic?.school_name}. We currently processing your request and will send you a details bout the school tour when it ready.</p>
                   <br/><br/><br/>
                   <p>Kind Regards,</p>
                   <p>Admission Site Team</p>`
        };
        const data2 = {
            fullname: "Admission Staff",
            email: settings.admin_email,
            subject: "Submission Booking School Tour At " + schoolBasic?.school_name,
            body: `<p>Dear Admission Staff </p>
                   <p>Here are the details of the school tour booking from ${name} at ${schoolBasic?.school_name}:</p>
                   <p>Full Name: <strong>${name}</strong></p>
                   <p>email: <strong>${email}</strong></p>
                   <p>Phone Number: <strong>${phone}</strong></p>
                   <p>Requested School Tour: <strong>${schoolBasic?.school_name}</strong></p>
                   <br/><br/><br/>
                   <p>Kind Regards,</p>
                   <p>Admission Site Team</p>`
        };
        

        const sendUserMail = await mailAPI.sendConsultation(data);
        const sendUserMail2 = await mailAPI.sendConsultation(data2);
        
    }
  return (
    <div>
        <TopNav/>
        <div>
            <div className='my-4 px-10'>
                <p className='font-invisible text-xl'>Book School Tour</p>
                <Lines/>
            </div>
            <div className='mx-10 my-2 bg-white flex flex-row justify-center items-center gap-4 py-2'>
                <div className='bg-white shadow-md flex flex-row justify-center items-center py-4 gap-4 px-4'>
                    <img src={schoolBasic?.logo} className='h-8'/>
                    <p className='font-invisible text-xl'>{schoolBasic?.school_name}</p>
                </div>
            </div>
            <div className='mx-10 my-2 bg-white flex flex-row justify-center items-center gap-4 '>
                <div className='py-2'>
                    <FormInput label={'Full Name'} name='name' value={name} onChange={(e)=> {onFormChange(e)}}/>
                    <FormInput label={'Email'} name='email' value={email} onChange={(e)=> {onFormChange(e)}}/>
                    <FormInput label={'Phone Number'}  name='phone' value={phone} onChange={(e)=> {onFormChange(e)}}/>
                    <div>
                        {alert}
                    </div>
                    <div>
                        <Button text={'Book School Tour'} onClick={()=> onButtonBookClick()}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SchoolTour