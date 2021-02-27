import { DrawParticles } from './draw-particle.js';

const canvas = document.getElementById('canvas');
const particleDrawer = new DrawParticles(canvas);

const sizeInput = document.getElementById('size-input');
const speedInput = document.getElementById('speed-input');
const quantityInput = document.getElementById('quantity-input');
const linesCheckbox = document.getElementById('lines-input');
const clearButton = document.getElementById('clear-button');
const trailsCheckbox = document.getElementById('trails');
const fadingCheckbox = document.getElementById('fading');
const quantityInputLabel = document.getElementById('quantity-input-label');
const settings = document.getElementById('settings');
const settingsToggle = document.getElementById('settings-toggle');

const allInputs = [
    sizeInput,
    speedInput,
    quantityInput,
    linesCheckbox,
    clearButton,
    trailsCheckbox,
    fadingCheckbox,
    settingsToggle,
];

document.addEventListener('keydown', handleKeyboardClick);
settingsToggle.addEventListener('click', toggleSettings);

function toggleSettings(e) {
    e.preventDefault();
    settingsToggle.blur();
    settings.classList.toggle('settings--hide');
}

sizeInput.value = particleDrawer.size;
speedInput.value = particleDrawer.speed;
linesCheckbox.checked = particleDrawer.lines;
trailsCheckbox.checked = particleDrawer.trails;
quantityInput.value = particleDrawer.quantity;
quantityInputLabel.innerText = `Particle quantity (${particleDrawer.quantity})`;

sizeInput.oninput = (e) => {
    particleDrawer.size = e.target.value;
};

speedInput.oninput = (e) => {
    particleDrawer.speed = e.target.value;
};

quantityInput.oninput = (e) => {
    quantityInputLabel.innerText = `Particle quantity (${e.target.value})`;
    particleDrawer.quantity = e.target.value;
};

linesCheckbox.onchange = (e) => {
    particleDrawer.lines = linesCheckbox.checked;
    quantityInputLabel.innerText = `Particle quantity (${particleDrawer.quantity})`;

    quantityInput.max = linesCheckbox.checked ? 5 : 50;

    if (linesCheckbox.checked) {
        quantityInput.value = particleDrawer.quantity;
    }
};

clearButton.onclick = (e) => {
    particleDrawer.clearCanvas();
};

trailsCheckbox.onclick = (e) => {
    particleDrawer.trails = trailsCheckbox.checked;
    fadingCheckbox.disabled = !trailsCheckbox.checked;
};

fadingCheckbox.onclick = (e) => {
    particleDrawer.fading = fadingCheckbox.checked;
};

function handleKeyboardClick(e) {
    allInputs.forEach((input) => input.blur());

    if (e.keyCode === 32) {
        particleDrawer.animationStopped = !particleDrawer.animationStopped;

        if (!particleDrawer.animationStopped) {
            particleDrawer.animate();
        }
    }
}
