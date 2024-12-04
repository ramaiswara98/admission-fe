import React, { useState } from 'react'


import HappyKids from '../../assets/images/happy-kids.png'
import TopNav from '../../component/TopNav/TopNav'
import Button from '../../component/Button/Button'
import Radio from '../../component/Radio/Radio'
import { useNavigate } from 'react-router-dom'
import Lines from '../../component/Lines/Lines'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faChalkboardTeacher, faHotel, faHouseChimneyUser, faHouseMedicalFlag, faSchool, faVanShuttle } from '@fortawesome/free-solid-svg-icons'

function Home() {
  const navigate = useNavigate();
  const [schoolType, setSchoolType] = useState('');
  const [ageLevel, setAgeLevel] = useState('');

  const onSelectChange = (e) => {
    console.log(e.target.value);
    if(e.target.name == 'school-age-level'){
      setAgeLevel(e.target.value)
    }
  }

  const onRadioChange = (e)=> {
    setSchoolType(e.target.value);
  }


  const onFindSchoolClicked = () => {
    navigate('/find-school', {state:{schoolType,ageLevel}})
  }
  return (
    <div style={{ backgroundImage: `url(${HappyKids})`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'cover' }} className='h-screen'>
      <TopNav/>
    <div className='flex flex-row w-screen h-screen items-center px-10 justify-between '>
      <div>
        <p className='font-invisible text-white text-5xl w-96 text-wrap'><span className='text-red-600'>Singapore</span> School Database</p>
        <p className='font-sans text-white text-xl mb-4'>Find, research, and compare the best singapore schools</p>
        <Button text="Get Started"/>
      </div>
      <div>
          <div className='bg-white p-4 rounded-md'>
            <p className='font-invisible text-xl'>Find Schools</p>
            <div className={"bg-red-600 w-10 h-1 mb-4"}></div>
            <p className='font-invisible'>School Type:</p>
            <div className='flex flex-row gap-3'>
              <Radio value={0} name={'school-type'} text={"Goverment School"} onChange={onRadioChange}/>
              <Radio value={1} name={'school-type'} text={"International School"} onChange={onRadioChange}/>
            </div>
            <div>
              <p className='font-invisible'>Age Level</p>
            <select className="form-input px-4 py-3 rounded-md w-96" name="school-age-level" onChange={(e)=>{onSelectChange(e)}} value={ageLevel}>
              <option disabled value={""} className="" selected>Select School Age Level</option>
             <option value={1}>3-5</option>
             <option value={2}>6-11</option>
             <option value={3}>12-16</option>
             <option value={4}>17-18</option>
            </select>
            </div>
            <div className='mt-6'>
              <Button text={"Find School"} onClick = {()=> {onFindSchoolClicked()}}/>
            </div>
          </div>
      </div>
    </div>
    <div className='flex flex-col items-center'>
      <div className='flex flex-col justify-center items-center my-4'>
        <p className='font-invisible text-3xl'>Our Service</p>
        <Lines/>
        <p className='font-sans'>We offer tailored solutions to meet your needs in education, from pre-admission, admission, and post-admission.</p>

      </div>
      <div className='flex flex-row gap-4 my-4'>
        <div className='bg-white p-4 flex flex-col items-start gap-4 w-52 rounded-md'>
          <div className='bg-red-300 px-2 py-2 rounded-md'>
          <FontAwesomeIcon icon={faSchool} className='text-2xl text-red-600'/>
          </div>
          <p className='font-invisible text-xl'>Find School</p>
          <p className='font-gray'>Discover the best schools to match your preferences and goals.</p>
        </div>
        <div className='bg-white p-4 flex flex-col items-start gap-4 w-52 rounded-md'>
          <div className='bg-red-300 px-2 py-2 rounded-md'>
          <FontAwesomeIcon icon={faChalkboardTeacher} className='text-2xl text-red-600'/>
          </div>
          <p className='font-invisible text-xl'>Find Tutor</p>
          <p className='font-gray'>Connect with expert tutors for personalized learning support.</p>
        </div>
        <div className='bg-white p-4 flex flex-col items-start gap-4 w-52 rounded-md'>
          <div className='bg-red-300 px-2 py-2 rounded-md'>
          <FontAwesomeIcon icon={faHouseChimneyUser} className='text-2xl text-red-600'/>
          </div>
          <p className='font-invisible text-xl'>Find Guardian</p>
          <p className='font-gray'>Locate trusted guardians to ensure your child's safety and care.</p>
        </div>  
      </div>
      <div className='flex flex-row gap-4 my-4'>
        <div className='bg-white p-4 flex flex-col items-start gap-4 w-52 rounded-md'>
          <div className='bg-red-300 px-2 py-2 rounded-md'>
          <FontAwesomeIcon icon={faHotel} className='text-2xl text-red-600'/>
          </div>
          <p className='font-invisible text-xl'>Find Apartment</p>
          <p className='font-gray'>Find comfortable apartments suited to your lifestyle and budget.</p>
          </div>
          <div className='bg-white p-4 flex flex-col items-start gap-4 w-52 rounded-md'>
            <div className='bg-red-300 px-2 py-2 rounded-md'>
            <FontAwesomeIcon icon={faVanShuttle} className='text-2xl text-red-600'/>
            </div>
            <p className='font-invisible text-xl'>Airport Transport</p>
            <p className='font-gray'>Book reliable airport transport services for hassle-free travel.</p>
        </div> 
        {/* <div className='bg-white p-4 flex flex-col items-start gap-4 w-52'>
            <div className='bg-red-300 px-2 py-2 rounded-md'>
            <FontAwesomeIcon icon={faHouseChimneyUser} className='text-2xl text-red-600'/>
            </div>
            <p className='font-invisible text-xl'>Airport Transport</p>
            <p className='font-gray'>Lorem ipsum odor amet, consectetuer adipiscing elit.</p>
        </div>  */}
      </div>
    </div>
    </div>
  )
}

export default Home