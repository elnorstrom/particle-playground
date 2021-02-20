import { DrawParticles } from "./draw-particle.js";

const canvas = document.getElementById("canvas");
const particleDrawer = new DrawParticles(canvas);

const sizeInput = document.getElementById("size-input");
const speedInput = document.getElementById("speed-input");
const numberOfParticlesInput = document.getElementById(
    "number-of-particles-input"
);
const connected = document.getElementById("connected-input");
const clearButton = document.getElementById("clear-button");
const trailsCheckbox = document.getElementById("trails");
const fadingCheckbox = document.getElementById("fading");

const allInputs = [
    sizeInput,
    speedInput,
    numberOfParticlesInput,
    connected,
    clearButton,
];

document.addEventListener("keydown", handleKeyboardClick);

sizeInput.value = particleDrawer.size;
speedInput.value = particleDrawer.speed;
connected.checked = particleDrawer.connectedParticles;
trailsCheckbox.checked = particleDrawer.trails;
numberOfParticlesInput.value = particleDrawer.numberOfParticles;

sizeInput.oninput = (e) => {
    particleDrawer.size = e.target.value;
};

speedInput.oninput = (e) => {
    particleDrawer.speed = e.target.value;
};

numberOfParticlesInput.oninput = (e) => {
    particleDrawer.numberOfParticles = e.target.value;
};

connected.onchange = (e) => {
    particleDrawer.connectedParticles = connected.checked;

    if (connected.checked) {
        numberOfParticlesInput.value = particleDrawer.numberOfParticles;
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
