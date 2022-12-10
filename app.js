const song = document.querySelector('#song')
const video = document.querySelector('video')
const sounds = document.querySelectorAll('#mood-section button')

let timer = 600
const timerLabel = document.querySelector('#timer-label')
const outline = document.querySelector('#moving-outline circle')
const outlineLength = outline.getTotalLength()
outline.style.strokeDashoffset = outlineLength
outline.style.strokeDasharray = outlineLength
timerLabel.textContent = `${Math.floor(timer / 60)}:${Math.floor(timer % 60)}`

sounds.forEach(sound => {
    sound.addEventListener('click', function() {
        song.src = this.getAttribute('data-sound')
        video.src = this.getAttribute('data-video')
        checkPlaying(song)
    })
})

const playButton = document.querySelector('#player-toggle')
playButton.addEventListener('click', function() {
    checkPlaying(song)
})

const timeOptions = document.querySelectorAll('#time-section button')
timeOptions.forEach(option => {
    option.addEventListener('click', function() {
        timer = this.getAttribute('data-time')
        timerLabel.textContent = `${Math.floor(timer / 60)}:${Math.floor(timer % 60)}`
    })
})

const playButtonImage = document.querySelector('#player-toggle img')
const checkPlaying = (song) => {
    if (song.paused) {
        song.play()
        video.play()
        playButtonImage.src = './svg/play.svg'
    } else {
        song.pause()
        video.pause()
        playButtonImage.src = './svg/pause.svg'
    }
}

song.ontimeupdate = () => {
    let currentTime = song.currentTime
    let elapsedTime = timer - currentTime
    let seconds = Math.floor(elapsedTime % 60)
    let minutes = Math.floor(elapsedTime / 60)
    timerLabel.textContent = `${minutes}:${seconds}`
    let progress = outlineLength - (currentTime / timer) * outlineLength
    outline.style.strokeDashoffset = progress

    if (currentTime >= timer) {
        song.pause()
        video.pause()
        song.currentTime = 0
        playButtonImage.src = './svg/play.svg'
    }
}
