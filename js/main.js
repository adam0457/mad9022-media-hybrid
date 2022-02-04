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

  },
  
  setSelectedTrack: (ev) => {},
  playPauseTrack: (ev) => {
    // if (!APP.audio.paused) return; //already playing
    // APP.audio.src = SONGS[APP.currentTrack].src;
    // APP.audio.play();
    // APP.startAnimations();

    
  },
  stopTrack: (ev) => {
    APP.audio.pause();
    APP.audio.currentTime = 0;
    APP.stopAnimations();
  },
  updateCurrentTime:(ev)=>{},
  updateTotalTime:(ev)=>{}
};

document.addEventListener('DOMContentLoaded', APP.init);