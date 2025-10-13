// --- IMPORTANT: SET YOUR SPECIAL DATE HERE ---
const anniversaryDate = new Date('2025-07-25T20:30:00'); // Ensure this date is correct!

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

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
        months--;
    }
    if (months < 0) { months += 12; years--; }

    const pad = (num) => num.toString().padStart(2, '0');

    yearsEl.textContent = years;
    monthsEl.textContent = months;
    daysEl.textContent = days;
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
}

// Run the timer update function
updateTimer();
setInterval(updateTimer, 1000);

// Note: The floating hearts animation from the previous version is disabled
// because the starfield is now the primary visual effect. You can re-enable it
// by uncommenting the two lines below if you wish.

// function createHeart() { ... } // (keep the function from previous version if you want)
// setInterval(createHeart, 500);


// --- NEW: Starfield and Shooting Stars Animation --- //

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = [];
const numStars = 800;
const shootingStars = [];

// Create stars
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleDirection: 1
    });
}

function createShootingStar() {
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        len: Math.random() * 80 + 10,
        speed: Math.random() * 8 + 5,
        alpha: 1,
        life: 100 // life in frames
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Twinkle effect
        star.alpha += star.twinkleSpeed * star.twinkleDirection;
        if (star.alpha >= 1 || star.alpha <= 0) {
            star.twinkleDirection *= -1;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    }

    // Draw shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(ss.x, ss.y, ss.x + ss.len, ss.y - ss.len);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len, ss.y + ss.len);
        ctx.stroke();

        ss.x -= ss.speed;
        ss.y += ss.speed / 5; // Slight downward angle
        ss.life--;
        ss.alpha = ss.life / 100;

        if (ss.life <= 0 || ss.x < -ss.len) {
            shootingStars.splice(i, 1);
        }
    }

    requestAnimationFrame(draw);
}

// Randomly create shooting stars
setInterval(createShootingStar, 3000);

draw();
