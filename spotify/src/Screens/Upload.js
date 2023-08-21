import React, { useState } from 'react'
import Sidebar from './Sidebar'
import CloudinaryUpload from './CloudinaryUpload'
import { useNavigate } from 'react-router-dom';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
function Upload() {

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
        navigate("/home");
    };







  return (
    <div className='flex h-full flex-row bg-gray-300'>
      <Sidebar  />
      <div className="upload p-10">
        <h1 className='text-xl '>Upload Your Songs</h1>
        <p className='mt-4 mb-2'>Name</p>
       <input   type="text"  placeholder='Name ' className=' p-2 rounded-lg h-10 w-42'
       
       value={name} 
   onChange={(e) => setName(e.target.value)}

       
       
       />
       <p className='mt-4 mb-2'>Thumbnail</p>
       <input type="text" 
              value={thumbnail} 
              onChange={(e) => setThumbnail(e.target.value)}

       
       placeholder='Thumbnail Link' className=' p-2 rounded-lg h-10 w-42'/>


  <div className="py-5">
                        {uploadedSongFileName ? (
                            <div className="bg-white rounded-full p-3 w-1/3">
                                {uploadedSongFileName.substring(0, 35)}...




                                <div
                        className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
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
    </div>
  )
}

export default Upload
