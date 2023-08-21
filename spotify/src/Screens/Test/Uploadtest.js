import React, { useState } from 'react'
import HomePage from '../HomePage';
import { makeAuthenticatedPOSTRequest } from '../../utils/serverHelpers';
import CloudinaryUpload from '../CloudinaryUpload';
import { useNavigate } from 'react-router-dom';
import Hometest from './Hometest';

function Uploadtest() {



    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState();
    const navigate = useNavigate();

    const submitSong = async () => {
        const data = {name, thumbnail, track: playlistUrl};
        const response = await makeAuthenticatedPOSTRequest(
            "/song/create",
            data
        );
        if (response.err) {
            alert("Could not create song");
            return;
        }
        alert("Success");
        navigate("/hometest");
    };










  return (
    <Hometest>
<div className="upload overflow-y-auto p-10">
        <h1 className='text-xl text-white '>Upload Your Songs</h1>
        <p className='mt-4 text-white mb-2'>Name</p>
       <input   type="text"  placeholder='Name ' className=' p-2 rounded-lg h-10 w-42'
       
       value={name} 
   onChange={(e) => setName(e.target.value)}

       
       
       />
       <p className='mt-4 text-white mb-2'>Thumbnail</p>
       <input type="text" 
              value={thumbnail} 
              onChange={(e) => setThumbnail(e.target.value)}

       
       placeholder='Thumbnail Link' className=' p-2 rounded-lg h-10 w-42'/>


  <div className="pt-4 ">
                        {uploadedSongFileName ? (
                            <div className="bg-white rounded-full p-3 h-14 w-2/3">
                                {uploadedSongFileName.substring(0, 35)}...




                                <div
                        className="bg-white mt-14 w-32 flex items-center justify-center p-4  rounded-full cursor-pointer font-semibold"
                        onClick={submitSong}
                    >
                        Submit Song
                    </div>





                            </div>





                        ) : (
                            <CloudinaryUpload
                                setUrl={setPlaylistUrl}
                                setName={setUploadedSongFileName}
                            />
                        )}
                    </div>



      
      </div>
      </Hometest>
  )
}

export default Uploadtest
