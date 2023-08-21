import React from 'react'
import './Home.css'
import Sidebar from '../Sidebar'



import  { useLayoutEffect,useEffect, useState } from 'react'
import { Howl , Howler } from 'howler';
import "../../Componenets/login.css"
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';

import { useRef,useContext } from 'react';
import songContext from '../../Context/Songcontext';
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../../utils/serverHelpers';

import { useNavigate } from 'react-router-dom';
import Songcard from '../../Componenets/Songcard';





















function Hometest({children,updateRecentlyPlayed}) {



  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  
} = useContext(songContext);

const firstUpdate = useRef(true);


const [recentlyPlayed, setRecentlyPlayed] = useState([]);








const [currentSeekTime, setCurrentSeekTime] = useState(0);
const [totalDuration, setTotalDuration] = useState(0);






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

useEffect(() => {
  // Fetch new suggestions whenever the soundPlayed state changes
  if (soundPlayed) {
    fetchRandomSuggestions();
  }
}, [soundPlayed]);


const playSound = () => {
    if (!soundPlayed) {
        return;
    }
    soundPlayed.play();
};

const changeSong = (songSrc) => {
  if (soundPlayed) {
    soundPlayed.unload();
  }
  let sound = new Howl({
    src: [songSrc],
    html5: true,
  });
  setSoundPlayed(sound);
  sound.on("play", () => {
    setTotalDuration(sound.duration());
 
  });
  sound.play();
  setIsPaused(false);
};
useEffect(() => {
  const interval = setInterval(() => {
    if (soundPlayed && !isPaused) {
      setCurrentSeekTime(soundPlayed.seek());
    }
  }, 1000); // Update every second

  return () => {
    clearInterval(interval);
  };
}, [soundPlayed, isPaused]);


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


const [suggestedSongs, setSuggestedSongs] = useState([]);
const [songData, setSongData] = useState([]);


  const [cookies, setCookie,removeCookie] = useCookies(["token"]);
  

  const handleSongCardClick = () => {
    fetchRandomSuggestions(); // Fetch new suggestions when a song card is clicked
  };

  const fetchRandomSuggestions = async () => {
    try {
      const response = await makeAuthenticatedGETRequest('/song/get/random-suggestions');
      console.log("API Response:", response);
  
      if (response) {
        // Assuming 'response.data' is an array of song suggestions
        setSuggestedSongs(response.data);
      }
    } catch (error) {
      console.error("Error fetching random suggestions:", error);
      // Handle the error or set 'randomSuggestions' to an empty array
    }
  };
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  


  return (
    <div className='main overflo-y-auto '>
  <div className="maincontent overflow-y-auto rounded-3xl">
    <div className="">
      <Sidebar />
    </div>
{children}


{currentSong &&(

<div className='overflow-y-auto'>
  <div className="songcard h-60 w-56 m-auto mt-5 rounded-2xl flex flex-col items-center justify-end p-5" style={{
    backgroundImage: `url('${currentSong.thumbnail}')`, // Use backticks for string interpolation
    backgroundSize: 'cover', // Adjust this as needed
    backgroundPosition: 'center', // Adjust this as needed
  }}>
 <div className=" bg-black bg-opacity-80 rounded-2xl h-38 w-52 flex flex-col items-center p-4">
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
  <div className="seek-bar">
  <input
    type="range"
    min={0}
    max={totalDuration}
    value={currentSeekTime}
    onChange={(e) => {
      soundPlayed.seek(e.target.value);
      setCurrentSeekTime(parseFloat(e.target.value));
    }}
  />
  <div className="seek-time ml-6 text-white">
    {formatTime(currentSeekTime)} / {formatTime(totalDuration)}
  </div>
</div>






  




</div>





</div>



<div>


</div>
<div>

<ul>
{suggestedSongs.map((song, index) => (
        <Songcard
          info={song}
          key={JSON.stringify(song)} // Using JSON.stringify as a simple key
          playSound={() => {}}
          
        />
      ))}

  </ul>

<h1 className='text-white text-xl'>Suggested Songs</h1>

</div>





</div>



  )}








  </div>
    </div>
  )
}

export default Hometest
