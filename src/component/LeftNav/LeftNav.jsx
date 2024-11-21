import React, { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';



function LeftNav(props) {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setLogin(true);
      getTokenData(token);
    }
  }, []);

  function getTokenData(token) {
    try {
        const decoded = jwtDecode(token);
        console.log(decoded.type);
        setUser(decoded);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
  return (
    <div className="bg-white w-72 py-4">
      {user != null && (
         <ul>
         <li className={props.menu == 'dashboard' ? "px-10 py-2 bg-red-600 text-white cursor-pointer font-invisible":"px-10 py-2 hover:bg-gray-300 hover:text-black cursor-pointer font-invisible"} onClick={()=> window.location.href='/dashboard'}>
           Dashboard
         </li>
 
         
 
         
         {user.type == 'superadmin' || user.type == 'admin' ? (
           <>
           <li className={props.menu == 'book-consultation' ? "px-10 py-2 bg-red-600 text-white cursor-pointer font-invisible":"px-10 py-2 hover:bg-gray-300 hover:text-black cursor-pointer font-invisible"} onClick={()=> window.location.href='/admin/book-consultation'}>
           Consultation
         </li>
         <li className={props.menu == 'tuition' ? "px-10 py-2 bg-red-600 text-white cursor-pointer font-invisible":"px-10 py-2 hover:bg-gray-300 hover:text-black cursor-pointer font-invisible"} onClick={()=> window.location.href='/admin/tuition'}>
          Tuition
       </li>
           <li 
         className={props.menu == 'users' ? "px-10 py-2 bg-red-600 text-white cursor-pointer font-invisible":"px-10 py-2 hover:bg-gray-300 hover:text-black cursor-pointer font-invisible"} onClick={()=> window.location.href='/admin/users'}>
           Users
         </li>
         <li 
         className={props.menu == 'schools' ? "px-10 py-2 bg-red-600 text-white cursor-pointer font-invisible":"px-10 py-2 hover:bg-gray-300 hover:text-black cursor-pointer font-invisible"} onClick={()=> window.location.href='/admin/schools'}>
           Schools
         </li>
 
           </>
           
         ):(<></>)}
         {user.type != 'superadmin' && user.type != 'admin' ? (
          <>
         <li className={props.menu == 'book-consultation' ? "px-10 py-2 bg-red-600 text-white cursor-pointer font-invisible":"px-10 py-2 hover:bg-gray-300 hover:text-black cursor-pointer font-invisible"} onClick={()=> window.location.href='/user/book-consultation'}>
           Consultation
         </li>
         <li className={props.menu == 'tuition' ? "px-10 py-2 bg-red-600 text-white cursor-pointer font-invisible":"px-10 py-2 hover:bg-gray-300 hover:text-black cursor-pointer font-invisible"} onClick={()=> window.location.href='/my-tuition'}>
          Tuition
       </li>
       </>
         ):(<></>)}
         <li 
         className={props.menu == 'profile' ? "px-10 py-2 bg-red-600 text-white cursor-pointer font-invisible":"px-10 py-2 hover:bg-gray-300 hover:text-black cursor-pointer font-invisible"} onClick={()=> window.location.href='/profile'}>
           Profile
         </li>
         <li 
         className={props.menu == 'logout' ? "px-10 py-2 bg-red-600 text-white cursor-pointer font-invisible":"px-10 py-2 hover:bg-gray-300 hover:text-black cursor-pointer font-invisible"} onClick={()=> window.location.href='/admin/schools'}>
           Logout
         </li>
       </ul>
      )}
     
    </div>
  );
}

export default LeftNav;
