import { ParticleGenerator } from './particle-generator.js';

const canvas = document.getElementById('canvas');
const particleGenerator = new ParticleGenerator(canvas);

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

sizeInput.value = particleGenerator.size;
speedInput.value = particleGenerator.speed;
linesCheckbox.checked = particleGenerator.lines;
trailsCheckbox.checked = particleGenerator.trails;
quantityInput.value = particleGenerator.quantity;
quantityInputLabel.innerText = `Particle quantity (${particleGenerator.quantity})`;

sizeInput.oninput = (e) => {
    particleGenerator.size = e.target.value;
};

speedInput.oninput = (e) => {
    particleGenerator.speed = e.target.value;
};

quantityInput.oninput = (e) => {
    quantityInputLabel.innerText = `Particle quantity (${e.target.value})`;
    particleGenerator.quantity = e.target.value;
};

linesCheckbox.onchange = (e) => {
    particleGenerator.lines = linesCheckbox.checked;
    quantityInputLabel.innerText = `Particle quantity (${particleGenerator.quantity})`;

    quantityInput.max = linesCheckbox.checked ? 5 : 50;

    if (linesCheckbox.checked) {
        quantityInput.value = particleGenerator.quantity;
    }
};

clearButton.onclick = (e) => {
    particleGenerator.clearCanvas();
};

trailsCheckbox.onclick = (e) => {
    particleGenerator.trails = trailsCheckbox.checked;
    fadingCheckbox.disabled = !trailsCheckbox.checked;
};

fadingCheckbox.onclick = (e) => {
    particleGenerator.fading = fadingCheckbox.checked;
};

function handleKeyboardClick(e) {
    allInputs.forEach((input) => input.blur());

    if (e.keyCode === 32) {
        particleGenerator.animationStopped = !particleGenerator.animationStopped;

        if (!particleGenerator.animationStopped) {
            particleGenerator.animate();
        }
    }
}
