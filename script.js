// --- 1. ANNIVERSARY & TIMER LOGIC ---

// SET YOUR DATE HERE
const anniversaryDate = new Date('2025-07-25T20:30:00'); 
const ANNIVERSARY_DAY = 25;
// Note: Month is 0-indexed, so July is 6
const ANNIVERSARY_MONTH = 6; 
// Time for Next Anniversary Countdown: Midnight (12:00:00 AM)
const ANNIVERSARY_HOUR = 0; 
const ANNIVERSARY_MINUTE = 0;
const ANNIVERSARY_SECOND = 0;

const elements = {
    years: document.getElementById('years'),
    months: document.getElementById('months'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    annivDays: document.getElementById('anniv-days'),
    annivHours: document.getElementById('anniv-hours'),
    annivMinutes: document.getElementById('anniv-minutes'),
    annivSeconds: document.getElementById('anniv-seconds')
};

let lastTime = {};

function updateTimer() {
    const now = new Date();
    
    // --- Relationship Duration Timer (Counts since 20:30:00) ---
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
        days += lastMonth.getDate(); months--;
    }
    if (months < 0) { months += 12; years--; }

    const pad = (num) => num.toString().padStart(2, '0');
    
    const currentTime = {
        years: years, months: months, days: days,
        hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds)
    };

    for (const key in currentTime) {
        if (currentTime[key] !== lastTime[key] && elements[key]) {
            elements[key].textContent = currentTime[key];
            elements[key].classList.add('updated');
            setTimeout(() => elements[key].classList.remove('updated'), 300);
        }
    }
    
    // --- Next Anniversary Countdown Timer (Counts to 12:00:00 AM) ---
    // Sets the next anniversary date to 12:00:00 AM
    let nextAnniversary = new Date(now.getFullYear(), ANNIVERSARY_MONTH, ANNIVERSARY_DAY, ANNIVERSARY_HOUR, ANNIVERSARY_MINUTE, ANNIVERSARY_SECOND);

    // If the time is past 12:00:00 AM on July 25th this year, set it for next year
    if (now.getTime() >= nextAnniversary.getTime()) {
        nextAnniversary = new Date(now.getFullYear() + 1, ANNIVERSARY_MONTH, ANNIVERSARY_DAY, ANNIVERSARY_HOUR, ANNIVERSARY_MINUTE, ANNIVERSARY_SECOND);
    }
    
    const timeRemaining = nextAnniversary.getTime() - now.getTime();

    const annivSeconds = Math.floor((timeRemaining / 1000) % 60);
    const annivMinutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const annivHours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const annivDays = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    
    const currentAnnivTime = {
        annivDays: annivDays, annivHours: pad(annivHours), 
        annivMinutes: pad(annivMinutes), annivSeconds: pad(annivSeconds)
    };
    
    for (const key in currentAnnivTime) {
        if (currentAnnivTime[key] !== lastTime[key] && elements[key]) {
            elements[key].textContent = currentAnnivTime[key];
            elements[key].classList.add('updated');
            setTimeout(() => elements[key].classList.remove('updated'), 300);
        }
    }
    
    lastTime = {...currentTime, ...currentAnnivTime};
}

setInterval(updateTimer, 1000);
updateTimer();

// --- 2. PET NAME ANIMATION ---

const petNames = [
    "My Babyyy 👶", "My Wifeyyy 👰‍♀️", "My Honeyyyy 🍯", "My Forever... ♾️",
    "My Kuchu Puchu 🥰", "My Sweetheart 💖", "My Soan Papdi 🍬", "My Darlinggg ✨",
    "My Everything 🌍", "My Bestfriend 🧑‍🤝‍🧑", "My FAMILY 👨‍👩‍👧‍👦"
];
let currentPetNameIndex = 0;
const petNameElement = document.getElementById('pet-names');

setInterval(() => {
    petNameElement.style.opacity = '0'; // Fade out
    setTimeout(() => {
        currentPetNameIndex = (currentPetNameIndex + 1) % petNames.length;
        petNameElement.innerHTML = petNames[currentPetNameIndex]; // Use innerHTML to allow emoji span
        petNameElement.style.opacity = '1'; // Fade in

        // Trigger emoji animation for new emoji
        const newEmoji = petNameElement.querySelector('.emoji-animated');
        if (newEmoji) {
            newEmoji.classList.remove('emoji-animated'); // Remove to re-add and re-trigger animation
            void newEmoji.offsetWidth; // Trigger reflow
            newEmoji.classList.add('emoji-animated');
        }

    }, 500); // Wait for fade out to finish
}, 4000); // Change every 4 seconds


// --- 3. ETHEREAL AURORA BACKGROUND ---

const canvas = document.getElementById('aurora-canvas');
const ctx = canvas.getContext('2d');

let width, height;
const ribbons = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Ribbon {
    constructor() { this.init(); }
    init() {
        this.x = 0;
        this.y = Math.random() * height;
        this.vy = Math.random() * 0.1 - 0.05; // Slower vertical movement
        
        // Generate hues specifically for pink, violet, purplish
        let hue;
        const rand = Math.random();
        if (rand < 0.33) { // Pinkish
            hue = Math.random() * (350 - 320) + 320; 
        } else if (rand < 0.66) { // Purplish
            hue = Math.random() * (280 - 250) + 250; 
        } else { // Violet
            hue = Math.random() * (270 - 240) + 240; 
        }

        this.color = `hsla(${hue}, 80%, 70%, 0.15)`; // Increased saturation and lightness
        this.width = Math.random() * width;
        this.amplitude = Math.random() * 50 + 20; // Subtle vertical presence
        this.frequency = Math.random() * 0.01 + 0.005; // Wider waves
        this.phase = Math.random() * Math.PI * 2;
        this.lineWidth = Math.random() * 2 + 1; // Varying line thickness for detail
    }
    update() {
        this.phase += 0.01; // Slower wave speed
        this.y += this.vy;
        if (this.y < 0 || this.y > height) {
            this.init();
        }
    }
    draw() {
        ctx.beginPath();
        // Set glow effect for each ribbon
        ctx.shadowBlur = 15; // More blur for a stronger glow
        ctx.shadowColor = `hsla(${this.color.split('(')[1].split(',')[0]}, 100%, 80%, 0.8)`; // Brighter glow color

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        for (let i = 0; i <= width; i += 5) { // Denser drawing points
            const y = this.y + Math.sin(i * this.frequency + this.phase) * this.amplitude;
            ctx.lineTo(i, y);
        }
        ctx.stroke(); // Draw the line with glow

        ctx.closePath();
        
        // Reset shadow for other drawings if any, or next ribbon
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        // Fill with a gradient (less opaque to see lines more)
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, this.color.replace('0.15', '0.08')); // Slightly less opaque
        gradient.addColorStop(1, 'rgba(12, 10, 36, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

for (let i = 0; i < 30; i++) { // Increased number of ribbons
    ribbons.push(new Ribbon());
}

function animate() {
    // Subtle trail effect instead of clearing entirely, maintains vibrancy
    ctx.fillStyle = 'rgba(12, 10, 36, 0.03)'; // Even less opaque trail
    ctx.fillRect(0, 0, width, height);
    
    for (const ribbon of ribbons) {
        ribbon.update();
        ribbon.draw();
    }
    requestAnimationFrame(animate);
}

animate();
