// --- IMPORTANT: SET YOUR SPECIAL DATE HERE ---
// The format is: 'YYYY-MM-DDTHH:MM:SS'
// For example, July 25th, 2023 at midnight would be '2023-07-25T00:00:00'
const anniversaryDate = new Date('2023-07-25T00:00:00');

// Get the elements from the HTML
const yearsEl = document.getElementById('years');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// This function will update the timer every second
function updateTimer() {
    const now = new Date();
    
    let years = now.getFullYear() - anniversaryDate.getFullYear();
    let months = now.getMonth() - anniversaryDate.getMonth();
    let days = now.getDate() - anniversaryDate.getDate();
    let hours = now.getHours() - anniversaryDate.getHours();
    let minutes = now.getMinutes() - anniversaryDate.getMinutes();
    let seconds = now.getSeconds() - anniversaryDate.getSeconds();

    // This logic handles "borrowing" from larger units if a value is negative
    // For example, if seconds are negative, it subtracts a minute and adds 60 seconds.
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        // Get the last day of the previous month
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    // This function adds a '0' in front of numbers less than 10
    const pad = (num) => num.toString().padStart(2, '0');

    // Update the HTML content with the new values
    yearsEl.textContent = years;
    monthsEl.textContent = months;
    daysEl.textContent = days;
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
}

// --- Floating Hearts Functionality ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    heart.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    heart.style.animationDuration = Math.random() * 5 + 5 + 's'; // Random speed (between 5s and 10s)
    heart.innerHTML = '❤️';
    
    document.body.appendChild(heart);
    
    // Remove the heart after it finishes its animation
    setTimeout(() => {
        heart.remove();
    }, 10000); // 10000ms = 10s
}

// Run the timer update function immediately and then every second
updateTimer();
setInterval(updateTimer, 1000);

// Create a new heart every 500ms (half a second)
setInterval(createHeart, 500);
