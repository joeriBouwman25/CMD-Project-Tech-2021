const music = document.querySelectorAll('audio')
const button = document.querySelectorAll('.musicList article div button')
// const musicListButtons = document.querySelectorAll('.musicList article div button')
const icon = document.querySelectorAll('span')

const match = document.getElementById('newMatch')
const counterSpan = document.getElementById('newMatchCount')
const matchCheck = document.getElementsByClassName('home')
let a = true

button.forEach(playButton => playButton.classList.remove('hidden'))
console.log(button)
music.forEach(audioElement => audioElement.classList.add('hidden'))
// play music and change play button
for (let i = 0; i < button.length; i++) {
  const playMusic = () => {
    if (a === true) {
      music[i].play()
      icon[i].classList.add('pause')
      a = false
    } else {
      music[i].pause()
      a = true
      icon[i].classList.remove('pause')
    }
  }
  button[i].addEventListener('click', playMusic)
}

for (let i = 0; i < button.length; i++) {
  const changeIcon = () => {
    if (icon[i].className === 'pause') {
      icon[i].classList.remove('pause')
    }
  }
  music[i].addEventListener('ended', changeIcon)
}

const newMatch = (req, res) => {
  let i = 1
  const counter = () => { // closure
    i++
    sessionStorage.setItem('counter', i)
  }
  return counter
    .then(counterSpan.innerHTML = i)
}

if (!match) {
  console.log('sorry no match yet')
} else {
  match.addEventListener('animationend', newMatch, false)
}

if (matchCheck[0]) {
  const i = localStorage.getItem('counter')
  console.log(i)
  counterSpan.innerHTML = i
}

// music.forEach((audioElement) => { audioElement.classList.add('hidden') })

// const searchForSongs = () => {
//   const form = document.getElementsByClassName('hiddenForm')
//   const hiddenForm = Array.from(form)
//   hiddenForm.forEach(element => element.classList.remove('hiddenForm'))
// }

// changeButton.addEventListener('click', searchForSongs)
