
let timerInterval;
let minutes = 0, seconds = 0, milliseconds = 0;

const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

// Load saved time from localStorage if available
window.onload = function() {
    const savedTime = localStorage.getItem('stopwatchTime');
    if (savedTime) {
        const time = JSON.parse(savedTime);
        minutes = time.minutes;
        seconds = time.seconds;
        milliseconds = time.milliseconds;
        updateDisplay();
        resetBtn.disabled = false;  // Enable reset if saved time exists
    }
};

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;

    timerInterval = setInterval(() => {
        milliseconds++;
        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        updateDisplay();
        saveTime(); // Save time to localStorage
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    localStorage.removeItem('stopwatchTime'); // Clear saved time from localStorage
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true; // Disable reset button after reset
}

function updateDisplay() {
    displayMinutes.innerText = String(minutes).padStart(2, '0');
    displaySeconds.innerText = String(seconds).padStart(2, '0');
    displayMilliseconds.innerText = String(milliseconds).padStart(2, '0');
}

function saveTime() {
    const time = {
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds
    };
    localStorage.setItem('stopwatchTime', JSON.stringify(time));
}