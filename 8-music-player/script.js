const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const audio = document.querySelector("audio");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// music
const music = [
  {
    fileName: "music-1",
    titleName: "Electric Chill Machine",
    artistName: "Machine Electric",
  },
  {
    fileName: "music-2",
    titleName: "Another great song",
    artistName: "Anther great artist",
  },
  {
    fileName: "music-3",
    titleName: "Sunday WoW!",
    artistName: "Artist Awesome",
  },
  {
    fileName: "music-4",
    titleName: "Untitled",
    artistName: "Unknown",
  },
];

// Check if Playing
let isPlaying = false;

// play
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

// Play or pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update the DOM
function loadSong(music) {
  title.textContent = music.titleName;
  artist.textContent = music.artistName;
  image.src = `./img/${music.fileName}.jpg`;
  audio.src = `./music/${music.fileName}.mp3`;
}

// Current Music
let musicIndex = 0;

// Change song
function changeSong(direction) {
  direction === "prev" ? musicIndex-- : musicIndex++;
  if (musicIndex > music.length - 1) musicIndex = 0;
  if (musicIndex < 0) musicIndex = music.length - 1;
  loadSong(music[musicIndex]);
  if (isPlaying) playSong();
}

// On load - select first song
loadSong(music[musicIndex]);

// Upgrade Progress Bar and Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switch duration Element to avoid NAN
    if (durationSeconds)
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

    // Calculate display for Current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    // Delay switch current Element to avoid NAN
    currentEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  audio.currentTime = (clickX / width) * duration;
}

// Change song on click
prevBtn.addEventListener("click", () => changeSong("prev"));
nextBtn.addEventListener("click", () => changeSong("next"));
audio.addEventListener("timeupdate", updateProgressBar);
audio.addEventListener("ended", changeSong("next"));
progressContainer.addEventListener("click", setProgressBar);
