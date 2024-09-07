const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress");
const box = document.querySelector(".music-box");
const play = document.querySelector(".play");
const songListContainer = document.querySelector(".song-list");
const songsInfo = document.querySelector(".songs-info");
const audioTime = document.querySelector(".current-time");
const audioDuration = document.querySelector(".audio-duration");

import { musicState } from "../../../script.js";

export function updateProgressBar(event) {
  const rect = progressContainer.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const widthPercentage = (offsetX / rect.width) * 100;

  progressBar.style.width = `${widthPercentage}%`;
  musicState.audio.currentTime =
    (widthPercentage * musicState.audio.duration) / 100;
}

export function reset() {
  if (musicState.audio) {
    musicState.audio.pause();
    musicState.audio.src = "";
  }
  audioTime.textContent = "00:00";
  progressBar.style.width = 0;
  musicState.songs = [];
  musicState.songCount = 0;
  musicState.audio = null;
  songListContainer.innerHTML = "";
  box.style.backgroundImage = 'url("assets/images/pause.jpg")';
  songsInfo.innerHTML = "";
  play.innerHTML = '<i class="fa-solid fa-play"></i>';
}

export function highlightCurrentSong() {
  document.querySelectorAll(".song").forEach((element, index) => {
    element.style.fontWeight =
      index === musicState.songCount ? "bold" : "normal";
  });
}

export function updateAudioTime() {
  if (!audioTime) return;
  if (!musicState.audio.currentTime) return;
  const duration = isNaN(musicState.audio.duration)
    ? "00:00"
    : formatTime(musicState.audio.duration);
  audioTime.textContent = formatTime(musicState.audio.currentTime);
  audioDuration.textContent = duration;
}

function formatTime(seconds) {
  const min = addZero(Math.floor(seconds / 60));
  const sec = addZero(Math.floor(seconds % 60));
  return `${min}:${sec}`;
}

function addZero(time) {
  return `${time < 10 ? "0" : ""}${time}`;
}
