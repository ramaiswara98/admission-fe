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
    const [currentPage, setCurrentPage] = useState(1);
    const [listPage, setListPage] = useState([1, 2, 3]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState('');

    useEffect(() => {
      gettingData(0);
    },[])

    const gettingData = async(offsett)=> {
      const data = {
        search,
        offset:offsett
      }
        const users =  await usersAPI.getAllUsers(data);
        console.log(users);
        setUserList(users.data);
        setTotalUsers(users.total);
        const dividePage = users.total%10;
        if(dividePage != 0){
          const pages = users.total/10;
          setTotalPages(parseInt(pages+1))
          if(pages+1 <3){
            const list = [];
            for(let i = 1; i< pages+1;i++){
              list.push(i);
            }
            setListPage(list)
          }
        }else{
          const pages = users.total/10;
          setTotalPages(parseInt(pages))
          if(pages+1 <3){
            const list = [];
            for(let i = 1; i< pages+1;i++){
              list.push(i);
            }
            setListPage(list)
          }
        }
    }

    const onPageClick = (page) => {
      setCurrentPage(page)
      const offsets = ((page-1)*10);
      setOffset(offsets)
      console.log(offsets)
      gettingData(offsets)
      const pageList = [];
      if((page-1) > 0 ){
        pageList.push(page-1);
        pageList.push(page);
        if((page+1) > totalPages){
          pageList.push(page-2)
        }else{
          pageList.push(page+1);
        }
      }else{
        pageList.push(page);
        pageList.push(page+1);
        pageList.push(page+2);
      }
      pageList.sort((a,b)=>a-b);
      setListPage(pageList);
  
    };

    const onSearchChange = (e) => {
      setSearch(e.target.value)
    }
  
    const onSearchClicked = () => {
      console.log("Makan")
      gettingData(0);
    }

  return (
    <div>
      <TopNav />
      <div className="flex flex-row gap-1 min-h-screen h-fit">
        <LeftNav menu={"users"} submenu={"users-list"} />
        <div className="bg-white w-full py-4 px-4">
          <p className="font-invisible text-2xl">Users</p>
          <div className={"bg-red-600 w-10 h-1 mb-4"}></div>

          <div>
            <Button text="New Users" onClick={()=>{window.location.href='/admin/create-users'}}/>
          </div>
          <div className="my-4 flex flex-row justify-between items-center">
            <div className='flex flex-row items-center gap-2'>
            <FormInput label={"Search"} onChange={onSearchChange}/>
            <Button text="Search" onClick={()=> {onSearchClicked()}}/>
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
                    <p className='font-invisible'>Showing {offset+1} to {offset+10} of {totalUsers}</p>
                </div>
                <div className="flex flex-row gap-3">
              <Button text={"First"} onClick={()=> {onPageClick(1)}} hidden={currentPage ==1 || currentPage ==2?true:false}/>
                {listPage.map((item, index) => (
                  <Button type={item.toString() == currentPage?'secondary':''} key={index} text={item.toString()} onClick={()=> {onPageClick(item)}}/>
                ))}
                <Button   text={"Last"} onClick={()=> {onPageClick(totalPages)}} hidden={currentPage == totalPages || currentPage == totalPages-1?true:false}/>
              </div>
                <div>
                    <p className='font-invisible'>Page {currentPage} of {totalPages}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users