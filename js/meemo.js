const meemoSVG = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" id="meemoSvg">
    <!-- Ears -->
    <path d="M40,100 L40,40 L90,60 Z" fill="var(--burgundy)" stroke="var(--black)" stroke-width="4" stroke-linejoin="round"/>
    <path d="M160,100 L160,40 L110,60 Z" fill="var(--burgundy)" stroke="var(--black)" stroke-width="4" stroke-linejoin="round"/>
    <!-- Face -->
    <circle cx="100" cy="110" r="70" fill="var(--cream)" stroke="var(--black)" stroke-width="4"/>
    <!-- Eyes -->
    <ellipse cx="75" cy="100" rx="8" ry="12" fill="var(--black)" class="meemo-eye" id="eyeL"/>
    <ellipse cx="125" cy="100" rx="8" ry="12" fill="var(--black)" class="meemo-eye" id="eyeR"/>
    <!-- Nose -->
    <polygon points="95,115 105,115 100,122" fill="var(--burgundy)"/>
    <!-- Mouth -->
    <path d="M90,125 Q100,135 110,125" fill="none" stroke="var(--black)" stroke-width="3" id="meemoMouth"/>
    <!-- Whiskers -->
    <line x1="20" y1="100" x2="40" y2="105" stroke="var(--black)" stroke-width="2"/>
    <line x1="15" y1="115" x2="40" y2="115" stroke="var(--black)" stroke-width="2"/>
    <line x1="180" y1="100" x2="160" y2="105" stroke="var(--black)" stroke-width="2"/>
    <line x1="185" y1="115" x2="160" y2="115" stroke="var(--black)" stroke-width="2"/>
</svg>
<style>
    @keyframes blink { 0%, 96%, 98% { transform: scaleY(1); } 97% { transform: scaleY(0.1); } }
    .meemo-eye { transform-origin: center; animation: blink 4s infinite; }
    .talking #meemoMouth { d: path("M85,125 Q100,145 115,125"); fill: var(--burgundy); }
    .warning #eyeL, .warning #eyeR { rx: 10; ry: 10; }
    .warning #meemoMouth { d: path("M90,130 Q100,120 110,130"); }
    .happy #meemoMouth { d: path("M80,120 Q100,150 120,120"); }
</style>
`;

function renderMeemo() {
    document.getElementById('meemoContainer').innerHTML = meemoSVG;
}

function setMeemoState(state, messageText) {
    const svg = document.getElementById('meemoSvg');
    const msgBox = document.getElementById('meemoMessage');
    
    svg.className = ''; // reset class
    if (state) svg.classList.add(state);
    
    msgBox.innerText = messageText;
}
