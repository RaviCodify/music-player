const songListContainer = document.querySelector(".song-list");

import { musicState } from '../script.js';
import { playSong } from './playSong.js';

export function displaySongList() {
    songListContainer.innerHTML = "";
  
    musicState.songs.forEach((song, index) => {
      const songElement = document.createElement("div");
      songElement.classList.add("song", "list-group-item");
      songElement.id = index;
      songElement.innerHTML = `
        <span>${index + 1}. </span>
        <span>${musicState.isFromApi ? song.attributes.name : song.title}</span>  
      `;
  
      songListContainer.appendChild(songElement);
      songElement.addEventListener("click", () => playSong(index));
      songElement.style.cursor = "pointer";
    });
  }
  
  