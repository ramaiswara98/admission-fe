import React, { useEffect, useState } from 'react'
import TopNav from '../../../component/TopNav/TopNav'
import LeftNav from '../../../component/LeftNav/LeftNav'
import Button from '../../../component/Button/Button'
import FormInput from '../../../component/FormInput/FormInput'
import usersAPI from '../../../api/users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function Users() {
    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const gettingData = async()=> {
          const data = {
            search,
            page,
            limit
          }
            const users =  await usersAPI.getAllUsers(data);
            console.log(users);
            setUserList(users.data);
        }
        gettingData();
    },[])
  return (
    <div>
      <TopNav />
      <div className="flex flex-row gap-1 h-min-screen h-fit">
        <LeftNav menu={"users"} submenu={"users-list"} />
        <div className="bg-white w-full py-4 px-4">
          <p className="font-invisible text-2xl">Users</p>
          <div className={"bg-red-600 w-10 h-1 mb-4"}></div>

          <div>
            <Button text="New Users" onClick={()=>{window.location.href='/admin/create-users'}}/>
          </div>
          <div className="my-4 flex flex-row justify-between items-center">
            <div className='flex flex-row items-center gap-2'>
            <FormInput label={"Search"} />
            <Button text="Search"/>
            </div>
            
            <div>
                <Button text="Filter"/>
            </div>
          </div>
          <div>
            <table className="table-auto w-full">
              <thead className="bg-red-600 text-white font-invisible">
                <tr>
                  <th className='p-3 tracking-wide text-left'>Full Name</th>
                  <th className='p-3 tracking-wide text-left'>Email</th>
                  <th className='p-3 tracking-wide text-left'>Role</th>
                  <th className='p-3 tracking-wide text-left'>Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.length>0 && userList.map((user, index)=> {
                    return(
                        <tr key={user.id}>
                        <td className='text-left p-3 font-sans border'>{user.name}</td>
                        <td className='text-left p-3 font-sans border'>{user.email}</td>
                        <td className='text-left p-3 font-sans border'>{user.type}</td>
                        <td className='text-left p-3 font-sans border '>
                            <div className='flex flex-row gap-3'>
                                <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer hover:text-red-600' onClick={()=>{window.location.href='/admin/edit-users/'+user.id}}/>
                                <FontAwesomeIcon icon={faTrashCan} className='cursor-pointer hover:text-red-600'/>
                            </div>
                            
                        </td>
                      </tr>
                    )
                })}
               
              </tbody>
            </table>
            <div className='flex flex-row justify-between items-center mt-8'>
                <div>
                    <p>10/Page</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <Button text="1"/>
                    <Button text="2"/>
                    <Button text="3"/>
                    <Button text=">|"/>
                </div>
                <div>
                    <p>Show 10 of 200</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users