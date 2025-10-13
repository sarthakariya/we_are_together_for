// --- 1. ANNIVERSARY & TIMER LOGIC ---

const anniversaryDate = new Date('2025-07-25T20:30:00'); // SET YOUR DATE HERE

const elements = {
    years: document.getElementById('years'),
    months: document.getElementById('months'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

let lastTime = {};

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
        days += lastMonth.getDate(); months--;
    }
    if (months < 0) { months += 12; years--; }

    const pad = (num) => num.toString().padStart(2, '0');
    
    const currentTime = {
        years: years, months: months, days: days,
        hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds)
    };

    for (const key in currentTime) {
        if (currentTime[key] !== lastTime[key]) {
            elements[key].textContent = currentTime[key];
            elements[key].classList.add('updated');
            setTimeout(() => elements[key].classList.remove('updated'), 300);
        }
    }
    lastTime = currentTime;
}

setInterval(updateTimer, 1000);
updateTimer();

// --- 2. PET NAME ANIMATION ---

const petNames = ["My Babyyy", "My Wifeyyy", "My Honeyyyy", "My Forever..."];
let currentPetNameIndex = 0;
const petNameElement = document.getElementById('pet-names');

setInterval(() => {
    petNameElement.style.opacity = '0'; // Fade out
    setTimeout(() => {
        currentPetNameIndex = (currentPetNameIndex + 1) % petNames.length;
        petNameElement.textContent = petNames[currentPetNameIndex];
        petNameElement.style.opacity = '1'; // Fade in
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
        this.vy = Math.random() * 0.2 - 0.1;
        this.color = `hsla(${Math.random() * 360}, 70%, 60%, 0.15)`;
        this.width = Math.random() * width;
        this.amplitude = Math.random() * 100 + 50;
        this.frequency = Math.random() * 0.02 + 0.01;
        this.phase = Math.random() * Math.PI * 2;
    }
    update() {
        this.phase += 0.02;
        this.y += this.vy;
        if (this.y < 0 || this.y > height) {
            this.init();
        }
    }
    draw() {
        ctx.beginPath();
        for (let i = 0; i <= width; i += 5) {
            const y = this.y + Math.sin(i * this.frequency + this.phase) * this.amplitude;
            ctx.lineTo(i, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(12, 10, 36, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

for (let i = 0; i < 15; i++) {
    ribbons.push(new Ribbon());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const ribbon of ribbons) {
        ribbon.update();
        ribbon.draw();
    }
    requestAnimationFrame(animate);
}

animate();
