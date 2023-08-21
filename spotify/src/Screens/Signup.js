import React from 'react'
import {useCookies} from "react-cookie";
import { useState } from 'react';
import {makeUnauthenticatedPOSTRequest} from "../utils/serverHelpers";
import {Link, useNavigate} from 'react-router-dom'
import {RightCircleOutlined } from '@ant-design/icons'

function Signup() {

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmEmail) {
        alert(
            "Email and confirm email fields must match. Please check again"
        );
        return;
    }
    const data = {email, password, username, firstName, lastName};
    const response = await makeUnauthenticatedPOSTRequest(
        "/auth/register",
        data
    );
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, {path: "/", expires: date});
      alert("Success");
      navigate("/");
        
    } else {
        alert("Failure");
    }
};








  return (
    <div className='background w-full h-full flex flex-col items-center'>
  
    <div className='border-b border-gray-500 p-4 w-full flex justify-center items-center'>
    <h1 className='text-white text-2xl  '>ＭｕｓｉｃＣｏｒｅ</h1>
    </div>

    <div className="right mt-20 flex flex-col justify-center items-center">
<form action=" 
"  className='flex flex-col justify-center items-center'>

    <h1 className='text-5xl text-white mb-12'>ꜱɪɢɴ ᴜᴘ</h1>
    <div className="flex gap-2 flex-wrap ">
      <div className='flex flex-col'>
            <p className="text-white p-2 text-3xl ">ꜰɪʀꜱᴛ ɴᴀᴍᴇ</p>
            <input
              type="text"
              placeholder="Enter Your FirstName"
              className="p-2 bg-transparent text-white"
              value={firstName} // Connect value to firstName state
              onChange={(e) => setFirstName(e.target.value)} // Update firstName state on input change
            />
            </div>
            <div className='flex flex-col'>
            <p className="text-white p-2 text-3xl ">ʟᴀꜱᴛ ɴᴀᴍᴇ</p>
            <input
              type="text"
              placeholder="Enter Your Lastname"
              className="p-2 bg-transparent text-white"
              value={lastName} // Connect value to lastName state
              onChange={(e) => setLastName(e.target.value)} // Update lastName state on input change
            />
            </div>
          </div>

          <div className="right mt-2 gap-7 flex flex-wrap">
            <div className='flex flex-col'>
            <p className="text-white p-2 text-3xl ">ᴜꜱᴇʀɴᴀᴍᴇ</p>
            <input
              type="text"
              placeholder="Enter Your Username"
              className="p-2 mr-2 bg-transparent  text-white"
              value={username} // Connect value to username state
              onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            />
            </div>
            <div className='flex flex-col'>
            <p className="text-white p-2 text-3xl ">ᴇᴍᴀɪʟ</p>
            <input
              type="text"
              placeholder="Enter Your Email"
              className="p-2 bg-transparent text-white"
              value={email} // Connect value to email state
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            />
</div>

<div className='flex flex-col'>
<p className="text-white p-2 text-3xl ">Confirm ᴇᴍᴀɪʟ</p>
            <input
              type="text"
              placeholder="Enter Your Email"
              className="p-2 bg-transparent text-white"
              value={confirmEmail} // Connect value to email state
              onChange={(e) => setConfirmEmail(e.target.value)} // Update email state on input change
            />
</div>


          </div>
          <p className="text-white p-2 text-3xl ">ᴘᴀꜱꜱᴡᴏʀᴅ</p>
          <input
            type="password"
            placeholder="Enter Your Password"
            className="p-2 ml-10 bg-transparent text-white"
            value={password} // Connect value to password state
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          />
        </form>
        <RightCircleOutlined
          className="next mt-4 p-2"
          style={{ color: 'white', fontSize: '40px' }}
          onClick={signUp} // Call the signUp function on icon click
        />
      </div>
<Link  to='/login' className='text-xl text-white' >Already A User? Sign in</Link>



    </div>



  )
}

export default Signup
