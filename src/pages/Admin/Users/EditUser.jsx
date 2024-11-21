import React, { useEffect, useState } from "react";


import TopNav from "../../../component/TopNav/TopNav";
import LeftNav from "../../../component/LeftNav/LeftNav";
import FormInput from "../../../component/FormInput/FormInput";
import Radio from "../../../component/Radio/Radio";
import Button from "../../../component/Button/Button";
import Alert from "../../../component/Alert/Alert";
import usersAPI from '../../../api/users'
import { useParams } from "react-router-dom";

function EditUser(props) {
    const [user, setUser] = useState('');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [exist, setExist] = useState(false);
  const [alert, setAlert] = useState("");
  const {id} = useParams();

  useEffect(()=> {
    const getUser = async()=>{
        const us = await usersAPI.getUserById({id:id})
        if(us.status == 'success'){
            setUser(us.data[0]);
            setFullName(us.data[0].name);
            setEmail(us.data[0].email);
            setType(us.data[0].type)
        }else{

        }
        
    }
    getUser();
  },[])

  const handleOnChanges = (item) => {
    if (item.target.name == "fullname") {
      setFullName(item.target.value);
    }
    if (item.target.name == "email") {
      setEmail(item.target.value);
    }
    if (item.target.name == "password") {
      setPassword(item.target.value);
    }
  };

  const onOptionChanges = (e) => {
    setType(e.target.value);
  };

  const handleCreateClicked = async () => {
    if (fullName !== "" && email !== "" && password !== "" && type !== "") {
      const data = {
        name: fullName,
        email,
        password,
        type,
        provider: "email",
      };
      const users = await usersAPI.createNewUser(data);
      if (users.status == "success") {
        setAlert(
          <Alert type={"success"} message={"Account succesfully created"} />
        );
        window.location.href = "/admin/users";
      } else {
        if (users.message == "user already exist") {
          setExist(true);
          setAlert(<Alert type={"danger"} message={"User Already Exist"} />);
        }
      }
      console.log(data);
    } else {
      setAlert(
        <Alert type={"danger"} message={"Please fill up all the form"} />
      );
    }
  };

  return (
    <div>
      <TopNav />
      <div className="flex flex-row gap-1 h-screen">
        <LeftNav menu={"users"} submenu={"users-list"} />
        <div className="bg-white w-full py-4 px-4">
          <p className="font-invisible text-2xl">Edit Users</p>
          <div className={"bg-red-600 w-20 h-1 mb-4"}></div>
          <div className="">
            <FormInput
              label="Full Name"
              type={"text"}
              name={"fullname"}
              onChange={handleOnChanges}
              value={fullName}
            />
            <FormInput
              label="Email"
              type={"email"}
              name={"email"}
              onChange={handleOnChanges}
              value={email}
            />
            {/* <FormInput
              label="Password"
              type={"password"}
              name={"password"}
              onChange={handleOnChanges}
              value={password}
            /> */}
            <p className="font-invisible">Role:</p>
            <div className="flex flex-row gap-3">
              <Radio
                text={"Admin"}
                id={"admin"}
                name={"type"}
                value={"admin"}
                onChange={onOptionChanges}
                checked={type == "admin"}
              />
              <Radio
                text={"Staff"}
                id={"staff"}
                name={"type"}
                value={"staff"}
                onChange={onOptionChanges}
                checked={type == "staff"}
              />
              <Radio
                text={"School Admin"}
                id={"schooladmin"}
                name={"type"}
                value={"schooladmin"}
                onChange={onOptionChanges}
                checked={type == "schooladmin"}
              />
              <Radio
                text={"Partner"}
                id={"partner"}
                name={"type"}
                value={"partner"}
                onChange={onOptionChanges}
                checked={type == "partner"}
              />
              <Radio
                text={"Parent"}
                id={"parent"}
                name={"type"}
                value={"parent"}
                onChange={onOptionChanges}
                checked={type == "parent"}
              />
              <Radio
                text={"Agent"}
                id={"agent"}
                name={"type"}
                value={"agent"}
                onChange={onOptionChanges}
                checked={type === "agent"}
              />
            </div>
            <Button
              text={"Save Changes"}
              onClick={() => {
                handleCreateClicked();
              }}
            />
            {alert}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
