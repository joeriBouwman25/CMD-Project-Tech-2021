const music = document.querySelectorAll('audio')
const button = document.querySelectorAll('.musicList article div button')
const icon = document.querySelectorAll('span')

const match = document.getElementById('newMatch')
const counterSpan = document.getElementById('newMatchCount')

const myStorage = window.localStorage

let a = true

// change layout when JS is enabled
button.forEach(playButton => playButton.classList.remove('hidden'))
music.forEach(audioElement => audioElement.classList.add('hidden'))

// play music and change play button
for (let i = 0; i < button.length; i++) {
  const playMusic = () => {
    if (a) {
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

// working on match counter with closure
const newMatch = () => {
  counterSpan.classList.remove('hidden')
  const amount = myStorage.getItem('counter')

  if (!amount) return myStorage.setItem('counter', 1)
  myStorage.setItem('counter', +amount + 1)
}

if (!match) {
  console.log('sorry no match yet')
} else {
  match.addEventListener('animationend', newMatch)
}

if (document.getElementsByClassName('match')[0]) {
  myStorage.clear()
}

if (!myStorage.getItem('counter')) {
  counterSpan.classList.add('hidden')
} else {
  counterSpan.classList.remove('hidden')
  counterSpan.innerHTML = myStorage.counter
}
