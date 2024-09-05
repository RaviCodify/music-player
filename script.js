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
  isFromApi: false,
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

const fetchApiSong = async () => {
  reset();
  musicBody.classList.remove("d-none");
  const url =
    "https://shazam.p.rapidapi.com/artists/get-top-songs?id=567072&l=en-US";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "aa079716e7msheee35d0274017efp1b3bcejsn3e6ac7aefa48",
      "x-rapidapi-host": "shazam.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result && result.data) {
      musicState.songs = result.data;

      if (musicState.songs.length > 0) {
        musicState.audio = new Audio(musicState.songs[musicState.songCount].attributes.previews[0].url);
        musicState.isFromApi = true; // mark as API songs

        displaySongList();
        musicState.audio.addEventListener("loadedmetadata", () => {
          if (musicState.audio.currentTime === musicState.audio.duration) {
            changeSong(1);
          }
        });
      }
    } else {
      console.error("No songs found in the response.");
    }
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
};



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
  [document.querySelector(".fetch-local"), fetchLocalSong],
  [document.querySelector(".fetch-api"), fetchApiSong],
  [play, () => playSong()],
  [next, () => changeSong(1)],
  [prev, () => changeSong(-1)],
].forEach(([element, callback]) => element.addEventListener("click", callback));


