import React from 'react'
import {useCookies} from "react-cookie";
import { useState } from 'react';
import {makeUnauthenticatedPOSTRequest} from "../utils/serverHelpers";
import {Link, useNavigate} from 'react-router-dom'
import {RightCircleOutlined } from '@ant-design/icons'
import '../Componenets/login.css'

function Login() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Use navigate function to navigate to the desired route
    navigate('/signup'); // Replace '/other-page' with the path of the desired route
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
 



  const login = async () => {
    const data = {email, password};
    const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
        data
    );
    if (response && !response.err) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, {path: "/", expires: date});
        alert("Success");
        navigate("/home");
    } else {
        alert("Failure");
    }
};















  








  return (
    <div className='background w-full h-full flex flex-col items-center'>
  
      <div className='border-b border-gray-500 p-4 w-full flex justify-center items-center'>
      <h1 className='text-white text-2xl  '>ＭｕｓｉｃＣｏｒｅ</h1>

      </div>
      <div className="mid flex justify-between gap-80 flex-wrap">
        <div className="left">
            <h1 className='createe'>Create</h1>
     <h1 className='create'>Explore</h1>
     <h1 className='createe'>Listen....</h1>
    <div className='flex text-white text-xl hover:cursor-pointer justify-between'>
      <h1 onClick={handleButtonClick}>Register</h1>
      <h1>Trouble Logging in ?</h1>
      
    </div>
        </div>



<div className="right mt-20 ">
<form action="
">
<p className='text-white p-2 text-3xl '>ᴜꜱᴇʀɴᴀᴍᴇ ᴏʀ ᴇᴍᴀɪʟ</p>
<input
   value={email} // Connect value to firstName state
   onChange={(e) => setEmail(e.target.value)} // Update firstName state on input change


type="text" placeholder='Enter Your Username' className='p-2 bg-transparent text-white ' />
<p className='text-white p-2 text-3xl '>ᴘᴀꜱꜱᴡᴏʀᴅ</p>
<input  
   value={password} // Connect value to firstName state
   onChange={(e) => setPassword(e.target.value)} // Update firstName state on input change

type="text" placeholder='Enter Your Username' className='p-2 bg-transparent text-white ' />

</form>

<RightCircleOutlined onClick={login} className='next mt-4 p-2' style={{color:"white", fontSize:"40px"}} />
</div>


      </div>
     


    </div>
  )
}

export default Login
