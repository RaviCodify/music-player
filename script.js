// const musicBody = document.querySelector(".music-body");
const play = document.querySelector(".play");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

import { changeSong } from "./modules/changeSong.js";
import { displaySongList } from "./modules/displaySongList.js";
// import { reset } from "./modules/other.js";
import { playSong } from "./modules/playSong.js";


export const musicState = {
  songs: [],
  songCount: 0,
  audio: null,
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
  [play, () => playSong()],
  [next, () => changeSong(1)],
  [prev, () => changeSong(-1)]
].forEach(([element, callback]) => element.addEventListener("click", callback));


