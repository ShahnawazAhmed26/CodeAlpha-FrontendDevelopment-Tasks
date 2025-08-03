//My music player ..:

document.addEventListener("DOMContentLoaded", () => {
  const audioPlayer = document.getElementById("audio-player")
  const albumCover = document.getElementById("album-cover")
  const songTitle = document.getElementById("song-title")
  const songArtist = document.getElementById("song-artist")
  const progressBar = document.getElementById("progress-bar")
  const currentTimeSpan = document.getElementById("current-time")
  const totalDurationSpan = document.getElementById("total-duration")
  const playPauseBtn = document.getElementById("play-pause-btn")
  const playIcon = playPauseBtn.querySelector(".play-icon")
  const pauseIcon = playPauseBtn.querySelector(".pause-icon")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const volumeBar = document.getElementById("volume-bar")
  const muteBtn = document.getElementById("mute-btn")
  const volumeOnIcon = muteBtn.querySelector(".volume-on-icon")
  const volumeOffIcon = muteBtn.querySelector(".volume-off-icon")
  const shuffleBtn = document.getElementById("shuffle-btn")
  const repeatBtn = document.getElementById("repeat-btn")
  const togglePlaylistBtn = document.getElementById("toggle-playlist-btn")
  const playlistContainer = document.getElementById("playlist-container")

  let currentSongIndex = 0
  let isPlaying = false
  let isMuted = false
  let isShuffled = false
  let isRepeating = false
  let originalPlaylistOrder = [] // To store the original order for shuffle

  const playlist = [
    {
      id: 1,
      title: " Echo in the Wind",
      artist: "Aaron Cherof",
      duration: "3:24",
      src: "music1.mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b273bddf8d199ee35a13eddd1432",
    },
    {
      id: 2,
      title: "Summer Nights",
      artist: "Indie Band",
      duration: "4:12",
      src: "/audio/summer-nights.mp3",
      cover: "/placeholder.svg?height=300&width=300",
    }

  ]

  originalPlaylistOrder = [...playlist]

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  function loadSong(index) {
    const song = playlist[index]
    audioPlayer.src = song.src
    albumCover.src = song.cover
    songTitle.textContent = song.title
    songArtist.textContent = song.artist
    audioPlayer.load() // Load the new song
    updatePlaylistHighlight(index)
  }

  function playSong() {
    audioPlayer.play()
    isPlaying = true
    playIcon.classList.add("hidden")
    pauseIcon.classList.remove("hidden")
  }

  function pauseSong() {
    audioPlayer.pause()
    isPlaying = false
    playIcon.classList.remove("hidden")
    pauseIcon.classList.add("hidden")
  }

  function nextSong() {
    if (isShuffled) {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * playlist.length)
      } while (newIndex === currentSongIndex && playlist.length > 1) // Ensure different song if more than one
      currentSongIndex = newIndex
    } else {
      currentSongIndex = (currentSongIndex + 1) % playlist.length
    }
    loadSong(currentSongIndex)
    playSong()
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length
    loadSong(currentSongIndex)
    playSong()
  }

  function updateProgress() {
    const { currentTime, duration } = audioPlayer
    const progressPercent = (currentTime / duration) * 100
    progressBar.value = progressPercent
    currentTimeSpan.textContent = formatTime(currentTime)
  }

  function setProgress() {
    const newTime = (progressBar.value / 100) * audioPlayer.duration
    audioPlayer.currentTime = newTime
  }

  function setVolume() {
    const newVolume = volumeBar.value / 100
    audioPlayer.volume = newVolume
    isMuted = newVolume === 0
    updateMuteButton()
  }

  function toggleMute() {
    isMuted = !isMuted
    audioPlayer.muted = isMuted
    updateMuteButton()
    // If unmuting and volume was 0, set it to a default
    if (!isMuted && audioPlayer.volume === 0) {
      audioPlayer.volume = 0.5
      volumeBar.value = 50
    } else if (isMuted) {
      volumeBar.value = 0
    } else {
      volumeBar.value = audioPlayer.volume * 100
    }
  }

  function updateMuteButton() {
    if (isMuted) {
      volumeOnIcon.classList.add("hidden")
      volumeOffIcon.classList.remove("hidden")
    } else {
      volumeOnIcon.classList.remove("hidden")
      volumeOffIcon.classList.add("hidden")
    }
  }

  function toggleShuffle() {
    isShuffled = !isShuffled
    shuffleBtn.classList.toggle("active-control", isShuffled)
    if (isShuffled) {
      // Shuffle the playlist (Fisher-Yates algorithm)
      for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[playlist[i], playlist[j]] = [playlist[j], playlist[i]]
      }
    } else {
      // Restore original order
      playlist.splice(0, playlist.length, ...originalPlaylistOrder)
    }
    // Reload current song to ensure it's still in the correct position if shuffled
    // Or just update the playlist display
    displayPlaylist()
    updatePlaylistHighlight(playlist.findIndex((song) => song.id === originalPlaylistOrder[currentSongIndex].id))
  }

  function toggleRepeat() {
    isRepeating = !isRepeating
    repeatBtn.classList.toggle("active-control", isRepeating)
  }

  function displayPlaylist() {
    playlistContainer.innerHTML = "" // Clear existing list
    playlist.forEach((song, index) => {
      const playlistItem = document.createElement("div")
      playlistItem.classList.add("playlist-item")
      playlistItem.dataset.index = index // Store original index for selection

      playlistItem.innerHTML = `
                <div class="playlist-item-info">
                    <p class="playlist-item-title">${song.title}</p>
                    <p class="playlist-item-artist">${song.artist}</p>
                </div>
                <span class="playlist-item-duration">${song.duration}</span>
            `

      playlistItem.addEventListener("click", () => {
        currentSongIndex = index
        loadSong(currentSongIndex)
        playSong()
        togglePlaylist() // Hide playlist after selection
      })
      playlistContainer.appendChild(playlistItem)
    })
    updatePlaylistHighlight(currentSongIndex)
  }

  function updatePlaylistHighlight(activeIndex) {
    document.querySelectorAll(".playlist-item").forEach((item, index) => {
      if (Number.parseInt(item.dataset.index) === activeIndex) {
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    })
  }

  function togglePlaylist() {
    playlistContainer.classList.toggle("hidden")
    if (playlistContainer.classList.contains("hidden")) {
      togglePlaylistBtn.textContent = "Show Playlist"
    } else {
      togglePlaylistBtn.textContent = "Hide Playlist"
    }
  }

  // Event Listeners
  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      pauseSong()
    } else {
      playSong()
    }
  })

  nextBtn.addEventListener("click", nextSong)
  prevBtn.addEventListener("click", prevSong)

  progressBar.addEventListener("input", setProgress)

  audioPlayer.addEventListener("timeupdate", updateProgress)
  audioPlayer.addEventListener("loadedmetadata", () => {
    totalDurationSpan.textContent = formatTime(audioPlayer.duration)
    progressBar.value = 0 // Reset progress bar on new song load
    currentTimeSpan.textContent = "0:00"
  })
  audioPlayer.addEventListener("ended", () => {
    if (isRepeating) {
      audioPlayer.currentTime = 0
      playSong()
    } else {
      nextSong() // Autoplay next song
    }
  })

  volumeBar.addEventListener("input", setVolume)
  muteBtn.addEventListener("click", toggleMute)

  shuffleBtn.addEventListener("click", toggleShuffle)
  repeatBtn.addEventListener("click", toggleRepeat)
  togglePlaylistBtn.addEventListener("click", togglePlaylist)

  // Initial load
  loadSong(currentSongIndex)
  displayPlaylist()
  updateMuteButton() // Set initial mute button state
})
