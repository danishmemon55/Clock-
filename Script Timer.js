const setTimerBtn = document.getElementById('setTimerBtn');
const confirmTimerBtn = document.getElementById('confirmTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');
const startStopBtn = document.getElementById('startStopBtn');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const alarmSound = document.getElementById('alarmSound');
const inputContainer = document.getElementById('inputContainer');
const modal = document.getElementById('timeUpModal'); // Time Up modal
const okBtn = document.getElementById('okBtn'); // Time Up OK button
const enableSoundToggle = document.getElementById('enableSoundToggle');
const toggleLabel = document.getElementById('toggleLabel'); // For updating the label

// Selectors for the scrolling elements
const scrollHours = document.getElementById('scrollHours');
const scrollMinutes = document.getElementById('scrollMinutes');
const scrollSeconds = document.getElementById('scrollSeconds');

let selectedHours = 0;
let selectedMinutes = 0;
let selectedSeconds = 0;
let timerInterval = null;
let timerJustCompleted = false; // Track if timer just completed

// Function to populate scrolling options
function populateScrolls() {
    // Populate hours
    for (let i = 0; i <= 23; i++) {
        const hourDiv = document.createElement('div');
        hourDiv.textContent = String(i).padStart(2, '0');
        hourDiv.onclick = () => selectTime(hourDiv, 'hours');
        scrollHours.appendChild(hourDiv);
    }

    // Populate minutes
    for (let i = 0; i <= 59; i++) {
        const minuteDiv = document.createElement('div');
        minuteDiv.textContent = String(i).padStart(2, '0');
        minuteDiv.onclick = () => selectTime(minuteDiv, 'minutes');
        scrollMinutes.appendChild(minuteDiv);
    }

    // Populate seconds
    for (let i = 0; i <= 59; i++) {
        const secondDiv = document.createElement('div');
        secondDiv.textContent = String(i).padStart(2, '0');
        secondDiv.onclick = () => selectTime(secondDiv, 'seconds');
        scrollSeconds.appendChild(secondDiv);
    }
}

// Call populateScrolls to set up the scrolling options
populateScrolls();

setTimerBtn.addEventListener('click', () => {
    inputContainer.style.display = 'flex'; // Show input fields
    setTimerBtn.style.display = 'none'; // Hide Set Timer button
    startStopBtn.style.display = 'none'; // Hide Start/Stop button when setting timer
    resetTimerBtn.style.display = 'none'; // Ensure Reset button is hidden too
    hideTimeUpModal(); // Hide the modal when setting a new timer
});

function selectTime(selectedDiv, type) {
    // Change color of the selected div
    Array.from(selectedDiv.parentNode.children).forEach(div => {
        div.style.color = '#FFFFFF'; // Reset all to white
    });
    selectedDiv.style.color = '#21a1f1'; // Highlight selected

    // Store selected values based on type
    if (type === 'hours') {
        selectedHours = parseInt(selectedDiv.textContent);
    } else if (type === 'minutes') {
        selectedMinutes = parseInt(selectedDiv.textContent);
    } else if (type === 'seconds') {
        selectedSeconds = parseInt(selectedDiv.textContent);
    }

    // Display the selected time
    hoursDisplay.textContent = String(selectedHours).padStart(2, '0');
    minutesDisplay.textContent = String(selectedMinutes).padStart(2, '0');
    secondsDisplay.textContent = String(selectedSeconds).padStart(2, '0');
}

confirmTimerBtn.addEventListener('click', () => {
    inputContainer.style.display = 'none'; // Hide input fields
    startStopBtn.style.display = 'block'; // Show the Start/Stop button
    resetTimerBtn.style.display = 'block'; // Show Reset Timer button
    startStopBtn.textContent = 'Start'; // Set button text to Start
});

startStopBtn.addEventListener('click', () => {
    if (startStopBtn.textContent === 'Start') {
        startTimer();
        startStopBtn.textContent = 'Stop'; // Change button text to Stop
    } else {
        stopTimer();
        startStopBtn.textContent = 'Start'; // Change button text to Start
    }
});

resetTimerBtn.addEventListener('click', () => {
    resetTimer(); // Call reset function
});

function startTimer() {
    timerInterval = setInterval(() => {
        if (selectedSeconds > 0) {
            selectedSeconds--;
        } else if (selectedMinutes > 0) {
            selectedMinutes--;
            selectedSeconds = 59;
        } else if (selectedHours > 0) {
            selectedHours--;
            selectedMinutes = 59;
            selectedSeconds = 59;
        }

        // Update display
        hoursDisplay.textContent = String(selectedHours).padStart(2, '0');
        minutesDisplay.textContent = String(selectedMinutes).padStart(2, '0');
        secondsDisplay.textContent = String(selectedSeconds).padStart(2, '0');

        // Check if time is up
        if (selectedHours === 0 && selectedMinutes === 0 && selectedSeconds === 0) {
            clearInterval(timerInterval);
            timerJustCompleted = true; // Mark timer as completed
            showTimeUpModal();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer(); // Stop the timer if running
    selectedHours = 0;
    selectedMinutes = 0;
    selectedSeconds = 0;

    // Reset display
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';

    // Stop the alarm sound if the timer just completed
    if (timerJustCompleted) {
        alarmSound.pause(); // Stop the sound
        alarmSound.currentTime = 0; // Reset the sound to the beginning
        timerJustCompleted = false; // Reset the flag
    }

    // Show the Set Timer button and hide the Reset and Start/Stop buttons
    resetTimerBtn.style.display = 'none';
    startStopBtn.style.display = 'none'; // Hide Start/Stop button on reset
    setTimerBtn.style.display = 'block';

    hideTimeUpModal(); // Hide modal when resetting the timer
}

// Function to show the modal and optionally play sound based on toggle state
function showTimeUpModal() {
    if (enableSoundToggle.checked) { // Check if the toggle is on
        alarmSound.play(); // Play the alarm sound
    }
    modal.classList.remove('hidden'); // Show the modal
}

function hideTimeUpModal() {
    modal.classList.add('hidden'); // Hide the modal
}

// Update the label based on toggle state
enableSoundToggle.addEventListener('change', () => {
    toggleLabel.textContent = enableSoundToggle.checked ? "Sound on" : "Sound off";
});

okBtn.addEventListener('click', () => {
    hideTimeUpModal(); // Hide the modal
    alarmSound.pause(); // Stop the sound
    alarmSound.currentTime = 0; // Reset the sound to the beginning
});
