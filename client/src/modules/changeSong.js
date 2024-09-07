import { musicState } from '../script.js';
import { playSong } from './playSong.js';

export function changeSong(direction) {
    if (!musicState.audio) return;
    musicState.audio.pause();
  
    // Update the song index based on direction (next/prev)
    musicState.songCount += direction;
  
    // Handle wrapping around the playlist
    if (musicState.songCount < 0) {
      musicState.songCount = musicState.songs.length - 1;
    } else if (musicState.songCount >= musicState.songs.length) {
      musicState.songCount = 0;
    }
  
    // Update the audio source based on the current song
    if (musicState.isFromApi) {
      musicState.audio.src = musicState.songs[musicState.songCount].attributes.previews[0].url;
    } else {
      musicState.audio.src = `assets/songs/${musicState.songs[musicState.songCount].file}`;
    }
    playSong(musicState.songCount);
  }
  