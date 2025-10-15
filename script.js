// --- 1. ANNIVERSARY & TIMER LOGIC (No changes needed here) ---
// SET YOUR DATE HERE
const anniversaryDate = new Date('2025-07-25T20:30:00');
const ANNIVERSARY_DAY = 25;
const ANNIVERSARY_MONTH = 6; // July is 6 (0-indexed)
const ANNIVERSARY_HOUR = 0;
const ANNIVERSARY_MINUTE = 0;
const ANNIVERSARY_SECOND = 0;

const elements = {
    years: document.getElementById('years'), months: document.getElementById('months'), days: document.getElementById('days'),
    hours: document.getElementById('hours'), minutes: document.getElementById('minutes'), seconds: document.getElementById('seconds'),
    annivDays: document.getElementById('anniv-days'), annivHours: document.getElementById('anniv-hours'),
    annivMinutes: document.getElementById('anniv-minutes'), annivSeconds: document.getElementById('anniv-seconds'),
    anniversaryTitle: document.getElementById('anniversary-title'),
};
let lastTime = {};
function getOrdinalSuffix(n) { if (n > 3 && n < 21) return 'th'; switch (n % 10) { case 1: return "st"; case 2: return "nd"; case 3: return "rd"; default: return "th"; } }
function updateAnniversaryText(nextAnniversaryDate) {
    const anniversaryNumber = nextAnniversaryDate.getFullYear() - anniversaryDate.getFullYear();
    if (anniversaryNumber < 1) { elements.anniversaryTitle.textContent = "Counting down to our 1st Anniversary... 🥹✨"; }
    else { const ordinal = getOrdinalSuffix(anniversaryNumber); elements.anniversaryTitle.textContent = `Our ${anniversaryNumber}${ordinal} Anniversary is in... 🥹✨`; }
}
function updateTimer() {
    const now = new Date();
    let years = now.getFullYear() - anniversaryDate.getFullYear(), months = now.getMonth() - anniversaryDate.getMonth(), days = now.getDate() - anniversaryDate.getDate(), hours = now.getHours() - anniversaryDate.getHours(), minutes = now.getMinutes() - anniversaryDate.getMinutes(), seconds = now.getSeconds() - anniversaryDate.getSeconds();
    if (seconds < 0) { seconds += 60; minutes--; } if (minutes < 0) { minutes += 60; hours--; } if (hours < 0) { hours += 24; days--; } if (days < 0) { const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += lastMonth.getDate(); months--; } if (months < 0) { months += 12; years--; }
    const pad = (num) => num.toString().padStart(2, '0');
    const currentTime = { years, months, days, hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
    for (const key in currentTime) { if (currentTime[key] !== lastTime[key] && elements[key]) { elements[key].textContent = currentTime[key]; elements[key].classList.add('updated'); setTimeout(() => elements[key].classList.remove('updated'), 300); } }
    let nextAnniversary = new Date(now.getFullYear(), ANNIVERSARY_MONTH, ANNIVERSARY_DAY, ANNIVERSARY_HOUR, ANNIVERSARY_MINUTE, ANNIVERSARY_SECOND);
    if (now.getTime() >= nextAnniversary.getTime()) { nextAnniversary.setFullYear(now.getFullYear() + 1); }
    updateAnniversaryText(nextAnniversary);
    const timeRemaining = nextAnniversary.getTime() - now.getTime();
    const annivDays = Math.floor(timeRemaining / 86400000), annivHours = Math.floor((timeRemaining % 86400000) / 3600000), annivMinutes = Math.floor((timeRemaining % 3600000) / 60000), annivSeconds = Math.floor((timeRemaining % 60000) / 1000);
    const currentAnnivTime = { annivDays, annivHours: pad(annivHours), annivMinutes: pad(annivMinutes), annivSeconds: pad(annivSeconds) };
    for (const key in currentAnnivTime) { if (currentAnnivTime[key] !== lastTime[key] && elements[key]) { elements[key].textContent = currentAnnivTime[key]; elements[key].classList.add('updated'); setTimeout(() => elements[key].classList.remove('updated'), 300); } }
    lastTime = { ...currentTime, ...currentAnnivTime };
}
setInterval(updateTimer, 1000); updateTimer();

// --- 2. PET NAME ANIMATION (No changes needed here) ---
const petNames = ["My Babyyy... 😋", "My Wifeyyy... 😘", "My Honeyyyy... 💕", "My Forever... ♾️", "My Kuchu Puchu... 🥰", "My Sweetheart... 💖", "My Soan Papdi... 💝", "My Darlinggg... 💘", "My Everything... 🤌🏼", "My Bestfriend... ", "My FAMILY... 💞"];
let currentPetNameIndex = 0;
const petNameElement = document.getElementById('pet-names');
setInterval(() => {
    petNameElement.style.opacity = '0';
    setTimeout(() => {
        currentPetNameIndex = (currentPetNameIndex + 1) % petNames.length;
        petNameElement.innerHTML = petNames[currentPetNameIndex];
        petNameElement.style.opacity = '1';
    }, 500);
}, 3000);


// --- 3. OPTIMIZED ETHEREAL AURORA BACKGROUND ---

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
        this.vy = Math.random() * 0.1 - 0.05;
        let hue;
        const rand = Math.random();
        if (rand < 0.33) { hue = Math.random() * 30 + 320; } // Pinks
        else if (rand < 0.66) { hue = Math.random() * 30 + 250; } // Purples
        else { hue = Math.random() * 30 + 220; } // Violets
        this.color = `hsla(${hue}, 80%, 70%, 0.18)`; // Slightly more visible color
        this.width = Math.random() * width;
        this.amplitude = Math.random() * 50 + 20;
        this.frequency = Math.random() * 0.01 + 0.005;
        this.phase = Math.random() * Math.PI * 2;
        this.lineWidth = Math.random() * 2 + 1; // Slightly thicker lines
    }
    update() {
        this.phase += 0.015; // Slightly faster movement
        this.y += this.vy;
        if (this.y + this.amplitude < 0 || this.y - this.amplitude > height) {
            this.init();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        // OPTIMIZATION: Removed the extremely costly shadowBlur effect
        // ctx.shadowBlur = 12;
        // ctx.shadowColor = ...;
        
        for (let i = 0; i <= width; i += 10) { // OPTIMIZATION: Increased step to draw fewer points
            const y = this.y + Math.sin(i * this.frequency + this.phase) * this.amplitude;
            ctx.lineTo(i, y);
        }
        ctx.stroke();
    }
}

// OPTIMIZATION: Reduced the number of ribbons from 20 to 12
for (let i = 0; i < 12; i++) {
    ribbons.push(new Ribbon());
}

function animate() {
    // Use a semi-transparent fill to create a motion-blur trail effect
    ctx.fillStyle = 'rgba(12, 10, 36, 0.05)';
    ctx.fillRect(0, 0, width, height);

    for (const ribbon of ribbons) {
        ribbon.update();
        ribbon.draw();
    }
    requestAnimationFrame(animate);
}

animate();
