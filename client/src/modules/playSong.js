const play = document.querySelector(".play");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress");
const box = document.querySelector(".music-box");
const songsInfo = document.querySelector(".songs-info");
const audioTime = document.querySelector(".current-time");

import { musicState } from "../../../script.js";
import {
  updateAudioTime,
  updateProgressBar,
  highlightCurrentSong,
} from "./other.js";

export function playSong(index = null) {
  // If an index is passed, set the current song to the specified index
  if (index !== null) {
    musicState.songCount = index;
    musicState.audio.src = `assets/songs/${
      musicState.songs[musicState.songCount].file
    }`;
  }

  if (!musicState.audio) return;
  const isPaused = musicState.audio.paused;
  musicState.audio[isPaused ? "play" : "pause"]();

  musicState.audio.addEventListener("timeupdate", () => {
    const progress =
      (musicState.audio.currentTime / musicState.audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });
  progressContainer.addEventListener("click", updateProgressBar);

  if (audioTime) {
    setInterval(() => {
      updateAudioTime();
    }, 1000);
  }

  box.style.backgroundImage = isPaused
    ? 'url("assets/images/play.gif")'
    : 'url("assets/images/pause.jpg")';
  songsInfo.innerHTML = `Title: ${
    musicState.songs[musicState.songCount].title
  }`;
  play.innerHTML = isPaused
    ? '<i class="fa-solid fa-pause"></i>'
    : '<i class="fa-solid fa-play"></i>';

  highlightCurrentSong();
}
