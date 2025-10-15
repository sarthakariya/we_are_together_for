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

    annivSeconds: document.getElementById('anniv-seconds'),

    anniversaryTitle: document.getElementById('anniversary-title'), // Target the H2

    // anniversaryDateText element removed

};



let lastTime = {};



// Helper function to get the ordinal suffix (st, nd, rd, th) with a space

function getOrdinalSuffix(n) {

    if (n === 11 || n === 12 || n === 13) {

        return ' th';

    }

    const lastDigit = n % 10;

    switch (lastDigit) {

        case 1: return ' st';

        case 2: return ' nd';

        case 3: return ' rd';

        default: return ' th';

    }

}



function updateAnniversaryText(nextAnniversaryDate) {

    const startYear = anniversaryDate.getFullYear();

    const targetYear = nextAnniversaryDate.getFullYear(); 

    

    // Calculate which anniversary number this date represents

    const anniversaryNumber = targetYear - startYear;



    if (anniversaryNumber < 1) {

        // If before the first anniversary

        elements.anniversaryTitle.textContent = "Counting down to our 1 st Anniversary... 🥹✨";

    } else {

        const ordinal = getOrdinalSuffix(anniversaryNumber);

        elements.anniversaryTitle.textContent = `Our ${anniversaryNumber}${ordinal} Anniversary is in... 🥹✨`;

    }

}





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

    let nextAnniversary = new Date(now.getFullYear(), ANNIVERSARY_MONTH, ANNIVERSARY_DAY, ANNIVERSARY_HOUR, ANNIVERSARY_MINUTE, ANNIVERSARY_SECOND);

    

    // Logic to determine if we passed the anniversary this year

    const annivInCurrentYear = new Date(now.getFullYear(), ANNIVERSARY_MONTH, ANNIVERSARY_DAY, ANNIVERSARY_HOUR, ANNIVERSARY_MINUTE, ANNIVERSARY_SECOND);

    

    if (now.getTime() >= annivInCurrentYear.getTime()) {

        // If passed, set it for next year

        nextAnniversary = new Date(now.getFullYear() + 1, ANNIVERSARY_MONTH, ANNIVERSARY_DAY, ANNIVERSARY_HOUR, ANNIVERSARY_MINUTE, ANNIVERSARY_SECOND);

    } else {

        // Otherwise, use this year's date

        nextAnniversary = annivInCurrentYear;

    }



    // Update the dynamic title text

    updateAnniversaryText(nextAnniversary);

    

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



// Optimization: We still use setInterval for the clock update (which is once per second) 

// but the canvas animation runs using requestAnimationFrame, which is smooth.

setInterval(updateTimer, 998); 

updateTimer();



// --- 2. PET NAME ANIMATION ---



const petNames = [

    "My Babyyy... 😋", "My Wifeyyy... 😘", "My Honeyyyy... 💕", "My Forever... ♾️",

    "My Kuchu Puchu... 🥰", "My Sweetheart... 💖", "My Soan Papdi... 💝", "My Darlinggg... 💘",

    "My Everything... 🤌🏼", "My Bestfriend... ", "My FAMILY... 💞"

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

}, 3000); // Change every 3 seconds





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

        this.vy = Math.random() * 0.1 - 0.05; 

        

        let hue;

        const rand = Math.random();

        if (rand < 0.33) { // Pinkish

            hue = Math.random() * (350 - 320) + 320; 

        } else if (rand < 0.66) { // Purplish

            hue = Math.random() * (280 - 250) + 250; 

        } else { // Violet

            hue = Math.random() * (270 - 240) + 240; 

        }



        this.color = `hsla(${hue}, 80%, 70%, 0.15)`; 

        this.width = Math.random() * width;

        this.amplitude = Math.random() * 50 + 20; 

        this.frequency = Math.random() * 0.01 + 0.005; 

        this.phase = Math.random() * Math.PI * 2;

        this.lineWidth = Math.random() * 1.5 + 0.5; // Reduced max width slightly for better performance

    }

    update() {

        // Slightly increased speed factor for a smoother appearance

        this.phase += 0.01; 

        this.y += this.vy;

        if (this.y < 0 || this.y > height) {

            this.init();

        }

    }

    draw() {

        ctx.beginPath();

        

        // Set glow effect for each ribbon

        ctx.shadowBlur = 12; 

        ctx.shadowColor = `hsla(${this.color.split('(')[1].split(',')[0]}, 100%, 80%, 0.8)`; 



        ctx.strokeStyle = this.color;

        ctx.lineWidth = this.lineWidth;



        for (let i = 0; i <= width; i += 7) { 

            const y = this.y + Math.sin(i * this.frequency + this.phase) * this.amplitude;

            ctx.lineTo(i, y);

        }

        ctx.stroke(); 



        ctx.closePath();

        

        // Reset shadow 

        ctx.shadowBlur = 0;

        ctx.shadowColor = 'transparent';



        // Fill with a gradient 

        const gradient = ctx.createLinearGradient(0, 0, 0, height);

        gradient.addColorStop(0, this.color.replace('0.15', '0.08')); 

        gradient.addColorStop(1, 'rgba(12, 10, 36, 0)');

        ctx.fillStyle = gradient;

        ctx.fill();

    }

}



for (let i = 0; i < 20; i++) { 

    ribbons.push(new Ribbon());

}



function animate() {

    // This draws a subtle, nearly transparent layer over the top each frame.

    ctx.fillStyle = 'rgba(12, 10, 36, 0.03)'; 

    ctx.fillRect(0, 0, width, height);

    

    for (const ribbon of ribbons) {

        ribbon.update();

        ribbon.draw();

    }

    // This is the key to smoothness: it tells the browser to schedule the next frame 

    // at the display's refresh rate (up to 120Hz or more).

    requestAnimationFrame(animate); 

}



animate();

