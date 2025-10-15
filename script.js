// --- 1. ANNIVERSARY & TIMER LOGIC ---

const anniversaryDate = new Date('2025-07-25T20:30:00');
const ANNIVERSARY_DAY = 25;
const ANNIVERSARY_MONTH = 6; // Month is 0-indexed (July = 6)
const ANNIVERSARY_HOUR = 0;
const ANNIVERSARY_MINUTE = 0;
const ANNIVERSARY_SECOND = 0;

const elements = {
    years: document.getElementById('years'), months: document.getElementById('months'),
    days: document.getElementById('days'), hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'), seconds: document.getElementById('seconds'),
    annivDays: document.getElementById('anniv-days'), annivHours: document.getElementById('anniv-hours'),
    annivMinutes: document.getElementById('anniv-minutes'), annivSeconds: document.getElementById('anniv-seconds'),
    anniversaryTitle: document.getElementById('anniversary-title'),
};

let lastTime = {};

function getOrdinalSuffix(n) {
    if (n > 10 && n < 14) return 'th';
    const lastDigit = n % 10;
    switch (lastDigit) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function updateAnniversaryText(nextAnniversaryDate) {
    const anniversaryNumber = nextAnniversaryDate.getFullYear() - anniversaryDate.getFullYear();
    if (anniversaryNumber < 1) {
        elements.anniversaryTitle.textContent = "Counting down to our 1st Anniversary... 🥹✨";
    } else {
        const ordinal = getOrdinalSuffix(anniversaryNumber);
        elements.anniversaryTitle.textContent = `Our ${anniversaryNumber}${ordinal} Anniversary is in... 🥹✨`;
    }
}

function updateTimer() {
    const now = new Date();
    
    // Relationship Duration Timer
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
    
    // Next Anniversary Countdown
    let nextAnniversary = new Date(now.getFullYear(), ANNIVERSARY_MONTH, ANNIVERSARY_DAY, ANNIVERSARY_HOUR, ANNIVERSARY_MINUTE, ANNIVERSARY_SECOND);
    if (now.getTime() >= nextAnniversary.getTime()) {
        nextAnniversary.setFullYear(now.getFullYear() + 1);
    }

    updateAnniversaryText(nextAnniversary);
    
    const timeRemaining = nextAnniversary.getTime() - now.getTime();
    const currentAnnivTime = {
        annivDays: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
        annivHours: pad(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)),
        annivMinutes: pad(Math.floor((timeRemaining / 1000 / 60) % 60)),
        annivSeconds: pad(Math.floor((timeRemaining / 1000) % 60))
    };

    // Update DOM only if values change
    const combinedTime = { ...currentTime, ...currentAnnivTime };
    for (const key in combinedTime) {
        if (combinedTime[key] !== lastTime[key] && elements[key]) {
            elements[key].textContent = combinedTime[key];
            elements[key].classList.add('updated');
            setTimeout(() => elements[key].classList.remove('updated'), 200);
        }
    }
    lastTime = combinedTime;
}

setInterval(updateTimer, 1000);
updateTimer();


// --- 2. PET NAME ANIMATION ---

const petNames = ["My Babyyy... 😋", "My Wifeyyy... 😘", "My Honeyyyy... 💕", "My Forever... ♾️", "My Kuchu Puchu... 🥰", "My Sweetheart... 💖", "My Soan Papdi... 💝", "My Darlinggg... 💘", "My Everything... 🤌🏼", "My Bestfriend...", "My FAMILY... 💞"];
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

class Ribbon { /* ... same as before ... */ }
// Your Ribbon class from the previous file goes here. It is unchanged.
// For brevity, I'm omitting it, but you should KEEP your existing Ribbon class.
class Ribbon {
    constructor() { this.init(); }
    init() {
        this.x = 0;
        this.y = Math.random() * height;
        this.vy = Math.random() * 0.1 - 0.05;
        let hue; const rand = Math.random();
        if (rand < 0.33) { hue = Math.random() * (350 - 320) + 320; }
        else if (rand < 0.66) { hue = Math.random() * (280 - 250) + 250; }
        else { hue = Math.random() * (270 - 240) + 240; }
        this.color = `hsla(${hue}, 80%, 70%, 0.15)`;
        this.width = Math.random() * width;
        this.amplitude = Math.random() * 50 + 20;
        this.frequency = Math.random() * 0.01 + 0.005;
        this.phase = Math.random() * Math.PI * 2;
        this.lineWidth = Math.random() * 1.5 + 0.5;
    }
    update() {
        this.phase += 0.01; this.y += this.vy;
        if (this.y < 0 || this.y > height) { this.init(); }
    }
    draw() {
        ctx.beginPath();
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${this.color.split('(')[1].split(',')[0]}, 100%, 80%, 0.8)`;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        for (let i = 0; i <= width; i += 7) {
            const y = this.y + Math.sin(i * this.frequency + this.phase) * this.amplitude;
            ctx.lineTo(i, y);
        }
        ctx.stroke(); ctx.closePath();
        ctx.shadowBlur = 0; ctx.shadowColor = 'transparent';
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, this.color.replace('0.15', '0.08'));
        gradient.addColorStop(1, 'rgba(12, 10, 36, 0)');
        ctx.fillStyle = gradient; ctx.fill();
    }
}

// --- OPTIMIZATION: Use fewer ribbons on mobile for smoother performance ---
const ribbonCount = window.innerWidth < 768 ? 10 : 20; // 10 ribbons for mobile, 20 for desktop
for (let i = 0; i < ribbonCount; i++) {
    ribbons.push(new Ribbon());
}

function animate() {
    ctx.fillStyle = 'rgba(12, 10, 36, 0.03)';
    ctx.fillRect(0, 0, width, height);
    for (const ribbon of ribbons) {
        ribbon.update();
        ribbon.draw();
    }
    requestAnimationFrame(animate);
}

animate();
