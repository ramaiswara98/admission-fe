import React, { useState } from 'react'
import TopNav from '../../component/TopNav/TopNav'
import FormInput from '../../component/FormInput/FormInput';
import Button from '../../component/Button/Button';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import Radio from '../../component/Radio/Radio';

function Auth() {
    const [state, setState] = useState(0);
  return (
    <div className="">
      <TopNav />
      <div className="flex flex-row justify-center items-center h-screen mt-[-50px] ">
        <div className="bg-white shadow-md w-fit py-4 px-8 rounded-md">
          <div className="flex flex-col justify-center items-center">
            {/* <div className='flex flex-row gap-4 bg-gray-300 py-2 px-4 rounded-md items-center mb-4 w-fit'>
                        <div className={state==0?'bg-red-600 py-2 px-4 rounded-l-md  text-white':'py-2 px-4 rounded-md cursor-pointer '} >
                            Register
                        </div>
                        <div className={state==1?'bg-red-600 py-2 px-4 rounded-r-md text-white ':'py-2 px-4 rounded-md cursor-pointer'} onClick={()=>{setState(1)}}>
                            Login
                        </div>
                    </div> */}
            <div className="flex flex-row gap-8 items-center">
              <div
                onClick={() => {
                  setState(0);
                }}
                className="cursor-pointer"
              >
                <p
                  className={
                    state == 0
                      ? "font-invisible mt-4 text-xl"
                      : "text-gray-300 text-xl font-invisible mt-4 hover:text-black"
                  }
                >
                  Sign Up
                </p>
                <div
                  className={
                    state == 0 ? "bg-red-600 w-10 h-1 mb-4" : "w-10 h-1 mb-4"
                  }
                ></div>
              </div>
              <div
                onClick={() => {
                  setState(1);
                }}
                className="cursor-pointer"
              >
                <p
                  className={
                    state == 1
                      ? "font-invisible mt-4 text-xl"
                      : "text-gray-300 text-xl font-invisible mt-4 hover:text-black"
                  }
                >
                  Sign In
                </p>
                <div
                  className={
                    state == 1 ? "bg-red-600 w-10 h-1 mb-4" : "w-10 h-1 mb-4"
                  }
                ></div>
              </div>
            </div>

            {state == 0 ? (
              <div className="flex flex-col justify-center items-center">
                <FormInput label={"Full Name"} type={"text"} />
                <FormInput label={"Email"} type={"email"} />
                <FormInput label={"Password"} type={"password"} />
                <div className='flex flex-row gap-4 justify-start items-start mb-4'>
               <Radio text={"Parent"}/>
               <Radio text={"Agent"}/>
               
                </div>
                <Button text="Sign Up" />
                <div className="flex flex-row justify-center items-center w-full m-4">
                  <div className="bg-red-600 w-full h-[2px]"></div>
                  <p className="font-invisible mx-1">OR</p>
                  <div className="bg-red-600 w-full  h-[2px]"></div>
                </div>
                <div className="flex flex-row gap-4">
                  <Button text="Google" social={true} icon={faGoogle} />
                  <Button text="LinkedIn" social={true} icon={faLinkedin} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <FormInput label={"Email"} type={"email"} />
                <FormInput label={"Password"} type={"password"} />
                <Button text="Sign In" onClick={()=>{window.location.href = '/find-school'}}/>
                <div className="flex flex-row justify-center items-center w-full m-4">
                  <div className="bg-red-600 w-full h-[2px]"></div>
                  <p className="font-invisible mx-1">OR</p>
                  <div className="bg-red-600 w-full  h-[2px]"></div>
                </div>
                <div className="flex flex-row gap-4">
                  <Button text="Google" social={true} icon={faGoogle} />
                  <Button text="LinkedIn" social={true} icon={faLinkedin} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth