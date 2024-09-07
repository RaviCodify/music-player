import React from 'react'
import DisplaySong from './DisplaySong'
import pausePlay from "../assets/images/pause.jpg"

function Home({musicState}) {
  return (
    <div
      className="main-container container d-flex flex-column align-items-center my-3"
    >
      <div className="music-box d-flex justify-content-center w-50">
        <img className='img-fluid' src={pausePlay} alt="pause" />
      </div>

    <div className="music-body w-100">
      <div className="songs-info d-flex justify-content-center"></div>
      <div className="timer">
      <div className="audio-time d-flex justify-content-between">
        <div className="current-time">00:00</div>
        <div className="audio-duration">00:00</div>
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{height: "5px"}}
      >
        <div className="progress-bar"  ></div>
      </div>
      </div>
      <div className="buttons d-flex justify-content-center align-items-center my-2">
      <button className="prev btn btn-dark text-light" style={{borderRadius: "50%"}}>
      <i className="fa-solid fa-backward-step"></i>
      </button>
      <button className="play btn btn-dark fs-4 text-light px-3 py-2 mx-2" style={{borderRadius: "50%"}}>
      <i className="fa-solid fa-play"></i>
      </button>
      <button className="next btn btn-dark text-light" style={{borderRadius: "50%"}}>
      <i className="fa-solid fa-forward-step"></i>
      </button>
    </div>
    </div>
    <DisplaySong musicState={musicState}/>      
  </div>
  )
}

export default Home