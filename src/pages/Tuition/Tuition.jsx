import React, { useEffect, useState } from 'react'
import TopNav from '../../component/TopNav/TopNav'
import Lines from '../../component/Lines/Lines'
import FormInput from '../../component/FormInput/FormInput'
import Button from '../../component/Button/Button'
import CostumeSelect from '../../component/CostumeSelect/CostumeSelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCalendarDay, faCheckCircle, faMoneyBill, faPerson } from '@fortawesome/free-solid-svg-icons'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../../component/CheckoutForm/CheckOutForm'
import { loadStripe } from '@stripe/stripe-js'
import paymentAPI from '../../api/payment'
import tuitionAPI from '../../api/tuition'
import { jwtDecode } from 'jwt-decode'
import mailAPI from '../../api/mail'
import settingsAPI from '../../api/settings'

function Tuition() {
    const subject = [
        {
            value:"mathematics",
            label:"Mathematics"
        },
        {
            value:"english",
            label:"English"
        },
        {
            value:"sains",
            label:"Sains"
        }
    ]

    const grade = [
        {
            value:"preschool",
            label:"Pre School"
        },
        {
            value:"primary",
            label:"Primary"
        },
        {
            value:"secondary",
            label:"Secondary"
        },
        {
            value:"juniorcollage",
            label:"Junior Collage"
        },
    ]

    const session = [
        {
            value:4,
            label:'4 Session'
        },
        {
            value:8,
            label:'8 Session'
        },
        {
            value:12,
            label:'12 Session'
        },
        {
            value:16,
            label:'16 Session'
        },
        {
            value:20,
            label:'20 Session'
        }
    ]
    const optionDays= [
        {
            value:1,
            label:'Sunday'
        },
        {
            value:2,
            label:'Monday'
        },
        {
            value:3,
            label:'Tuesday'
        },
        {
            value:4,
            label:'Wednesday'
        },
        {
            value:5,
            label:'Thursday'
        },
        {
            value:6,
            label:'Friday'
        },
        {
            value:7,
            label:'Saturday'
        }
    ]

    const optionHours = [
        {
            value:'09:00 AM',
            label:'09:00 AM'
        },
        {
            value:'10:00 AM',
            label:'10:00 AM'
        },
        {
            value:'11:00 AM',
            label:'11:00 AM'
        },
        {
            value:'01:00 PM',
            label:'01:00 PM'
        },
        {
            value:'02:00 PM',
            label:'02:00 PM'
        },
        {
            value:'03:00 PM',
            label:'03:00 PM'
        },
        {
            value:'04:00 PM',
            label:'04:00 PM'
        },
        {
            value:'05:00 PM',
            label:'05:00 PM'
        },
        {
            value:'06:00 PM',
            label:'06:00 PM'
        },
        {
            value:'07:00 PM',
            label:'07:00 PM'
        },
        {
            value:'08:00 PM',
            label:'08:00 PM'
        }
    ]

    const [tab, setTab] = useState(1);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(false);
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const [clientSecret, setClientSecret] = useState(null);
    const [price, setPrice] = useState(100.00);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [settings, setSettings] = useState(null);

    const getSettings = async() => {
        const getSettingsCall = await settingsAPI.getSettings();
        if(getSettingsCall.status == 'success'){
            setSettings(getSettingsCall.data);
            setPrice(getSettingsCall.data.tuition_price)
        }
    }

    const getClient = async () => {
        const clientSecret = await paymentAPI.createPaymentIntent({amount:parseInt(selectedSession.value*price)})
        if(clientSecret.status == 'success'){
            setClientSecret(clientSecret.data.clientSecret)
        }else{
        }
    }

    useEffect(() => {
        getSettings();
        const token = localStorage.getItem("token");
        if (token !== null) {
          setLogin(true);
          getTokenData(token);
        }
      }, []);
    
      function getTokenData(token) {
        try {
            const decoded = jwtDecode(token);
            console.log(decoded.type);
            setUser(decoded);
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

        if(target.name == 'start-date'){
            setStartDate(target.value);
        }
    }

    const onNextButtonClicked = async()=> {
        const current = tab;
        if(current == 1){
            if(name != null && email != null && phone != null){
                setTab(current+1);
            }
        }
        if(current == 2){
            if(selectedSubject != null && selectedGrade != null){
                setTab(current+1);
            }
        }
        if(current == 3){
            if(selectedSession != null && day != null && time != null && startDate != null){
                await getClient();
                setTab(current+1);
               
            }else{
                console.log(selectedSession+'-'+day+'-'+time+'-'+startDate)
            }
        }
        if(current == 4){
            // processing();
            setTab(current+1);
        }
    }

    const storeTuition = async() => {
        saveTuition();
        await sendMail();
        onNextButtonClicked();
    }
    const saveTuition = async() => {
        const data = {
            user_id:user.id,
            full_name:name,
            email,
            phone,
            subject:selectedSubject.label,
            grade:selectedGrade.label,
            session:selectedSession.value,
            day:day.label,
            time:time.label,
            start:startDate
        }
       
            const createTuition = await tuitionAPI.createTuition(data);
            if(createTuition.status == "success"){
                console.log(createTuition.data)
            }else{
                console.log("Something went wrong")
            }
       
    }

    const sendMail = async(meetings)=> {
        const data = {
            fullname: name,
            email: email,
            subject: "Tuition " + selectedSubject.label,
            body: `<p>Dear ${name} </p>
                   <p>Here are your tuition details:</p>
                   <p>Subject: <strong>${selectedSubject.label}</strong></p>
                   <p>Grade: <strong>${selectedGrade.label}</strong></p>
                   <p>Session Schedule: <strong>${day.label} ${time.label} (SGT)</p>
                   <p>Session: <strong>${selectedSession.value}x </strong></p>
                   <p>First Session: <strong>${startDate}</strong></p>
                   <br/><br/><br/>
                   <p>Kind Regards,</p>
                   <p>Admission Site Team</p>`
        };
        const data2 = {
            fullname: "Admission Staff",
            email: settings.admin_email,
            subject: "Tuition " + selectedSubject.label,
            body: `<p>Dear Admission Staff </p>
                   <p>Here are tuition detail from ${name}:</p>
                   <h3>Tuition Session Info</h3>
                   <p>Subject: <strong>${selectedSubject.label}</strong></p>
                   <p>Grade: <strong>${selectedGrade.label}</strong></p>
                   <p>Session Schedule: <strong>${day.label} ${time.label} (SGT)</p>
                   <p>Session: <strong>${selectedSession.value}x </strong></p>
                   <p>First Session: <strong>${startDate}</strong></p>
                   <br/>
                   <h3>Personal Info</h3>
                   <p>Full Name: <strong>${name}</strong></p>
                   <p>Email: <strong>${email}</strong></p>
                   <p>Phone: <strong>${phone}</strong></p>
                   <p>User ID: <strong>${user.id}</strong></p>
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
        <div className='px-10 py-4'>
            <p className='font-invisible text-xl'>Tuition</p>
            <Lines/>
            <div className='bg-white px-4 py-4 flex flex-row gap-4 my-4 items-center justify-center'>
                <div className='px-2 py-2 bg-red-600 rounded-full w-8 h-8 flex flex-row justify-center'>
                    <FontAwesomeIcon icon={faPerson} className='text-white'/>
                </div>
                <div class={` ${tab>1?'bg-red-600':'bg-gray-400'} h-1 w-20`}></div>
                <div className={`px-2 py-2 ${tab > 1 ? 'bg-red-600 ':'bg-gray-400'} rounded-full w-8 h-8 flex flex-row justify-center`}>
                    <FontAwesomeIcon icon={faBook} className='text-white'/>
                </div>
                <div class={` ${tab>2?'bg-red-600':'bg-gray-400'} h-1 w-20`}></div>
                <div className={`px-2 py-2 ${tab > 2 ? 'bg-red-600 ':'bg-gray-400'} rounded-full w-8 h-8 flex flex-row justify-center`}>
                    <FontAwesomeIcon icon={faCalendarDay} className='text-white'/>
                </div>
                <div class={` ${tab>3?'bg-red-600':'bg-gray-400'} h-1 w-20`}></div>
                <div className={`px-2 py-2 ${tab > 3 ? 'bg-red-600 ':'bg-gray-400'} rounded-full w-8 h-8 flex flex-row justify-center`}>
                    <FontAwesomeIcon icon={faMoneyBill} className='text-white'/>
                </div>
                <div class={` ${tab>4?'bg-red-600':'bg-gray-400'} h-1 w-20`}></div>
                <div className={`px-2 py-2 ${tab > 4 ? 'bg-red-600 ':'bg-gray-400'} rounded-full w-8 h-8 flex flex-row justify-center`}>
                    <FontAwesomeIcon icon={faCheckCircle} className='text-white'/>
                </div>
            </div>
            <div className='bg-white px-4 py-4 flex flex-row gap-4 justify-center'>
                {tab == 1 && (
                    <div>
                        <FormInput label={"Name"} value={name}  name='name' onChange={onFormChange}/>
                        <FormInput label={"Email"} value={email} name='email' onChange={onFormChange}/>
                        <FormInput label={"Phone Number"} value={phone} name='phone' onChange={onFormChange}/>
                    </div>
                )}

                {tab == 2 && (
                    <div>
                    <div>
                        <p className='font-invisible'>Subject</p>
                        <CostumeSelect placeholder={"Select Subject"} options={subject} onChange={setSelectedSubject} />
                    </div>
                    <div>
                        <p className='font-invisible'>Grade</p>
                        <CostumeSelect placeholder={"Select Subject"} options={grade} onChange={setSelectedGrade} />
                    </div>
                </div>
                )}

                {tab == 3 && (
                    <div>
                        <p className='font-invisible'>Session</p>
                        <CostumeSelect options={session} onChange={setSelectedSession} placeholder={"Select Session"}/>
                        <p className='font-invisible'>Session Days</p>
                        <CostumeSelect options={optionDays} onChange={setDay} placeholder={'Select Session Days'} />
                        <p className='font-invisible'>Session Time</p>
                        <CostumeSelect options={optionHours} onChange={setTime} placeholder={'Select Session Hours'}/>
                        <FormInput label={"Date Started"} type={'date'} onChange={onFormChange} value={startDate} name={'start-date'}/>
                    </div>
                )}

                {tab == 4 && (
                    <div>
                        <div className='shadow-md my-4 px-2 rounded-sm'>
                            <div className='flex flex-row justify-between'>
                                <p className='font-invisible'>Session</p>
                                <p className='font-invisible'>@{selectedSession.value}</p>
                                <p className='font-invisible'>SDG {price}.00</p>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <p className='font-invisible'>Total</p>
                                <p className='font-invisible'></p>
                                <p className='font-invisible'>SDG {selectedSession.value*price}.00</p>
                            </div>
                        </div>
                        {paymentStatus ? (
                            <div className='flex flex-row justify-center'>
                                <p className='font-invisible'>Processing...</p>
                            </div>
                        ):(
                            <Elements stripe={stripePromise} options={{ clientSecret }} type={'tuition'}>
                                <CheckoutForm status={setPaymentStatus}  process={storeTuition}/>
                            </Elements>
                        )}
                         
                    </div>
                )}

                {tab ==5 && (
                    <div>
                        <p className='font-invisible text-lg'>Summary</p>
                        <Lines/>
                        <div>
                            <p>Subject: <span className='font-invisible'>{selectedSubject.label}</span></p>
                            <p>Grade: <span className='font-invisible'>{selectedGrade.label}</span></p>
                            <p>Total Session: <span className='font-invisible'>{selectedSession.value}</span></p>
                            <p>Session Schedule: <span className='font-invisible'>{day.label} {time.value}</span></p>
                            <p>First Session: <span className='font-invisible'>{startDate}</span></p>
                        </div>
                    </div>
                )}
            </div>
            <div className='bg-white px-4 py-4 flex flex-row gap-4 my-4 items-center justify-center'>
                {tab < 4 && (
                    <Button text={"Next"} onClick={()=> onNextButtonClicked()}/>
                )}
                {tab == 5 && (
                    <Button text={"Back to Home"} onClick={()=> window.location.href = '/'}/>
                )}

            </div>
        </div>
    </div>
  )
}

export default Tuition