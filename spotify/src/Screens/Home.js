import React, { useState } from 'react'
import { Howl , Howler } from 'howler';
import "../Componenets/login.css"
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';
import Sidebar from './Sidebar';
import { useRef,useContext } from 'react';
import songContext from '../Context/Songcontext';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
import HomePage from './HomePage';







function Home() {






  const [cookies, setCookie] = useCookies(["token"]);
  return (

<HomePage curActiveScreen='Home'>

<div className="cards flex flex-wrap gap-16">


<Cards title='Pop' songs=''  />

    
    
    <Cards title='Rnb' songs=''  />

<Cards title='Rnb' songs=''  />
<Cards title='EDM' songs=''  />
<Cards title='Accoustic' songs=''  />
</div>



</HomePage>
  
  )
}


const Cards= ({title,songs})=>{
  return(
    <div className='bg h-40 w-40 rounded-3xl mt-3 ml-3 p-4'>
      <div className='border-t border-solid w-full mt-20'> 
      <h1 className='mt-0   text-white text-2xl'>{title}</h1>
      <p className='text-white ml-6'>{songs}</p>
      </div>



    </div>
  )
}

export default Home
