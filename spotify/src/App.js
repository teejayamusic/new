
import './App.css';
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import {useCookies} from "react-cookie";
import Upload from './Screens/Upload';
import songContext from "./Context/Songcontext";

import { useState } from 'react';
import SearchPage from './Screens/Search';
import Hometest from './Screens/Test/Hometest';
import Mainhometest from './Screens/Test/Mainhometest';
import SearchTest from './Screens/Test/Searchtest';
import Mymusictest from './Screens/Test/Mymusictest';
import Uploadtest from './Screens/Test/Uploadtest';
function App() {

  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);



  return (
    <div className="App w-screen h-screen">
<BrowserRouter >

{cookie.token ? (
  <songContext.Provider
                        value={{
                            currentSong,
                            setCurrentSong,
                            soundPlayed,
                            setSoundPlayed,
                            isPaused,
                            setIsPaused,
                        }} >
<Routes>

<Route path='' element={<Hometest />} />
<Route path='/search' element={<SearchPage />} />

<Route path='/upload' element={<Upload />} />

<Route path='/hometest' element={<Mainhometest />} />
<Route path='/Searchtest' element={<SearchTest />} />
<Route path='/mymusictest' element={<Mymusictest />} />
<Route path='/uploadtest' element={<Uploadtest />} />

<Route path="*" element={<Navigate to="/" />} />
</Routes>
</songContext.Provider>
):(
<Routes>


<Route path='' element={<Hometest />} />
<Route path="*" element={<Navigate to="/" />} />
<Route path='/login' element={<Login />} />
<Route path='/Signup' element={<Signup />} />
</Routes>


)}

</BrowserRouter>
    </div>
  );
}

export default App;
