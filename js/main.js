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

  songPlaying:true,

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
    if(ev.target.closest('li').classList.contains('active')){return;} /** this is to ignore the click when the user cliks on a song that is already selected */
    APP.currentTrack = ev.currentTarget.getAttribute('data-index');    
    document.querySelector('li.active').classList.remove('active');     
    ev.currentTarget.classList.add('active');
    // console.log(APP.currentTrack);
    APP.audio.src = SONGS[APP.currentTrack].src;
    APP.setActiveTrack(APP.currentTrack);
    // console.log(APP.audio.src);
    APP.playPauseIcon.textContent = 'play_arrow';
    APP.songPlaying = true;
  },

  playPauseTrack: (ev) => {
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