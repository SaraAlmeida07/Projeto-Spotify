const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const cover = document.getElementById("cover");
const previous = document.getElementById("previous");
const pass = document.getElementById("pass");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");


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

let isplayingp = false;
const playlist = [naci, colors, tadow];
let index = 0;

songName.innerText = "Colors";
let isplaying = false;

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
  cover.src = `imagens/${playlist[index].file}.jpg`;
  song.src = `songs/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
}

function previousSong() {
    if(index === 0) {
        index = playlist.length -1;
    }
    else
    index -= 1;
    initializeSong();
    playSong();
}

function nextSong() {
    if(index === playlist.length -1) {
        index = 0;
    }
    else
    index += 1;
    initializeSong();
    playSong();
}

function updateProgressBar() {
  
    const barWidth = (song.currentTime/ song.duration)*100 ;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}
initializeSong();

play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
pass.addEventListener("click",nextSong);
song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);
