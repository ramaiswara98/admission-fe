import React, { useEffect, useState } from 'react'
import TopNav from '../../component/TopNav/TopNav'
import LeftNav from '../../component/LeftNav/LeftNav'
import Lines from '../../component/Lines/Lines'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCalendar, faClock, faGraduationCap, faPlay, faSchool } from '@fortawesome/free-solid-svg-icons'
import tuitionAPI from '../../api/tuition'
import { jwtDecode } from 'jwt-decode'
import { formatDate } from '../../utils/utils'


function MyTuition() {
    const [listTuition, setListTuition] = useState([]);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
          getTokenData(token);
      }, []);
    
      function getTokenData(token) {
        try {
            const decoded = jwtDecode(token);
            console.log(decoded.type);
            setUser(decoded);
            getTuition(decoded)
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    }

    const getTuition = async(decode) => {
        const data = {
            user_id:decode.id
        }
        const getTuitionById =  await tuitionAPI.getByUserId(data);
        if(getTuitionById.status == "success"){
            console.log(getTuitionById.data);
            setListTuition(getTuitionById.data);
        }else{

        }
    }
  return (
    <div>
        <TopNav/>
        <div className='flex flex-row min-h-screen gap-1'>
            <LeftNav menu={'tuition'}/>
            <div className='bg-white px-4 py-4 w-full'>
                <p className='font-invisible'>My Tuition</p>
                <Lines/>
                <div className='grid grid-cols-2 gap-4 w-fit'>
                    {listTuition.length > 0 && listTuition.map((tuition, index) => {
                        return(
                            <div className='flex flex-row gap-4 bg-white shadow-md rounded-sm px-4 py-4 w-fit my-2' key={tuition.id}>
                                <div>
                                    <p className='font-invisible text-xl'>{tuition.subject} Tuition</p>
                                    <div className='flex flex-row gap-8 my-2'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <FontAwesomeIcon icon={faCalendar} className=''/>
                                        <p className='font-invisible'>{tuition.day} {tuition.time}</p>
                                    </div>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <FontAwesomeIcon icon={faClock} className=''/>
                                        <p className='font-invisible'>{tuition.session} Session</p>
                                    </div>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <FontAwesomeIcon icon={faPlay} className=''/>
                                        <p className='font-invisible'>{formatDate(tuition.start)}</p>
                                    </div>
                                    </div>
                                    <div className='flex flex-row gap-8 my-2'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <FontAwesomeIcon icon={faBook} className=''/>
                                        <p className='font-invisible'>{tuition.subject}</p>
                                    </div>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <FontAwesomeIcon icon={faGraduationCap} className=''/>
                                        <p className='font-invisible'>{tuition.grade}</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyTuition