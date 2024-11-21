import React, { useEffect, useState } from 'react'
import TopNav from '../../../component/TopNav/TopNav'
import LeftNav from '../../../component/LeftNav/LeftNav'
import bookingConsultationAPI from '../../../api/bookingConsultation';
import { jwtDecode } from 'jwt-decode';
import userAPI from '../../../api/users';
import Button from '../../../component/Button/Button';

function BookConsultation({type}) {

    const [listConsultation, setListConsultation] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(()=> {
        if(type == "user"){
        const token = localStorage.getItem("token");
        if (token !== null) {
          getTokenData(token);
        }
    }else{
        console.log("admin")
        getAdminConsultation();
    }
        
    },[]);

    async function getTokenData (token) {
        try {
            const decoded = jwtDecode(token);
            
            const getUser = await userAPI.getUserById({id:decoded.id});
            if(getUser.status == 'success'){
                setUser(getUser.data[0]);
                console.log(getUser.data[0].id);
                const data = {
                    user_id:getUser.data[0].id
                }
                await getConsultationList(data);
            }
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    }

    const getConsultationList = async(data) => {
        try{
            const getConsultation = await bookingConsultationAPI.getMyConsultation(data);
            if(getConsultation.status == "success"){
                console.log('success');
                setListConsultation(getConsultation.data);
            }else{
                console.log(getConsultation);
            }
        }catch(err){
            console.log(err)
        }
    }

    const getAdminConsultation = async(data) => {
        try{
            const getConsultation = await bookingConsultationAPI.getAllConsultation(data);
            if(getConsultation.status == "success"){
                console.log('success');
                setListConsultation(getConsultation.data);
            }else{

            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        <TopNav/>
        <div 
            className='flex flex-row gap-1'
        >
            <LeftNav menu={'book-consultation'}/>
            <div className='bg-white w-full py-4 px-4 min-h-screen'>
                <p className="font-invisible text-2xl">Consultation Booking</p>
                <div className={"bg-red-600 w-10 h-1 mb-4"}></div>
                {type== "user" && (
                    <div>
                        {listConsultation != null && listConsultation.map((consultation,index)=> {
                            return(
                                <div className={'flex flex-row rounded-md border-gray-400 border-solid border-2 px-2 py-2 my-4 items-center justify-between'}>
                                    <div className='flex flex-row items-center'>
                                        <img src={consultation.logo} className='h-12 w-12 mx-2' />
                                        <div className='flex flex-col'>
                                            <p className='font-invisible text-lg'>Consultation about {consultation.school_name}</p>
                                            <p className='font-invisible text-sm'><span className='font-sans'>Date</span> : {consultation.date} {consultation.time.replace('.',':')}</p>
                                            <p className='font-invisible text-sm'><span className='font-sans'>Link :</span> {consultation.link}</p>
                                        </div>
                                    </div>
                                    <Button text={"Join Meeting"} onClick={()=>{window.open(consultation.link, "_blank")}}/>

                                </div>
                            )
                        })}
                        
                    </div>
                )}
                 {type== "admin" && (
                    <div>
                        <table className="table-auto w-full">
                        <thead className="bg-red-600 text-white font-invisible">
                            <tr>
                            <th className="p-3 tracking-wide text-left">Consultation</th>
                            <th className="p-3 tracking-wide text-left">Date</th>
                            <th className="p-3 tracking-wide text-left">User</th>
                            <th className="p-3 tracking-wide text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listConsultation != null && listConsultation.map((consultation,index)=> {
                                return(
                                    <tr>
                                        <td className="text-left p-3 font-sans border">Consultation about {consultation.school_name} with {consultation.fullname}</td>
                                        <td className="text-left p-3 font-sans border">{consultation.date} {consultation.time.replace(".",":")}</td>
                                        <td className="text-left p-3 font-sans border">{consultation.name}</td>
                                        <td className="text-left p-3 font-sans border"><div className='flex flex-row items-center'><Button text={"Join Meeting"}/></div></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        </table>
                    </div>
                 )}
            </div>

        </div>
    </div>
  )
}

export default BookConsultation