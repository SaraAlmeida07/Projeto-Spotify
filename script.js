const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const cover = document.getElementById("cover");
const previous = document.getElementById("previous");
const pass = document.getElementById("pass");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");



const naci = {
  songName: "Naci Otra Vez",
  artist: "J Arias",
  file: "naciOtraVez",
};

const colors = {
  songName: "Colors",
  artist: "Black Pumas",
  file: "colors",
};

const tadow = {
  songName: "Tadow",
  artist: "Massego",
  file: "tadow",
};

let isplaying = false;
let isShuffled = false;
const originalPlaylist = [naci, colors, tadow];
let index = 0;
let sortedPlaylist = [...originalPlaylist];

let repeatOn = false;



function playSong() {
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  song.play();

  isplaying = true;
}

function pauseSong() {
  play.querySelector(".bi").classList.add("bi-play-circle-fill");
  play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
  song.pause();

  isplaying = false;
}

function playPauseDecider() {
  if (isplaying === true) {
    pauseSong();
  } else {
    playSong();
  }
}

function initializeSong() {
  cover.src = `imagens/${sortedPlaylist[index].file}.jpg`;
  song.src = `songs/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
}

function previousSong() {
    if(index === 0) {
        index = sortedPlaylist.length -1;
    }
    else
    index -= 1;
    initializeSong();
    playSong();
}

function nextSong() {
    if(index === sortedPlaylist.length -1) {
        index = 0;
    }
    else
    index += 1;
    initializeSong();
    playSong();
}

function updateProgress() {
  
    const barWidth = (song.currentTime/ song.duration)*100 ;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);
    totalTime.innerText = toTHHMMSS(song.currentTime);
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preshuffleArray) {
  let currentIndex = preshuffleArray.length -1; 

  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random()* (currentIndex +1));
    let aux = preshuffleArray[currentIndex];
    preshuffleArray[currentIndex] = preshuffleArray[randomIndex];
    preshuffleArray[randomIndex] = aux;

    currentIndex-= 1;

  }

}
function shuffleButonClick() {
  if(isShuffled === false) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add("button-active");
  } else {
    isShuffled = false;
    sortedPlaylist = [...originalPlaylist];
    shuffleButton.classList.remove("button-active");
    index = 0;
    initializeSong();
    playSong();

  }

}

function repeatButtonClick(){
  if(repeatOn === false){
    repeatOn = true;
    repeatButton.classList.add("button-active");

  } else {
    repeatOn = false;
    repeatButton.classList.remove("button-active");

  }

}

function nextOrRepeat(){
  if(repeatOn === false) {
    nextSong();
  }
    
  else {
    playSong();
  }
}

function toTHHMMSS(originalNumber){
  let hours = Math.floor(originalNumber/3600);
  let min = Math.floor((originalNumber - hours * 3600) / 60) ;
  let segs = Math.floor(originalNumber - hours * 3600 - min *60);

  return `${hours.toString().padStart(2, "0")}:${min.toString().padStart(2,"0")}:${segs.toString().padStart(2,"0")}`;
}

function updateTotalTime() {

  songTime.innerText = toTHHMMSS(song.duration);
  
}




initializeSong();

play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
pass.addEventListener("click",nextSong);
song.addEventListener("timeupdate", updateProgress);
song.addEventListener("ended", nextOrRepeat);
song.addEventListener("loadedmetadata", updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shuffleButonClick);
repeatButton.addEventListener("click", repeatButtonClick)
