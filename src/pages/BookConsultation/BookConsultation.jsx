import React, { useEffect, useState } from 'react'
import { format, toZonedTime } from "date-fns-tz";

import TopNav from '../../component/TopNav/TopNav'
import Lines from '../../component/Lines/Lines'
import Button from '../../component/Button/Button'
import FormInput from '../../component/FormInput/FormInput'
import SchoolAPI from '../../api/schools'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClipboardCheck, faMoneyBill, faPerson } from '@fortawesome/free-solid-svg-icons'
import { createTimeArray, getNext10WorkingDays } from '../../utils/utils'
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import userAPI from '../../api/users';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../../component/CheckoutForm/CheckOutForm'
import { loadStripe } from '@stripe/stripe-js'
import paymentAPI from '../../api/payment'
import meetingsAPI from '../../api/meetings'
import mailAPI from '../../api/mail'
import bookingConsultationAPI from '../../api/bookingConsultation';

function BookConsultation() {
    const [next10Days, setNext10Days] = useState(getNext10WorkingDays());
    const [step, setStep] = useState(1);
    const { id } = useParams();
    const [school, setSchool] = useState([]);
    const [timeArray, setTimeArray] = useState(createTimeArray());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [user, setUser] = useState(null);
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const [clientSecret, setClientSecret] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [meetingDetails, setMeetingDetails] = useState(null);
    useEffect(()=> {
        getSchoolInfo();
        const token = localStorage.getItem("token");
        if (token !== null) {
          getTokenData(token);
        }
    },[])

    useEffect(()=> {
        const getClient = async () => {
            const clientSecret = await paymentAPI.createPaymentIntent({amount:100.00})
        if(clientSecret.status == 'success'){
            setClientSecret(clientSecret.data.clientSecret)
        // console.log(clientSecret);
        }else{
        // console.log(clientSecret);
        }
        }
        getClient();
        
    },[])
    
    async function getTokenData (token) {
        try {
            const decoded = jwtDecode(token);
            
            const getUser = await userAPI.getUserById({id:decoded.id});
            if(getUser.status == 'success'){
                setUser(getUser.data[0]);
                setFullname(getUser.data[0].name);
                setEmail(getUser.data[0].email);
                setUser(getUser.data[0]);
            }
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    }
   

    const getSchoolInfo = async() => {
        const getSchool = await SchoolAPI.getSchoolsById(id);
        if(getSchool.status == "success"){
            setSchool(getSchool.data[0])
            console.log(getSchool.data);
        }else{

        }
    }

    

    const nextStepClicked = () => {
        const currentStep = step;
        if(currentStep == 1){
            if(selectedDate == null){

            }else{
                if(selectedTime == null){
                    
                }else{
                    setStep(currentStep+1);
                }
            }
        }

        if(currentStep == 2){
            console.log({fullname,email,phone})
            if(fullname == null){

            }else{
                if(email == null){

                }else{
                    if(phone == null){

                    }else{
                        setStep(currentStep+1);
                    }
                }
            }
        }
        if(currentStep == 3){
            if(paymentStatus == "success"){
                setStep(currentStep+1);
            }
        }
        // if(currentStep+1 <5){
        //     setStep(currentStep+1);
        // }else{

        // }
    }

    const backStepClicked = () => {
        const currentStep = step;
        if(currentStep-1 > 0){
            setStep(currentStep-1);
        }else{

        }
    }

    const onDateChange = (index) => {
        const selected = {
            index,
            date:next10Days[index]
        }
        setSelectedDate(selected);
    }

    const onTimeChange = (index) => {
        const selected = {
            index,
            time:timeArray[index]
        }
        setSelectedTime(selected);
    }

    const onFormChange = (e) => {
        const target = e.target;
        if(target.name == 'fullname'){
            setFullname(target.value)
        }

        if(target.name == 'email'){
            setEmail(target.value)
        }

        if(target.name == 'phone'){
            setPhone(target.value)
        }
    }

    const getDateISO = () => {
        const date = selectedDate.date.date+' '+selectedDate.date.month+' '+selectedDate.date.year+' '+selectedTime.time;
        const timeZone = "Asia/Singapore";
        const input = date.replace(".",":")
        const newDates = new Date(`${input} GMT+0800`);
        const zonedDate = toZonedTime(newDates, timeZone)
        const iso = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });
        return iso;
    }

    const createMeetings = async() => {
        const data = {
            topic:"Cosultation "+school?.school_name+" With "+fullname,
            type:2,
            start_time:getDateISO(),
            duration:40,
            timezone:"Asia/Singapore",
            agenda:"Cosultation "+school?.school_name+" With "+fullname,
            approval_type:0
        }
        const createMeetings = await meetingsAPI.createMeeting(data);
        if(createMeetings.status == "success"){
            saveBooking(createMeetings.data);
            setMeetingDetails(createMeetings.data);
            const currentStep = step;
            setStep(currentStep+1);
            await sendMail(createMeetings.data)
        }
        
    }

    const saveBooking = async(meetings)=> {
        const data = {
            user_id:user.id,
            school_id:school.id,
            date:selectedDate.date.date+' '+selectedDate.date.month+' '+ selectedDate.date.year,
            time:selectedTime.time,
            link:meetings.join_url,
            fullname,
            email,
            phone
        }

        const createBooking = await bookingConsultationAPI.create(data);
        console.log(createBooking)
        if(createBooking.status == "success"){

        }
    }

    const sendMail = async(meetings)=> {
        const data = {
            fullname: fullname,
            email: email,
            subject: "Booking Consultation About " + school?.school_name,
            body: `<p>Dear ${fullname} </p>
                   <p>Here are your booking consultation details:</p>
                   <p>Date: <strong>${selectedDate.date.date} ${selectedDate.date.month} ${selectedDate.date.year} ${selectedTime.time.replace('.', ':')} (SGT)</strong></p>
                   <p>Meeting Link: <a href="${meetings.join_url}">${meetings.join_url}</a></p>
                   <br/><br/><br/>
                   <p>Kind Regards,</p>
                   <p>Admission Site Team</p>`
        };
        const data2 = {
            fullname: "Admission Staff",
            email: 'ramawari@acktechnologies.com',
            subject: "Booking Consultation About " + school?.school_name,
            body: `<p>Dear Admission Staff </p>
                   <p>Here is a details of book consultation from ${fullname} about ${school?.school_name}:</p>
                   <p>Date: <strong>${selectedDate.date.date} ${selectedDate.date.month} ${selectedDate.date.year} ${selectedTime.time.replace('.', ':')} (SGT)</strong></p>
                   <p>Meeting Link: <a href="${meetings.join_url}">${meetings.join_url}</a></p>
                   <p>Full Name: <strong>${fullname}</strong></p>
                   <p>email: <strong>${email}</strong></p>
                   <p>Phone Number: <strong>${phone}</strong></p>
                   <p>School to disscuss: <strong>${school?.school_name}</strong></p>
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
        <div className='py-4 px-4'>
            <p className='font-invisible text-xl'>Book Consultation</p>
            <Lines/>
            <div className='flex flex-col justify-center items-center '>
                <div className='bg-white py-2 px-2 my-2 flex flex-row items-end justify-center gap-4 w-96'>
                    <img src={school?.logo} className='h-8'/>
                    <p className='font-invisible'>{school?.school_name}</p>
                </div>
                <div className='bg-white py-2 px-2 flex flex-row justify-center items-center gap-2 w-96'>
                    <div className='flex flex-row items-center gap-2'>
                        <div className={`w-12 h-12 ${step >=1?'bg-red-600':'bg-gray-300'} rounded-full px-1 py-1 flex flex-row items-center justify-center`}>
                            <FontAwesomeIcon icon={faCalendar} className={`${step >=1?'text-white':'text-black'}`}/>
                        </div>
                    </div>
                    <div class={`${step >=2?'bg-red-600':'bg-gray-300'} h-1 w-20`}></div>
                    <div className='flex flex-row items-center gap-2'>
                    <div className={`w-12 h-12 ${step >=2?'bg-red-600':'bg-gray-300'} rounded-full px-1 py-1 flex flex-row items-center justify-center`}>
                            <FontAwesomeIcon icon={faPerson} className={`${step >=2?'text-white':'text-black'}`}/>
                        </div>
                    </div>
                    <div class={`${step >=3?'bg-red-600':'bg-gray-300'} h-1 w-20`}></div>
                    <div className='flex flex-row items-center gap-2'>
                    <div className={`w-12 h-12 ${step >=3?'bg-red-600':'bg-gray-300'} rounded-full px-1 py-1 flex flex-row items-center justify-center`}>                            
                        <FontAwesomeIcon icon={faMoneyBill} className={`${step >=3?'text-white':'text-black'}`}/>
                        </div>
                    </div>
                    <div class={`${step ==4?'bg-red-600':'bg-gray-300'} h-1 w-20`}></div>
                    <div className='flex flex-row items-center gap-2'>
                    <div className={`w-12 h-12 ${step ==4?'bg-red-600':'bg-gray-300'} rounded-full px-1 py-1 flex flex-row items-center justify-center`}>                            
                        <FontAwesomeIcon icon={faClipboardCheck} className={`${step ==4?'text-white':'text-black'}`}/>
                        </div>
                    </div>
                </div>

                {/* First Step */}
                {step == 1 && (
                    <div className='bg-white py-2 px-2 flex flex-wrap justify-center items-center gap-2 my-2 w-96'>
                    <div>
                    <p className='font-invisible text-lg'>Booking Slot</p>
                    <p className='font-invisible my-2'>Choose date:</p>
                    <div className='py-2 px-2 flex flex-wrap items-center gap-2 my-2'>
                    {next10Days.length>0 && next10Days.map((days, index) => {
                        return(
                            <div key={index} 
                                className={`flex flex-col justify-center items-center ${selectedDate?.index == index ?'bg-red-600':'bg-gray-300'} ${selectedDate?.index == index ?'text-white':'text-black'} rounded-lg py-2 px-2 cursor-pointer hover:bg-red-600 hover:text-white`}
                                onClick={()=> {onDateChange(index)}}
                            >
                                <p className='font-invisible text-lg'>{days.day.slice(0,3)}</p>
                                <p className='font-invisible text-xl'>{days.date}</p>
                                <p className='font-sans text-xs'>{days.month.slice(0,3)+' '+days.year.toString().slice(-2)}</p>
                            </div>
                        )
                    })}
                    </div>
                    <div>
                        <p className='font-invisible mb-2'>Choose Time Slot:</p>
                        <div className='flex flex-wrap gap-4'>
                            {timeArray.map((time,index) => {
                                return(
                                <div 
                                    className={`${selectedTime?.index == index ?'bg-red-600 text-white':'bg-gray-300 text-black'} rounded-3xl px-2 py-2 flex flex-row items-center cursor-pointer hover:bg-red-600 hover:text-white`}
                                    onClick={()=> {onTimeChange(index)}}
                                >
                                <p className='text-sm font-invisible'>{time}</p>
                                </div>
                                )
                            })}
                
                        </div>
                    </div>
                    <div className='my-4 flex flex-row justify-end'>
                    </div>
                    </div>
                </div>
                )}
                


                {/* Second Step */}
                {step == 2 && (
                    <div className='bg-white py-2 px-2 flex flex-col justify-center items-center gap-2 my-2 w-96'>
                        <FormInput type={'text'} name={'fullname'} label={'Full Name'} width={'w-[360px]'} value={fullname} onChange={onFormChange}/>
                        <FormInput type={'email'} name={'email'} label={'Email'} width={'w-[360px]'} value={email} onChange={onFormChange}/>
                        <FormInput type={'tel'} name={'phone'} label={'Phone Number'} width={'w-[360px]'} value={phone} onChange={onFormChange}/>
                    
                    </div>
                )}
                

                {/* Third Step */}
                {step == 3 &&(
                    <div className='bg-white py-2 px-2 flex flex-col items-center gap-2 my-2 w-96'>
                    <div className='w-80'>
                        {paymentStatus != "success" ?(
                             <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm status={setPaymentStatus} process={createMeetings} type={'consultation'}/>
                            </Elements>
                        ):(
                            <div className='flex flex-row justify-center'>
                                <p className='font-invisible'>Processing...</p>
                            </div>
                        )}
                   
                    </div>
                </div>
                )}

                {/* Four Step */}
                {step == 4 && (
                    <div className='bg-white py-2 px-2 flex flex-col items-center gap-2 my-2 w-96'>
                    <div className='w-80'>
                        <p className='font-invisible text-xl'>Successfully Book Consultation</p>
                        <Lines/>
                        <p className='font-sans text-sm mb-4'>Your book consultation details have been sent to your email.</p>
                        <p className='font-invisible'>Details:</p>
                        <p className='font-invisible'>Date : </p>
                        <p>{selectedDate.date.date+' '+selectedDate.date.month+' '+selectedDate.date.year+' '+selectedTime.time.replace('.',':')} (SGT)</p>
                        <div className='flex flex-col '>
                            <p className='font-invisible'>Meeting Link: </p>
                            <a className='text-blue-500' href={meetingDetails.join_url}>{meetingDetails.join_url}</a>
                        </div>

                        <div className='flex flex-row justify-center mt-4'>
                        <Button text={'View Details'} />
                        </div>
                    </div>
                    </div>
                )}
                
                <div className='bg-white py-2 px-2 justify-center flex flex-row gap-4 w-96'>
                    <div className='w-96 flex flex-row justify-end gap-4'>
                        {step > 1 && step <3 && (
                            <Button text={"Back"} onClick={()=>{backStepClicked()}}/>
                        )}
                        {step <4 && (
                            <Button text={"Next"} onClick={()=>{nextStepClicked()}}/>
                        )}
                        
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookConsultation