const songName = document.getElementById("song-name");
const song = document.getElementById("audio");
const play = document.getElementById("play");

songName.innerText = "Colors";
let isplaying = false;


function playSong(){
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();

    isplaying = true;
    
}

function pauseSong(){
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    song.pause();
    
    isplaying = false;
}

function playPauseDecider() {
    if(isplaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}

play.addEventListener("click", playPauseDecider);