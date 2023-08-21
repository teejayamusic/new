import React from 'react'
import {useContext} from "react";
import songContext from "../Context/Songcontext";
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
function Songcard({info, playSound,id,track,artist,currentUser}) {



    const {currentSong, setCurrentSong} = useContext(songContext);
    const thumbnailUrl = info.thumbnail;
  

  return (
 
      <div className="card flex h-20 w-2/3 p-4 hover:bg-white hover:bg-opacity-5  ml-4 mt-5"
    
      onClick={() => {
   setCurrentSong(info)
    }}
      
      >

       
    <div  className="image " >
        <img src={thumbnailUrl} alt="" className='h-12 w-12' />
 {console.log('Thumbnail URL:', info.thumbnail)}
    </div>

    <div className="info">
        <h1 className='text-white hover:cursor-pointer hover:underline ml-3'>{info.name}</h1>
        <h1 className='text-gray-400  hover:cursor-pointer hover:underline text-sm ml-3'> {info.artist.firstName + " " + info.artist.lastName}</h1>
    </div>
    
</div>

  
  )
}

export default Songcard
