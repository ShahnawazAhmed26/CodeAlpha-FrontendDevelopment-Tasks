// Typing Animation
const typingText = document.querySelector(".typing-text")
const phrases = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Creative Thinker"]

let phraseIndex = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {
  const currentPhrase = phrases[phraseIndex]

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    typeSpeed = 500
  }

  setTimeout(typeEffect, typeSpeed)
}

// Start typing animation
typeEffect()

// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Skill bars animation
const skillBars = document.querySelectorAll(".skill-progress")
const skillsSection = document.querySelector("#skills")

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = width
  })
}

// Intersection Observer for skill bars
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars()
      }
    })
  },
  { threshold: 0.5 },
)

if (skillsSection) {
  skillObserver.observe(skillsSection)
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".project-card, .skill-category, .stat").forEach((el) => {
  observer.observe(el)
})

// Contact form handling
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 23, 42, 0.98)"
  } else {
    navbar.style.background = "rgba(15, 23, 42, 0.95)"
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Cursor trail effect (optional enhancement)
document.addEventListener("mousemove", (e) => {
  const cursor = document.createElement("div")
  cursor.className = "cursor-trail"
  cursor.style.left = e.clientX + "px"
  cursor.style.top = e.clientY + "px"

  document.body.appendChild(cursor)

  setTimeout(() => {
    cursor.remove()
  }, 1000)
})

// Add cursor trail styles
const style = document.createElement("style")
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorTrail 1s ease-out forwards;
    }
    
    @keyframes cursorTrail {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    .loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .btn-click {
        transform: scale(0.95);
        transition: transform 0.15s ease;
    }
`
document.head.appendChild(style)

// Music Player Class
class MusicPlayer {
  constructor() {
    this.audio = document.getElementById("audio-player")
    this.playPauseBtn = document.getElementById("play-pause-btn")
    this.prevBtn = document.getElementById("prev-btn")
    this.nextBtn = document.getElementById("next-btn")
    this.progressBar = document.getElementById("progress")
    this.currentTimeEl = document.getElementById("current-time")
    this.totalTimeEl = document.getElementById("total-time")
    this.volumeSlider = document.getElementById("volume-slider")
    this.songTitle = document.getElementById("song-title")
    this.artistName = document.getElementById("artist-name")
    this.albumImage = document.getElementById("album-image")
    this.playlist = document.getElementById("playlist")
    this.shuffleBtn = document.getElementById("shuffle-btn")
    this.repeatBtn = document.getElementById("repeat-btn")
    this.autoplayBtn = document.getElementById("autoplay-btn")
    this.statusText = document.getElementById("status-text")

    this.currentSongIndex = 0
    this.isPlaying = false
    this.isShuffled = false
    this.isRepeating = false
    this.isAutoplay = true
    this.currentTime = 0
    this.progressInterval = null

    // Sample playlist with different genres
    this.songs = [
      {
        title: "Summer Vibes",
        artist: "Chill Beats",
        src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        image: "/placeholder.svg?height=250&width=250&text=Summer+Vibes",
        duration: 180,
      },
      {
        title: "Night Drive",
        artist: "Electronic Dreams",
        src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        image: "/placeholder.svg?height=250&width=250&text=Night+Drive",
        duration: 210,
      },
      {
        title: "Acoustic Dreams",
        artist: "Folk Singer",
        src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        image: "/placeholder.svg?height=250&width=250&text=Acoustic+Dreams",
        duration: 195,
      },
      {
        title: "Urban Beat",
        artist: "Hip Hop Collective",
        src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        image: "/placeholder.svg?height=250&width=250&text=Urban+Beat",
        duration: 165,
      },
      {
        title: "Jazz Cafe",
        artist: "Smooth Jazz Trio",
        src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        image: "/placeholder.svg?height=250&width=250&text=Jazz+Cafe",
        duration: 240,
      },
      {
        title: "Rock Anthem",
        artist: "Thunder Band",
        src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        image: "/placeholder.svg?height=250&width=250&text=Rock+Anthem",
        duration: 220,
      },
      {
        title: "Classical Morning",
        artist: "Orchestra Symphony",
        src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        image: "/placeholder.svg?height=250&width=250&text=Classical+Morning",
        duration: 300,
      },
      {
        title: "Pop Sensation",
        artist: "Chart Toppers",
        src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        image: "/placeholder.svg?height=250&width=250&text=Pop+Sensation",
        duration: 185,
      },
    ]

    this.init()
  }

  init() {
    this.loadSong(this.currentSongIndex)
    this.createPlaylist()
    this.bindEvents()
    this.setVolume(50)
    this.updateStatus("Ready to play music")
  }

  bindEvents() {
    // Play/Pause button
    this.playPauseBtn.addEventListener("click", () => this.togglePlayPause())

    // Previous/Next buttons
    this.prevBtn.addEventListener("click", () => this.previousSong())
    this.nextBtn.addEventListener("click", () => this.nextSong())

    // Progress bar click
    document.querySelector(".progress-bar").addEventListener("click", (e) => this.setProgress(e))

    // Volume control
    this.volumeSlider.addEventListener("input", (e) => this.setVolume(e.target.value))

    // Audio events (simulated since we're using placeholder audio)
    this.audio.addEventListener("timeupdate", () => this.updateProgress())
    this.audio.addEventListener("loadedmetadata", () => this.updateDuration())
    this.audio.addEventListener("ended", () => this.handleSongEnd())

    // Additional controls
    this.shuffleBtn.addEventListener("click", () => this.toggleShuffle())
    this.repeatBtn.addEventListener("click", () => this.toggleRepeat())
    this.autoplayBtn.addEventListener("click", () => this.toggleAutoplay())

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => this.handleKeyboard(e))
  }

  loadSong(index) {
    const song = this.songs[index]
    this.songTitle.textContent = song.title
    this.artistName.textContent = song.artist
    this.albumImage.src = song.image

    // Reset progress
    this.currentTime = 0
    this.updateProgressBar()

    // Update duration display
    this.totalTimeEl.textContent = this.formatTime(song.duration)

    // Update active playlist item
    this.updatePlaylistActive(index)

    // Update status
    this.updateStatus(`Loaded: ${song.title} by ${song.artist}`)
  }

  createPlaylist() {
    this.playlist.innerHTML = ""
    this.songs.forEach((song, index) => {
      const playlistItem = document.createElement("div")
      playlistItem.className = "playlist-item"
      playlistItem.innerHTML = `
                <div class="song-number">${index + 1}</div>
                <div class="song-details">
                    <div class="song-title">${song.title}</div>
                    <div class="artist">${song.artist}</div>
                </div>
                <div class="duration">${this.formatTime(song.duration)}</div>
            `
      playlistItem.addEventListener("click", () => this.playSong(index))
      this.playlist.appendChild(playlistItem)
    })
  }

  updatePlaylistActive(index) {
    document.querySelectorAll(".playlist-item").forEach((item, i) => {
      item.classList.toggle("active", i === index)
    })
  }

  playSong(index) {
    this.currentSongIndex = index
    this.loadSong(index)
    this.play()
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  play() {
    this.isPlaying = true
    this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
    document.querySelector(".album-art").classList.add("playing")

    // Start progress simulation
    this.startProgressSimulation()

    // Update status
    const song = this.songs[this.currentSongIndex]
    this.updateStatus(`Now playing: ${song.title}`)
  }

  pause() {
    this.isPlaying = false
    this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
    document.querySelector(".album-art").classList.remove("playing")

    // Stop progress simulation
    if (this.progressInterval) {
      clearInterval(this.progressInterval)
    }

    // Update status
    this.updateStatus("Paused")
  }

  previousSong() {
    if (this.isShuffled) {
      this.currentSongIndex = Math.floor(Math.random() * this.songs.length)
    } else {
      this.currentSongIndex = this.currentSongIndex > 0 ? this.currentSongIndex - 1 : this.songs.length - 1
    }
    this.loadSong(this.currentSongIndex)
    if (this.isPlaying) {
      this.play()
    }
  }

  nextSong() {
    if (this.isShuffled) {
      this.currentSongIndex = Math.floor(Math.random() * this.songs.length)
    } else {
      this.currentSongIndex = this.currentSongIndex < this.songs.length - 1 ? this.currentSongIndex + 1 : 0
    }
    this.loadSong(this.currentSongIndex)
    if (this.isPlaying) {
      this.play()
    }
  }

  setProgress(e) {
    const progressBar = e.currentTarget
    const clickX = e.offsetX
    const width = progressBar.offsetWidth
    const duration = this.songs[this.currentSongIndex].duration

    this.currentTime = (clickX / width) * duration
    this.updateProgressBar()
    this.updateStatus(`Seeked to ${this.formatTime(this.currentTime)}`)
  }

  setVolume(volume) {
    this.audio.volume = volume / 100

    // Update volume icon
    const volumeIcons = document.querySelectorAll(".volume-section i")
    if (volume == 0) {
      volumeIcons[0].className = "fas fa-volume-mute"
    } else if (volume < 50) {
      volumeIcons[0].className = "fas fa-volume-down"
    } else {
      volumeIcons[0].className = "fas fa-volume-up"
    }

    // Update status
    this.updateStatus(`Volume: ${volume}%`)
  }

  startProgressSimulation() {
    this.progressInterval = setInterval(() => {
      if (this.isPlaying) {
        this.currentTime++
        this.updateProgressBar()

        // Check if song ended
        if (this.currentTime >= this.songs[this.currentSongIndex].duration) {
          this.handleSongEnd()
        }
      }
    }, 1000)
  }

  updateProgressBar() {
    const duration = this.songs[this.currentSongIndex].duration
    const progress = (this.currentTime / duration) * 100
    this.progressBar.style.width = `${Math.min(progress, 100)}%`
    this.currentTimeEl.textContent = this.formatTime(this.currentTime)
  }

  handleSongEnd() {
    if (this.isRepeating) {
      this.currentTime = 0
      this.play()
      this.updateStatus("Repeating current song")
    } else if (this.isAutoplay) {
      this.nextSong()
      this.updateStatus("Auto-playing next song")
    } else {
      this.pause()
      this.currentTime = 0
      this.updateProgressBar()
      this.updateStatus("Song ended")
    }
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled
    this.shuffleBtn.classList.toggle("active", this.isShuffled)
    this.updateStatus(this.isShuffled ? "Shuffle enabled" : "Shuffle disabled")
  }

  toggleRepeat() {
    this.isRepeating = !this.isRepeating
    this.repeatBtn.classList.toggle("active", this.isRepeating)
    this.updateStatus(this.isRepeating ? "Repeat enabled" : "Repeat disabled")
  }

  toggleAutoplay() {
    this.isAutoplay = !this.isAutoplay
    this.autoplayBtn.classList.toggle("active", this.isAutoplay)
    this.updateStatus(this.isAutoplay ? "Autoplay enabled" : "Autoplay disabled")
  }

  handleKeyboard(e) {
    switch (e.code) {
      case "Space":
        e.preventDefault()
        this.togglePlayPause()
        break
      case "ArrowLeft":
        this.previousSong()
        break
      case "ArrowRight":
        this.nextSong()
        break
      case "ArrowUp":
        e.preventDefault()
        const currentVolume = Number.parseInt(this.volumeSlider.value)
        this.volumeSlider.value = Math.min(100, currentVolume + 10)
        this.setVolume(this.volumeSlider.value)
        break
      case "ArrowDown":
        e.preventDefault()
        const currentVol = Number.parseInt(this.volumeSlider.value)
        this.volumeSlider.value = Math.max(0, currentVol - 10)
        this.setVolume(this.volumeSlider.value)
        break
      case "KeyS":
        this.toggleShuffle()
        break
      case "KeyR":
        this.toggleRepeat()
        break
      case "KeyA":
        this.toggleAutoplay()
        break
    }
  }

  updateStatus(message) {
    this.statusText.textContent = message
    setTimeout(() => {
      if (this.statusText.textContent === message) {
        this.statusText.textContent = this.isPlaying ? "Playing..." : "Ready to play"
      }
    }, 3000)
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }
}

// Initialize the music player when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const player = new MusicPlayer()

  // Add welcome message
  setTimeout(() => {
    player.updateStatus("Welcome to Music Player! Press Space to play/pause")
  }, 1000)
})

// Add some fun easter eggs
let clickCount = 0
document.querySelector(".album-art").addEventListener("click", () => {
  clickCount++
  if (clickCount === 5) {
    document.querySelector(".music-player").style.transform = "rotate(360deg)"
    document.querySelector(".music-player").style.transition = "transform 1s ease"
    setTimeout(() => {
      document.querySelector(".music-player").style.transform = ""
    }, 1000)
    clickCount = 0
  }
})
