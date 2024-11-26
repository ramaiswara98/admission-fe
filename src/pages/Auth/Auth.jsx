import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

import TopNav from '../../component/TopNav/TopNav'
import FormInput from '../../component/FormInput/FormInput';
import Button from '../../component/Button/Button';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import Radio from '../../component/Radio/Radio';
import usersAPI from '../../api/users'
import Alert from '../../component/Alert/Alert';
import axios from 'axios';
import Modal from '../../component/Modal/Modal';
import mailAPI from '../../api/mail';

function Auth() {
    const [state, setState] = useState(0);
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [provider, setProvider] = useState('');
    const [exist,setExist] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [providerType, setProviderType] = useState('');
    const [modalDisplay,setModalDisplay] = useState(false);
    const [providerData, setProviderData] = useState('');
    const siteName = import.meta.env.VITE_SITE_TITLE;
    const [signUpAlert, setSignUPAlert] = useState('');
    const [googleAlert, setGoogleAlert] = useState('');


    const handleOnChanges = (item) => {
      if(item.target.name == 'fullname'){
        setFullName(item.target.value);
      }
      if(item.target.name == 'email'){
        setEmail(item.target.value);
      }
      if(item.target.name == 'password'){
        setPassword(item.target.value);
      }

    }
    const handleLoginOnChanges = (item) => {

      if(item.target.name == 'email'){
        setLoginEmail(item.target.value);
      }
      if(item.target.name == 'password'){
        setLoginPassword(item.target.value);
      }

    }
    const onOptionChanges = (e) => {
      setType(e.target.value);
    }
    const onOptionChangesProvider = (e) => {
      setProviderType(e.target.value);
    }

    const SignInButtonClicked = async() => {
      const data = {
        email:loginEmail,
        password:loginPassword,
        provider:'email'
      }
      const loginStatus = await usersAPI.loginUser(data);
      if(loginStatus.status == "success"){
        setLoginMessage('');
        setLoginFailed(false);
        localStorage.setItem('token',loginStatus.token);
        window.location.href = '/'
      }else{
        setLoginMessage(loginStatus.message)
        setLoginFailed(true);
      }
      
    }

    const SignUpButtonClicked = async() => {
      setSignUPAlert(<Alert type={'normal'} message={'Loading...'} />)
      if(fullname !== '' && email !== '' && password !== '' && type !=='' ){
        const data = {
          name:fullname,
          email,
          password,
          type,
          provider:'email'
        }
        const users =await usersAPI.createNewUser(data);
        if(users.status == "success"){
            await sendEmail(data);
            console.log("Register");
        }else{
          if(users.message == 'user already exist'){
            setExist(true);
          }
        }
      }else{

      }
    }

    const login = useGoogleLogin({
      onSuccess: async(tokenResponse) => {
        try{
          const res =  await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
              headers:{
                Authorization:`Bearer ${tokenResponse.access_token}`
              }
            }
          )
          const userData = res.data;
          const data = {
            name:userData.name,
            email:userData.email,
            password:'',
            type:providerType,
            provider:'google'
          }
          const status = await usersAPI.authProvider(data);
          if(status.status == "failed"){
            if(status.message == "user is not exist"){
              setProviderData(data);
              setModalDisplay(true);
            }else{

            }
          }else{
            setLoginMessage('');
            setLoginFailed(false);
            localStorage.setItem('token',status.token);
            window.location.href = '/'
          }
        }catch(err){
          console.log(err)
        }
      }
    });

    const onChooseClicked = async() => {
      setGoogleAlert(<Alert type={'normal'} message={'Loading...'}/>)
      if(providerType == ''){

      }else{
        const data = providerData;
        data.type = providerType;
        const status = await usersAPI.authProvider(data);
        if(status.status == "success"){ 
            await sendEmailGoogle(data);
            setLoginMessage('');
            setLoginFailed(false);
            localStorage.setItem('token',status.token);
            setGoogleAlert(<Alert type={'success'} message={'Successfully Registered'}/>)
            setModalDisplay(false);
            window.location.href = '/'
        }
      }
    }

    const sendEmail = async(user) => {
      const data = {
        fullname: user.name,
        email: user.email,
        subject: "Welcome to " + import.meta.env.VITE_SITE_TITLE+'!',
        body: `<p>Dear <strong>${user.name}</strong>, </p>
               <h3>Welcome to ${import.meta.env.VITE_SITE_TITLE}!</h3>
               <p>You can now access <strong>${import.meta.env.VITE_SITE_TITLE}</strong> using the credentials below:</p>
               <p><strong>Login URL: <a href='${import.meta.env.VITE_DOMAIN}/auth' >${import.meta.env.VITE_DOMAIN}/auth</a></strong></p>
               <p><strong>Email: ${user.email}</strong></p>
               <p><strong>Password: ${user.password}</strong></p>
               <br/><br/><br/>
               <p>Kind Regards,</p>
               <p>Admission Site Team</p>`
      };
      const mail = await mailAPI.sendConsultation(data);
      setFullName('');
      setEmail('');
      setPassword('');
      setSignUPAlert(<Alert type={'success'} message={'Sign up Successfully'}/>);

    }


    const sendEmailGoogle = async(user) => {
      const data = {
        fullname: user.name,
        email: user.email,
        subject: "Welcome to " + import.meta.env.VITE_SITE_TITLE+'!',
        body: `<p>Dear <strong>${user.name}</strong>, </p>
               <h3>Welcome to ${import.meta.env.VITE_SITE_TITLE}!</h3>
               <p>You can now access <strong>${import.meta.env.VITE_SITE_TITLE}</strong> by login using your google account:</p>
               <br/><br/><br/>
               <p>Kind Regards,</p>
               <p>Admission Site Team</p>`
      };
      const mail = await mailAPI.sendConsultation(data);

    }

  return (
    <div className="">
      <TopNav />
      <Modal open={modalDisplay}>
        <div>
          <p className='font-sans mb-2'>Please choose account type first:</p>
        <div className='flex flex-row gap-2'>
        <Radio id={"parentp"} text={"Parent"} name='type' onChange = {onOptionChangesProvider} checked={providerType === "parent"} value={'parent'}/>
        <Radio id={"agentp"} text={"Agent"} name='type' onChange = {onOptionChangesProvider} checked={providerType === "agent"} value={'agent'}/>
        </div>
        {googleAlert}
        </div>
        <Button text={"Choose"} onClick={() => {onChooseClicked()}}/>
      </Modal>
      <div className="flex flex-row justify-center items-center h-screen mt-[-50px] ">
        <div className="bg-white shadow-md w-fit py-4 px-8 rounded-md">
          <div className="flex flex-col justify-center items-center">
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
                <FormInput label={"Full Name"} type={"text"} name='fullname' onChange = {handleOnChanges} value={fullname}/>
                <FormInput label={"Email"} type={"email"} name='email' onChange = {handleOnChanges} value={email}/>
                <FormInput label={"Password"} type={"password"} name='password' onChange = {handleOnChanges} value={password}/>
                <div className='flex flex-row gap-4 justify-start items-start mb-4'>
                <Radio id={"parent"} text={"Parent"} name='type' onChange = {onOptionChanges} checked={type === "parent"} value={'parent'}/>
                <Radio id={"agent"} text={"Agent"} name='type' onChange = {onOptionChanges} checked={type === "agent"} value={'agent'}/>
               
                </div>
                <Button text="Sign Up" onClick={()=> {SignUpButtonClicked()}}/>
                  {exist && <Alert message={"Email already exist"} type={"danger"}/>}
                  {signUpAlert}
                <div className="flex flex-row justify-center items-center w-full m-4">
                  <div className="bg-red-600 w-full h-[2px]"></div>
                  <p className="font-invisible mx-1">OR</p>
                  <div className="bg-red-600 w-full  h-[2px]"></div>
                </div>
                <div className="flex flex-row gap-4">
                  <Button text="Google" social={true} icon={faGoogle} onClick={() => login()}/>
                  <Button text="LinkedIn" social={true} icon={faLinkedin} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <FormInput label={"Email"} type={"email"}  name='email' onChange = {handleLoginOnChanges} value={loginEmail}/>
                <FormInput label={"Password"} type={"password"} name='password' onChange = {handleLoginOnChanges} value={loginPassword} />
                <Button text="Sign In" onClick={()=>{SignInButtonClicked()}}/>
                {loginFailed && <Alert message={loginMessage} type={"danger"}/>}
                <div className="flex flex-row justify-center items-center w-full m-4">
                  <div className="bg-red-600 w-full h-[2px]"></div>
                  <p className="font-invisible mx-1">OR</p>
                  <div className="bg-red-600 w-full  h-[2px]"></div>
                </div>
                <div className="flex flex-row gap-4">
                  <Button text="Google" social={true} icon={faGoogle} onClick={() => login()}/>
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