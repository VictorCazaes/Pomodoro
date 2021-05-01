Notification.requestPermission()
const pomodoro = document.querySelector('.pomodoro-clock')
const tab = document.querySelector('.tab')
const background = document.querySelector('main')
// let initialTimer = 1499000 - 25 minutes
let initialTimer = 10000;

var handle = null;
let rest = false;

function updateDisplay() {
    let minutes = Math.floor(initialTimer / 60000)
    let seconds = (initialTimer % 60000) / 1000
    if (minutes < 10 && seconds <= 10) {
        if (seconds == 10) {
            pomodoro.innerHTML = `0${minutes}:${seconds}`
            tab.innerHTML = `0${minutes}:${seconds} - Pomodoro`
        } else {
            pomodoro.innerHTML = `0${minutes}:0${seconds}`
            tab.innerHTML = `0${minutes}:0${seconds} - Pomodoro`
        }
    } else if (seconds < 10) {
        pomodoro.innerHTML = `${minutes}:0${seconds}`
        tab.innerHTML = `${minutes}:0${seconds} - Pomodoro`
    } else {
        pomodoro.innerHTML = `${minutes}:${seconds}`
        tab.innerHTML = `${minutes}:${seconds} - Pomodoro`
    }
    initialTimer = initialTimer - 1000
    if ((initialTimer < 0) && rest == false) {
        pause.classList.add('hidden')
        play.classList.remove('hidden')
        clearInterval(handle)
        handle = null;
        new Notification("Take a break", {
            body: "It's time to rest for five minutes."
        })
        pomodoro.innerHTML = '05:00'
        // initialTimer = 300000 - 5 minutes
        initialTimer = 5000
        rest = true;
        background.classList.toggle('rest')
    } else if ((initialTimer < 0)) {
        pause.classList.add('hidden')
        play.classList.remove('hidden')
        clearInterval(handle)
        handle = null;
        new Notification("Back to focus", {
            body: "It's time to keep working for twenty five minutes."
        })
        pomodoro.innerHTML = '25:00'
        // initialTimer = 1499000; - 25 minutes
        initialTimer = 10000
        rest = false;
        background.classList.toggle('rest')
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
    if (rest) {
        pomodoro.innerHTML = '05:00'
        // initialTimer = 300000 - 5 minutes
        initialTimer = 5000
        rest = true;
    } else {
        pomodoro.innerHTML = '25:00'
        // initialTimer = 1499000
        initialTimer = 10000
        rest = false;
    }
})