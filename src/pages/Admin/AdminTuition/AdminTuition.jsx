import React,{useState, useEffect} from 'react'
import TopNav from '../../../component/TopNav/TopNav'
import LeftNav from '../../../component/LeftNav/LeftNav'
import tuitionAPI from '../../../api/tuition';

function AdminTuition() {
  const [listTuition, setListTuition]= useState([]);

  useEffect(()=> {
    getTuition();
  },[])


  const getTuition = async () => {
    const getAllTuition = await tuitionAPI.getAllTuition();
    if(getAllTuition.status == "success"){
      console.log(getAllTuition.data)
      setListTuition(getAllTuition.data)
    }else{
      console.log("error");
    }
  }
  

  return (
    <div>
      <TopNav/>
      <div className='flex flex-row gap-1'>
        <LeftNav menu="tuition"/>
        <div className="bg-white w-full px-4 py-4 min-h-screen">
          <p className="font-invisible text-xl">Tuition</p>
          <div className={"bg-red-600 w-10 h-1 mb-4"}></div>
          <div>
            <table className="table-auto w-full">
                          <thead className="bg-red-600 text-white font-invisible">
                              <tr>
                              <th className="p-3 tracking-wide text-left">Subject</th>
                              <th className="p-3 tracking-wide text-left">Session Schedule</th>
                              <th className="p-3 tracking-wide text-left">Session</th>
                              <th className="p-3 tracking-wide text-left">Start Date</th>
                              <th className="p-3 tracking-wide text-left">User</th>
                              <th className="p-3 tracking-wide text-left">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                            {listTuition.length > 0 && listTuition.map((tuition,index) => {
                              return (
                                <tr key={tuition.id}>
                                  <td className="text-left p-3 font-sans border">{tuition.subject}</td>
                                  <td className="text-left p-3 font-sans border">{tuition.day} {tuition.time}</td>
                                  <td className="text-left p-3 font-sans border">{tuition.session}</td>
                                  <td className="text-left p-3 font-sans border">{tuition.start}</td>
                                  <td className="text-left p-3 font-sans border">{tuition.name}</td>
                                  <td className="text-left p-3 font-sans border"></td>
                                </tr>
                              )
                            })}
                            </tbody>
                            </table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTuition