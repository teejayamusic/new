import React, { useLayoutEffect, useState } from 'react'
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

import { useNavigate } from 'react-router-dom';






function HomePage({children}) {



  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
} = useContext(songContext);

const firstUpdate = useRef(true);

useLayoutEffect(() => {
    // the following if statement will prevent the useEffect from running on the first render.
    if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
    }

    if (!currentSong) {
        return;
    }
    changeSong(currentSong.track);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentSong && currentSong.track]);



const playSound = () => {
    if (!soundPlayed) {
        return;
    }
    soundPlayed.play();
};

const changeSong = (songSrc) => {
    if (soundPlayed) {
        soundPlayed.stop();
    }
    let sound = new Howl({
        src: [songSrc],
        html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
};

const pauseSound = () => {
    soundPlayed.pause();
};

const togglePlayPause = () => {
    if (isPaused) {
        playSound();
        setIsPaused(false);
    } else {
        pauseSound();
        setIsPaused(true);
    }
};






  const [cookies, setCookie,removeCookie] = useCookies(["token"]);
  return (
    <div className='h-full w-full  bg-gray-900 flex overflow-x-hidden '>
<Sidebar />


  {children}
  {currentSong &&(

<div className='songwid bg-gray-800  h-full  w-1/4'>
  <div className="songcard h-60 w-56 m-auto mt-5 rounded-2xl flex flex-col items-center justify-end p-5" style={{
    backgroundImage: `url('${currentSong.thumbnail}')`, // Use backticks for string interpolation
    backgroundSize: 'cover', // Adjust this as needed
    backgroundPosition: 'center', // Adjust this as needed
  }}>
 <div className=" bg-black bg-opacity-80 rounded-2xl h-28 w-52 flex flex-col items-center p-4">
  <h1 className="text-gray-400 text-xl hover:underline hover:cursor-pointer ">{currentSong.name}</h1>
  <h1 className="text-white text-sm">{currentSong.artist.firstName}</h1>
  <div className="   cursor-pointer" onClick={togglePlayPause}>
    <Icon
      className="hover:cursor-pointer"
      onClick={togglePlayPause}
      icon={isPaused ? "mdi:play" : "material-symbols:pause"}
      color="white"
      width="30"
      height="30"
    />
  </div>
</div>

</div>
</div>

  )}

    </div>
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
  

export default HomePage
