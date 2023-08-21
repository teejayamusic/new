import React from 'react'
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
function Sidebar({curActiveScreen}) {

  const navigate=useNavigate();
  const Homepager = () => {
    // Use navigate function to navigate to the desired route
    navigate('/hometest'); // Replace '/other-page' with the path of the desired route
  };
  const Searchpager = () => {
    // Use navigate function to navigate to the desired route
    navigate('/searchtest'); // Replace '/other-page' with the path of the desired route
  };
  const uploadpage = () => {
    // Use navigate function to navigate to the desired route
    navigate('/uploadtest'); // Replace '/other-page' with the path of the desired route
  };
  const Mymusic = () => {
    // Use navigate function to navigate to the desired route
    navigate('/mymusictest'); // Replace '/other-page' with the path of the desired route
  };


  return (
    <div className='h-full rounded-xl flex'>
      <div className="bg-gray-800 rounded-3xl  h-full ">
<h1 className='m-auto p-4 mb-10 ml-5 text-4xl text-white '>M</h1>
 <ul>
<li className='flex ml-8 mb-5 gap-2'>

<Icon icon="material-symbols:home" color="white" height="32"  targetLink="/home"
 active={curActiveScreen === "home"}  onClick={Homepager} />


</li>
<li className='flex ml-8 mb-5 gap-2'>

<Icon icon="material-symbols:search" onClick={Searchpager} color="white" height="32" />


</li>
<li className='flex ml-8 gap-2'>

<Icon icon="mdi:heart-outline" onClick={uploadpage} color="white" height="32" />


</li>
 <li className='flex ml-8 gap-2 mt-4'>
 <Icon icon="mdi:music" color='white' height='32'
 
 targetLink="/myMusic"
 active={curActiveScreen === "myMusic"}
 
 onClick={Mymusic}/>
 </li>
 <li>
  <Logout />
 </li>
 </ul>

  
  </div>    
    </div>
  )
}

export default Sidebar
