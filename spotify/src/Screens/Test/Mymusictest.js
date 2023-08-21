import React, { useContext, useEffect, useRef, useState } from 'react'

import { url } from '../../utils/CloudinaryService'
import Songcard from '../../Componenets/Songcard'
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../../utils/serverHelpers';
import {Howl, Howler} from "howler";
import songContext from '../../Context/Songcontext';
import Hometest from './Hometest';



function Mymusic() {
   

 







    const [songData, setSongData] = useState([]);
const [soundPlayed, setSoundPlayed]=useState(null)
const playSound =(songSrc)=>{
    if (soundPlayed){
        soundPlayed.stop()
    }
    let sound = new Howl({
        src: [songSrc],
        html5: true

      });
      setSoundPlayed(sound);
      console.log(sound);
      sound.play();
}

    

const getData = async () => {
    try {
        const response = await makeAuthenticatedGETRequest('/song/get/mysongs');
        setSongData(response.data);
    } catch (error) {
        console.error(error);
    }
};

   

    const handleDeleteSong = async (songId) => {
        try {
                    console.log('Song ID to delete:', songId); 
            const response = await makeAuthenticatedPOSTRequest(`/song/delete/${songId}`);
            if (response.message) {
                // Refresh the song list after deletion
                getData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);




  return (
    <Hometest>
    <div className='h-full w-full'>
        <h1 className='text-xl text-white mt-4 ml-7'>My Songs</h1>
        <div className="w-full">
            {songData.map((item) => (
                <div key={item._id} className="song-card">
                    <Songcard info={item} playSound={playSound} />
                    <button className="delete-button" onClick={() => handleDeleteSong(item._id)}>
    Delete
</button>

                </div>
            ))}
        </div>
    </div>
</Hometest>

  )
}

export default Mymusic
