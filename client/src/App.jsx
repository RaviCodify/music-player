import { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar"

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [musicState, setMusicState] = useState({
    songs: [{title: "Pasoori"},{title: "Left and Right"},{title: "Tum Tak"},],
    songCount: 0,
    audio: null,
  })
  return (
    <>
      <Navbar/>
      <Home musicState={musicState}/>
    </>
  )
}

export default App
