import React from 'react'
import TopNav from '../../component/TopNav/TopNav'
import LeftNav from '../../component/LeftNav/LeftNav'

function Dashboard() {
  return (
    <div>
        <TopNav/>
        <div 
            className='flex flex-row gap-1'
        >
            <LeftNav menu={'dashboard'}/>
            <div className='bg-white w-full py-4 min-h-screen'>
                
            </div>

        </div>
    </div>
  )
}

export default Dashboard