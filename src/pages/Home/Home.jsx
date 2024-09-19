import React from 'react'


import HappyKids from '../../assets/images/happy-kids.png'
import TopNav from '../../component/TopNav/TopNav'
import Button from '../../component/Button/Button'

function Home() {
  return (
    <div style={{ backgroundImage: `url(${HappyKids})`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'cover' }} className='h-screen'>
      <TopNav/>
    <div className='flex flex-row w-screen h-screen items-center px-10'>
      <div>
        <p className='font-invisible text-white text-5xl w-96 text-wrap'><span className='text-red-600'>Singapore</span> School Database</p>
        <p className='font-sans text-white text-xl mb-4'>Find, research, and compare the best singapore schools</p>
        <Button text="Get Started"/>
      </div>
      <div>

      </div>
    </div>
    </div>
  )
}

export default Home