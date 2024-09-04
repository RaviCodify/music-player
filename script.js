const musicBody = document.querySelector(".music-body");
const play = document.querySelector(".play");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

import { changeSong } from "./modules/changeSong.js";
import { displaySongList } from "./modules/displaySongList.js";
import { reset } from "./modules/other.js";
import { playSong } from "./modules/playSong.js";


export const musicState = {
  songs: [],
  songCount: 0,
  audio: null,
};

// Fetch song list from server
const fetchLocalSong = () => {
  reset();
  musicBody.classList.remove("d-none");
  fetch("/songs")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      musicState.songs = data;
      musicState.audio = new Audio(`assets/songs/${musicState.songs[musicState.songCount].file}`);
      musicState.isFromApi = false; // mark as local songs
      displaySongList();
    })
    .catch((error) => {
      console.error("Error fetching songs:", error);
    });
};
fetchLocalSong()

document.body.onkeyup = function (e) {
  if (e.key === " " || e.code === "Space") {
    playSong(musicState.songCount);
  } else if (e.key === "ArrowLeft") {
    changeSong(-1);
  }
};

document.body.onkeydown = function (e) {
  if (e.key === "ArrowRight") {
    changeSong(1);
  }
};

// Click Event listeners
[
  // [document.querySelector(".fetch-local"), fetchLocalSong],
  [play, () => playSong()],
  [next, () => changeSong(1)],
  [prev, () => changeSong(-1)],
].forEach(([element, callback]) => element.addEventListener("click", callback));


