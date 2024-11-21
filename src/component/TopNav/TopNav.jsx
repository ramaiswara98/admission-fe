import React, { useEffect, useState } from "react";

function TopNav() {
  const [login, setLogin] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isServiceVisible, setIsServiceVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setLogin(true);
    }
  }, []);

  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleServiceToggle = () => {
    setIsServiceVisible(!isServiceVisible)
  }
  return (
    <div className="bg-white w-full h-16  drop-shadow-md flex flex-row items-center px-10 justify-between">
      <div>
        <p
          className=" font-invisible text-lg text-black cursor-pointer"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          {import.meta.env.VITE_SITE_TITLE}
        </p>
      </div>
      <div className="flex flex-row gap-8">
        <div>
          <p className="font-invisible text-lg text-black cursor-pointer hover:underline hover:text-red-600"
            onClick={()=>{handleServiceToggle()}}>
            Services
          </p>
          {isServiceVisible && (
              
              <div className="absolute right-8 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul>
                <li className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                    onClick={()=>{window.location.href = '/'}}
                  >
                    Find Schools
                  </li>
                  <li className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                    onClick={()=>{window.location.href = '/create-tuition'}}
                  >
                    Tuition
                  </li>
                 
                </ul>
              </div>
              
            )}
        </div>
        {login ? (
          <div>
            <p
              className="font-invisible text-lg text-black cursor-pointer  hover:underline hover:text-red-600"
              onClick={() => {
                handleDropdownToggle()
              }}
            >
              Account
            </p>
            {isDropdownVisible && (
              
              <div className="absolute right-8 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul>
                  <li className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                    onClick={()=>{window.location.href = '/dashboard'}}
                  >
                    Dashboard
                  </li>
                  <li className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                    onClick={()=>{window.location.href = '/profile'}}
                  >
                    Profile
                  </li>
                  <li className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                    onClick={()=> {localStorage.removeItem('token'); window.location.href='/'}}
                  >
                    Sign Out
                  </li>
                </ul>
              </div>
              
            )}
          </div>
        ) : (
          <div>
            <p
              className="font-invisible text-lg text-black cursor-pointer  hover:underline hover:text-red-600"
              onClick={() => {
                window.location.href = "/auth";
              }}
            >
              Get Started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopNav;
