// --- 1. PLAYLIST DATA (Edit tracks easily here) ---
const playlist = [
  {
    title: "Lofi Chill Beat",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    title: "Night Sky Ambience",
    src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=cozy-lounge-10904.mp3"
  },
  {
    title: "Cozy Coding Rain",
    src: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_845dbf6ae9.mp3?filename=lofi-rain-ambient-11599.mp3"
  }
];

// --- 2. STATE & DOM ELEMENTS ---
let currentTrackIndex = 0;
let isPlaying = false;

const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const trackTitle = document.getElementById("track-title");
const colorPicker = document.getElementById("color-picker");
const swatches = document.querySelectorAll(".swatch");

// --- 3. AUDIO PLAYER LOGIC ---
function loadTrack(index) {
  const track = playlist[index];
  audioPlayer.src = track.src;
  trackTitle.textContent = track.title;
}

function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
  } else {
    audioPlayer.pause();
    playBtn.textContent = "▶";
    isPlaying = false;
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) audioPlayer.play();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) audioPlayer.play();
}

// Event Listeners for Audio
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Automatically advance to the next track when current one ends
audioPlayer.addEventListener("ended", nextTrack);

// --- 4. THEME & COLOR PICKER LOGIC ---
function updateAccentColor(color) {
  document.documentElement.style.setProperty("--accent-color", color);
}

colorPicker.addEventListener("input", (e) => {
  updateAccentColor(e.target.value);
});

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    const selectedColor = swatch.getAttribute("data-color");
    updateAccentColor(selectedColor);
    colorPicker.value = selectedColor;
  });
});

// Initialize first track on page load
loadTrack(currentTrackIndex);