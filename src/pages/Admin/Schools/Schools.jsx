import React, { useEffect, useState } from "react";
import TopNav from "../../../component/TopNav/TopNav";
import LeftNav from "../../../component/LeftNav/LeftNav";
import Button from "../../../component/Button/Button";
import FormInput from "../../../component/FormInput/FormInput"
import schoolsAPI from "../../../api/schools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function Schools() {
  const [schools, setSchools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listPage, setListPage] = useState([1, 2, 3]);
  const [totalSchools, setTotalSchools] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const initalData = async () => {
      const schools = await schoolsAPI.getSchools({ offset: 0,search });
      if (schools.status == "success") {
        setSchools(schools.data);
        setTotalSchools(schools.total);
        const dividePage = schools.total%10;
      if(dividePage != 0){
        const pages = schools.total/10;
        setTotalPages(parseInt(pages+1))
      }else{
        const pages = schools.total/10;
        setTotalPages(parseInt(pages))
      }
      } else {
      }
    };

    initalData();
  }, []);

  const getSchoolList = async (offset) => {
    const schools = await schoolsAPI.getSchools({ offset,search });
    if (schools.status == "success") {
      setSchools(schools.data);
      setTotalSchools(schools.total);
      const dividePage = schools.total%10;
      if(dividePage != 0){
        const pages = schools.total/10;
        setTotalPages(parseInt(pages+1))
      }else{
        const pages = schools.total/10;
        setTotalPages(parseInt(pages))
      }
    } else {
    }
  };

  const onPageClick = (page) => {
    setCurrentPage(page)
    const offsets = ((page-1)*10);
    setOffset(offsets)
    getSchoolList(offsets)
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
    getSchoolList(0);
  }
  return (
    <div>
      <TopNav />
      <div className="flex flex-row gap-1 min-h-screen h-fit">
        <LeftNav menu={"schools"} submenu={"none"} />
        <div className="bg-white w-full py-4 px-4">
          <p className="font-invisible text-2xl">Schools</p>
          <div className={"bg-red-600 w-10 h-1 mb-4"}></div>
          <Button
            text="New School"
            onClick={() => {
              window.location.href = "/admin/create-schools";
            }}
          />
          <div className="my-4">
            <div className="flex flex-row gap-4 items-center">
              <FormInput label={"Search"} width={'w-50'} onChange={onSearchChange} value={search}/>
              <Button text={'Search'} onClick={()=> onSearchClicked()}/>
            </div>
            <table className="table-auto w-full">
              <thead className="bg-red-600 text-white font-invisible">
                <tr>
                  <th className="p-3 tracking-wide text-left">School Name</th>
                  <th className="p-3 tracking-wide text-left">School Type</th>
                  <th className="p-3 tracking-wide text-left">School Email</th>
                  <th className="p-3 tracking-wide text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {schools.length > 0 &&
                  schools.map((school, index) => {
                    return (
                      <tr key={school.id}>
                        <td className="text-left p-3 font-sans border">
                          {school.school_name}
                        </td>
                        <td className="text-left p-3 font-sans border">
                          {school.school_type == 0
                            ? "Goverment"
                            : "Internationals"}
                        </td>
                        <td className="text-left p-3 font-sans border">
                          {school.email}
                        </td>
                        <td className="text-left p-3 font-sans border">
                          <div className={"gap-3 flex flex-row items-center"}>
                            <FontAwesomeIcon
                              icon={faPen}
                              className="cursor-pointer hover:text-red-600"
                              onClick={() => {
                                window.location.href =
                                  "/admin/edit-schools/" + school.id;
                              }}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="cursor-pointer hover:text-red-600"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="flex justify-between items-center my-4">
            <div>
                <p className="font-invisible">Showing  {offset+1} to  {(offset+10)>totalSchools?totalSchools:(offset+10)} of {totalSchools}</p>
              </div>
              <div className="flex flex-row gap-3">
              <Button text={"First"} onClick={()=> {onPageClick(1)}} hidden={currentPage ==1 || currentPage ==2?true:false}/>
                {listPage.map((item, index) => (
                  <Button type={item.toString() == currentPage?'secondary':''} key={index} text={item.toString()} onClick={()=> {onPageClick(item)}}/>
                ))}
                <Button   text={"Last"} onClick={()=> {onPageClick(totalPages)}} hidden={currentPage == totalPages || currentPage == totalPages-1?true:false}/>
              </div>
              <div>
                <p className="font-invisible">Page {currentPage} of {totalPages}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schools;
