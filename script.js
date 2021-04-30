const pomodoro = document.querySelector('.pomodoro-clock')
// let initialTimer = 1499000 - 25 minutes
let initialTimer = 10000;

var handle = null;
let flag = false;

function updateDisplay() {
    let minutes = Math.floor(initialTimer / 60000)
    let seconds = (initialTimer % 60000) / 1000
    if (minutes < 10 && seconds <= 10) {
        if (seconds == 10) {
            pomodoro.innerHTML = `0${minutes}:${seconds}`
        } else {
            pomodoro.innerHTML = `0${minutes}:0${seconds}`
        }
    } else if (seconds < 10) {
        pomodoro.innerHTML = `${minutes}:0${seconds}`
    } else {
        pomodoro.innerHTML = `${minutes}:${seconds}`
    }
    initialTimer = initialTimer - 1000
    if ((initialTimer < 0) && flag == false) {
        pause.classList.add('hidden')
        play.classList.remove('hidden')
        clearInterval(handle)
        handle = null;
        pomodoro.innerHTML = '05:00'
        // initialTimer = 300000 - 5 minutes
        initialTimer = 5000
        flag = true;
    } else if ((initialTimer < 0)) {
        pause.classList.add('hidden')
        play.classList.remove('hidden')
        clearInterval(handle)
        handle = null;
        pomodoro.innerHTML = '25:00'
        // initialTimer = 1499000; - 25 minutes
        initialTimer = 10000
        flag = false;
    }
}

const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const stop = document.querySelector('.stop')

play.addEventListener('click', () => {
    pause.classList.toggle('hidden')
    play.classList.toggle('hidden')
    handle = setInterval(updateDisplay, 1000)
})
pause.addEventListener('click', () => {
    pause.classList.toggle('hidden')
    play.classList.toggle('hidden')
    clearInterval(handle)
    handle = null;
})
stop.addEventListener('click', () => {
    pause.classList.add('hidden')
    play.classList.remove('hidden')
    clearInterval(handle)
    handle = null;
    if (flag) {
        pomodoro.innerHTML = '05:00'
        // initialTimer = 300000 - 5 minutes
        initialTimer = 5000
        flag = true;
    } else {
        pomodoro.innerHTML = '25:00'
        // initialTimer = 1499000
        initialTimer = 10000
        flag = false;
    }
})