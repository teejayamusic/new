import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";

import Songcard from "../../Componenets/Songcard";

import Hometest from './Hometest'

const SearchTest = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
const [searchText,setSearchText]=useState("");
  const [songData, setSongData] = useState([]);
//case


useEffect(() => {
    if (searchText.trim() !== "") {
      searchSong(searchText);
    } else {
      setSongData([]);
    }
  }, [searchText]);
 
  const searchSong = async () => {
  
    try {
      const response = await makeAuthenticatedGETRequest(
        `/song/get/songname/` + searchText // Use the original search text
      );
      console.log("API Response:", response);
      if (response) {
        const filteredData = response.data.filter(item => {
          const lowerCaseName = item.name.toLowerCase();
          const lowerCaseSearchText = searchText.toLowerCase();
  
          // Use includes to match partial song names with case-insensitive comparison
          return lowerCaseName.includes(lowerCaseSearchText);
        });
  
        setSongData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongData([]); // Clear song data in case of an error
    }
    }





  

  return (
    <Hometest curActiveScreen="search">
      <div className="w-full py-6">
        <div
          className={`w-1/3 p-3 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center ${
            isInputFocused ? "border border-white" : ""
          }`}
        >
          <Icon icon="ic:outline-search" className="text-lg" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-gray-800 focus:outline-none"
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
   value={searchText}
   onChange={(event) => setSearchText(event.target.value)}
      
          />
       
        </div>
        {songData.length > 0 ? (
          <div className="pt-10 space-y-3">
            <div className="text-white">
              Showing search results for
              <span className="font-bold"> </span>
            </div>
            {songData.map((item) => {
              return (
                <Songcard
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400 pt-10">Nothing to show here.</div>
        )}
      </div>
    </Hometest>
  );
};

export default SearchTest;
