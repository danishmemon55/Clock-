
let hr = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let amPmDisplay = document.getElementById('am-pm');

// Load the previously selected time zone from localStorage, or default to 'Asia/Karachi'
let selectedTimeZone = localStorage.getItem('selectedTimeZone') || 'Asia/Karachi';

// Function to display time and AM/PM
function displayTime() {
    // Get the current time in the selected time zone
    let date = new Date(new Date().toLocaleString("en-US", { timeZone: selectedTimeZone }));

    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let amPm = hh >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    hh = hh % 12;
    hh = hh ? hh : 12; // If hour = 0, display it as 12

    // Rotate the clock hands
    let hRotation = 30 * (hh % 12) + mm / 2;
    let mRotation = 6 * mm;
    let sRotation = 6 * ss;

    hr.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;

    // Update the AM/PM display
    amPmDisplay.textContent = amPm;
}

setInterval(displayTime, 1000);

// Toggle country dropdown visibility
function toggleDropdown() {
    const countryList = document.getElementById('country-list');
    countryList.style.display = countryList.style.display === 'none' ? 'block' : 'none';
}

// Change time zone based on selected country
function changeTimeZone() {
    const countrySelect = document.getElementById('country-select');
    selectedTimeZone = countrySelect.value;
    localStorage.setItem('selectedTimeZone', selectedTimeZone); // Save the selected time zone in localStorage
    toggleDropdown(); // Close the dropdown after selecting a country
}

// Set the dropdown to the saved value when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country-select');
    countrySelect.value = selectedTimeZone; // Set dropdown to the stored time zone value
});
