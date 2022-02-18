'use strict';

import { SONGS } from "./songs.js";

const APP = {
  list: null,
  audio: null,
  btnPlayPause: null,
  trackActive:null,
  timeUpdate:null,
  totalTime:null,
  playPauseIcon:null,
  btnStop:null,
  audioAnimation:null,
  btnNext: null,
  btnPrevious: null,
  btnForwardTen: null,
  btnReplayTen: null,

  songPlaying: false,

  currentTrack: 0,
  init: () => {

      APP.list = document.querySelector('ul');   
      APP.audio = document.getElementById('audio');
      APP.btnPlayPause = document.getElementById('btn-play-pause');
      APP.timeUpdate =  document.getElementById('time-update');
      APP.totalTime =  document.getElementById('total-time');
      APP.playPauseIcon =  document.getElementById('play-pause-icon');
      APP.btnStop =  document.getElementById('btn-stop');
      APP.trackActive = document.querySelector('.track-active');
      APP.audioAnimation = document.getElementById('audio-animation');
      APP.btnNext = document.getElementById('btn-skip-next');
      APP.btnPrevious = document.getElementById('btn-skip-previous');
      APP.btnForwardTen = document.getElementById('btn-forward-ten');
      APP.btnReplayTen = document.getElementById('btn-replay-ten');

      
      APP.audio.src = SONGS[APP.currentTrack].src;
      APP.addListeners();
      APP.buildPlayList();
      
  },

  addListeners: () => {
      APP.btnPlayPause.addEventListener('click', APP.handlePlayPause);
      APP.btnStop.addEventListener('click', APP.handleStopBtn);
      APP.audio.addEventListener('timeupdate', APP.updateCurrentTime);
      APP.audio.addEventListener('ended', APP.handleEndedSong);
      APP.audio.addEventListener('durationchange', APP.updateTotalTime);
      APP.btnStop.addEventListener('click', APP.stopTrack);
      APP.list.addEventListener('click', APP.setSelectedTrack);
      APP.btnNext.addEventListener('click', APP.handleBtnNext);
      APP.btnPrevious.addEventListener('click', APP.handleBtnPrevious);
      APP.btnForwardTen.addEventListener('click', APP.handleBtnForwardTen);
      APP.btnReplayTen.addEventListener('click', APP.handleBtnReplayTen);
  },

  buildPlayList: () => { 
    let df = document.createDocumentFragment();
    SONGS.forEach((song,index) => {

      let li = document.createElement('li');
      li.setAttribute('data-index', index)
      let thumbnail = document.createElement('img');
      thumbnail.setAttribute('src',song.img);
      thumbnail.setAttribute('alt',song.title);
      thumbnail.classList.add('thumbnail');      
    
      let p = document.createElement('p');
      p.innerHTML = `<span class = "artist"> ${song.artist}</span> -- <span class = "title"> ${song.title}</span>`;
    
      li.appendChild(thumbnail);
      li.appendChild(p);
      df.appendChild(li);
      // APP.list.append(li);
    
    });
    APP.list.append(df);
    /** Adding the active css class to the first song in the playList */   
    APP.initFirstSong();
    APP.setActiveTrack(0);  /** Set the thumbnail at the top of the player and in the animation area */
    
  },
  initFirstSong:()=>{
    let firstSong = APP.list.querySelector('li');
    firstSong.classList.add('active');
  },
  setActiveTrack:(track)=>{
    /** Putting the thumbnail, the artist and the title of the current track at the top of the player */
    let imgFirstSong = document.createElement('img');
    imgFirstSong.setAttribute('src', SONGS[track].img);
    imgFirstSong.setAttribute('alt', SONGS[track].title);
    imgFirstSong.classList.add('thumbnail');
    let artistAndTitle = document.createElement('p');
    artistAndTitle.innerHTML =  `<span class = "artist"> ${SONGS[track].artist}</span> -- <span class = "title"> ${SONGS[track].title}</span>`;
    APP.trackActive.textContent = "";
    APP.trackActive.appendChild(imgFirstSong);
    APP.trackActive.appendChild(artistAndTitle);

    /** Putting the thumbnail in the audio-animation area */
    let visualTrack = document.createElement('img');
    visualTrack.setAttribute('src', SONGS[track].img);
    visualTrack.setAttribute('alt', SONGS[track].title);
    visualTrack.classList.add('visual');
    APP.audioAnimation.textContent = "";
    APP.audioAnimation.append(visualTrack);
  },

  setSelectedTrack: (ev) => {
  
    let selectedLi = ev.target.closest('li');
    if(selectedLi.classList.contains('active')){return;} /** this is to ignore the click when the user cliks on a song that is already selected */
    APP.currentTrack = selectedLi.getAttribute('data-index');
    selectedLi.classList.add('active');

    APP.playSelectedTrack();

  },

  playSelectedTrack: () => {

    document.querySelector('li.active').classList.remove('active'); 
    APP.audio.src = SONGS[APP.currentTrack].src;
    APP.setActiveTrack(APP.currentTrack);
    APP.songPlaying = false;
    APP.playPauseTrack();

  },

  handlePlayPause: (ev) => {

    APP.playPauseTrack();
    
  },

  playPauseTrack: () => {
    if(APP.songPlaying === false){
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

  handleStopBtn: (ev) => {
    APP.stopTrack();
  },

  stopTrack: () => {
    APP.audio.pause();
    APP.audio.currentTime = 0;
    APP.playPauseIcon.textContent = 'play_arrow';
    APP.songPlaying = false;
    // APP.stopAnimations();
  },

  handleBtnNext: (ev) => {
    APP.stopTrack();
    APP.playNextTrack();
  },

  handleBtnPrevious: (ev) => {
    APP.stopTrack();
    APP.previousTrack();

    let previousTrack = document.querySelector(`li[data-index = "${APP.currentTrack}"  ]`);
    
    APP.playSelectedTrack();
    
    previousTrack.classList.add('active');

  },

  nextTrack: () => {
    let len = SONGS.length; //get length of array
    
    APP.currentTrack++; //increment the currentTrack number

    if (APP.currentTrack >= len) {
      //if the current track number is greater than or equal to the length
      APP.currentTrack = 0;
    }
    
  }, 

  previousTrack: () => {
    let len = SONGS.length; 
    APP.currentTrack--; 
    if (APP.currentTrack < 0) {
      
      APP.currentTrack = len - 1;
    }
  },

  handleBtnForwardTen: (ev) => {

    if(APP.songPlaying){
      
      APP.forwardTen();
      
    }else {
        APP.audio.currentTime = 0;
    }
    
  },
  
  forwardTen: () => {
    let duration = APP.audio.duration;
    APP.audio.currentTime = APP.audio.currentTime + 10;
    
    if (APP.audio.currentTime >= duration) {
      APP.audio.currentTime = duration;
      // The ended event will be triggered and the player will start the next song automatically    
    }
  },

  playNextTrack: () => {
    APP.nextTrack();    
    
    let nextTrack = document.querySelector(`li[data-index = "${APP.currentTrack}"  ]`);
    
    APP.playSelectedTrack();   
    
    nextTrack.classList.add('active');
  },

  handleEndedSong: (ev) => {
    APP.playNextTrack();
  },

  handleBtnReplayTen: (ev) => {
    if(APP.songPlaying){
      
      APP.replayTen();
    }
  },

  replayTen: () => {
    APP.audio.currentTime = APP.audio.currentTime - 10;
    
    if (APP.audio.currentTime <= 0) {
      APP.audio.currentTime = 0;
      APP.playPauseIcon.textContent = 'pause';
    }
  },

  updateCurrentTime:(ev)=>{APP.timeUpdate.textContent = Math.floor(APP.audio.currentTime);},
  updateTotalTime:(ev)=>{APP.totalTime.textContent = Math.floor(APP.audio.duration);}
};

document.addEventListener('DOMContentLoaded', APP.init);