import React, { useState } from 'react'
import { Howl , Howler } from 'howler';
import "../../Componenets/login.css"
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';

import { useRef,useContext } from 'react';
import songContext from '../../Context/Songcontext';
import { makeAuthenticatedPOSTRequest } from '../../utils/serverHelpers';


import Hometest from './Hometest'



function Mainhometest() {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

    const [cookies, setCookie] = useCookies(["token"]);


    

  return (
    <Hometest >
        
    <div className="mid overflow-y-auto">
    <h1 className='text-white text-2xl mt-3 overflow-y-auto'>Recenty Played</h1>
   
 <div className="flex mt-5 gap-8 flex-wrap ">

 {cardData.map((card, index) => (
                        <Card key={index} url={card.url} name={card.name} />
                    ))}

</div>





    </div>
 
    </Hometest>
  )
}

const Card=({url,name})=>{
    return(
        <div className="card h-40 w-40 flex justify-center items-end hover:cursor-pointer hover:opacity-40 rounded-3xl p-3" style={{
            backgroundImage: `url(${url})`,

          backgroundSize:'cover'
                }}>
                <h1 className='text-white text-xl'>{name}</h1>
                
                </div>
          
    )
}









const cardData = [
    {
      url: 'https://images.unsplash.com/photo-1549046675-dd779977de88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWRtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      name: 'EDM'
    },
    {
      url: 'https://images.unsplash.com/photo-1529245856630-f4853233d2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60ttps://images.unsplash.com/photo-2',
      name: 'Pop'
    },{

url:"https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amF6enxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
name:"Jazz"

    },{
url:'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWNjb3VzdGljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
,name:"Accoustic"    

},
    // Add more objects for each card
  ];
  
  










export default Mainhometest
