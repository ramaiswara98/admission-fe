import React from "react";

function TopNav() {
  return (
    <div className="bg-white w-screen h-16  drop-shadow-md flex flex-row items-center px-10 justify-between">
        <div>
        <p className=" font-invisible text-lg text-black cursor-pointer" onClick={()=>{window.location.href= '/'}}> Singapore School Database</p>
        </div>
        <div className="flex flex-row gap-8">
            <div>
                <p className="font-invisible text-lg text-black cursor-pointer hover:underline hover:text-red-600">Services</p>
            </div>
            <div>
                <p className="font-invisible text-lg text-black cursor-pointer  hover:underline hover:text-red-600" onClick={()=>{window.location.href= '/auth'}}>Get Started</p>
            </div>
        </div>
    </div>
  );
}

export default TopNav;
