'use strict';

import { SONGS } from "./songs.js";

const APP = {
  list: null,
  audio: null,
  btnPlayPause: null,

  timeUpdate:null,
  totalTime:null,
  playPauseIcon:null,
  btnStop:null,

  songPlaying:true,

  currentTrack: 0,
  init: () => {

    APP.list = document.querySelector('ul');
    // console.log(SONGS);
      APP.audio = document.getElementById('audio');
      APP.btnPlayPause = document.getElementById('btn-play-pause');
      APP.timeUpdate =  document.getElementById('time-update');
      APP.totalTime =  document.getElementById('total-time');
      APP.playPauseIcon =  document.getElementById('play-pause-icon');
      APP.btnStop =  document.getElementById('btn-stop');

      
      APP.audio.src = SONGS[APP.currentTrack].src;
      APP.addListeners();
      APP.buildPlayList();
      
  },

  addListeners: () => {
    APP.btnPlayPause.addEventListener('click', APP.playPauseTrack);
    APP.btnStop.addEventListener('click', APP.stopTrack);
    APP.audio.addEventListener('timeupdate', APP.updateCurrentTime);
    APP.audio.addEventListener('durationchange', APP.updateTotalTime);
    APP.btnStop.addEventListener('click', APP.stopTrack);
  },

  buildPlayList: () => { 
    SONGS.forEach((song,index) => {

      let li = document.createElement('li');
      li.setAttribute('data-index', index)
      li.addEventListener('click', APP.setSelectedTrack);
      let thumbnail = document.createElement('img');
      thumbnail.setAttribute('src',song.img);
      thumbnail.setAttribute('alt',song.title);
      thumbnail.classList.add('thumbnail');      
    
      let p = document.createElement('p');
      p.innerHTML = `<span class = "artist"> ${song.artist}</span> -- <span class = "title"> ${song.title}</span>`;
    
      li.appendChild(thumbnail);
      li.appendChild(p);
      APP.list.append(li);
    
    });
  },

  setSelectedTrack: (ev) => {},
  playPauseTrack: (ev) => {
    // if (!APP.audio.paused) return; //already playing
    // APP.audio.src = SONGS[APP.currentTrack].src;
    // APP.audio.play();
    // APP.startAnimations();
    if(APP.songPlaying){
      APP.audio.play();
      APP.playPauseIcon.textContent = 'pause';
      APP.songPlaying = !APP.songPlaying;
      return;
    }
    APP.audio.pause();
    APP.playPauseIcon.textContent = 'play_arrow';
    APP.songPlaying = !APP.songPlaying;
    return;  
    
  },

  stopTrack: (ev) => {
    APP.audio.pause();
    APP.audio.currentTime = 0;
    APP.playPauseIcon.textContent = 'play_arrow';
    APP.songPlaying = true;
    // APP.stopAnimations();
  },
  updateCurrentTime:(ev)=>{APP.timeUpdate.textContent = Math.floor(APP.audio.currentTime);},
  updateTotalTime:(ev)=>{APP.totalTime.textContent = Math.floor(APP.audio.duration);}
};

document.addEventListener('DOMContentLoaded', APP.init);