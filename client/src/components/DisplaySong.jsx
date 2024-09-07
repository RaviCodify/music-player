import React from 'react'

function DisplaySong({musicState}) {
    
  return (
    <div className="list-group container mb-3">
      {
    musicState.songs.map((song,index)=>(
      <div key={index} className="song list-group-item" id={index} 
      // onClick={() => playSong(index)} 
      style={{cursor:"pointer"}}>
          <span>{index + 1}. </span>
          <span>{song.title}</span>
          </div>
    ))
    }
    </div>
  )
}

export default DisplaySong