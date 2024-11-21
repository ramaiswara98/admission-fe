import React, { useEffect, useState } from 'react'
import TopNav from '../../component/TopNav/TopNav'
import LeftNav from '../../component/LeftNav/LeftNav'
import Lines from '../../component/Lines/Lines'
import { jwtDecode } from 'jwt-decode';
import FormInput from '../../component/FormInput/FormInput';
import Button from '../../component/Button/Button';

function Profile() {
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
        console.log(decode);
        setUser(decoded);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
  return (
    <div>
        <TopNav/>
        <div 
            className='flex flex-row gap-1'
        >
            <LeftNav  menu={'profile'}/>
            <div className='bg-white min-h-screen w-full py-4 px-4'>
                <p className='font-invisible text-xl'>Profile</p>
                <Lines/>
                <div className='flex flex-col gap-4'>
                    <FormInput label={'Name'}/>
                    <FormInput label={'Email'}/>
                    <Button text={'Change Password'}/>
                    <Button text={'Save Changes'}/>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Profile