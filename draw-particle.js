export class DrawParticles {
    constructor(canvas) {
        /** @type {HTMLElement} */
        this.canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext("2d");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.x = 100;
        this.y = 100;
        this.particlesArray = [];
        this.hue = 0;
        this.isIdle = false;
        this.animate = this.animate.bind(this);

        this.init();
    }

    init() {
        this.addListeners();
        this.animate();
    }

    addListeners() {
        window.addEventListener("resize", function () {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
        this.canvas.addEventListener("click", (e) => this.addParticles(e));
        this.canvas.addEventListener("mousemove", (e) => this.addParticles(e));
        this.canvas.addEventListener("touchmove", (e) => this.addParticles(e));
    }

    addParticles(event) {
        this.x = !isNaN(event.x) ? event.x : event.targetTouches[0].clientX;
        this.y = !isNaN(event.y) ? event.y : event.targetTouches[0].clientY;

        for (let i = 0; i < 5; i++) {
            if (this.particlesArray.length < 200) {
                this.particlesArray.push(
                    new Particle(this.x, this.y, this.ctx, this.hue, this.size)
                );
            }
        }

        if (this.isIdle) {
            requestAnimationFrame(this.animate);
        }

        this.isIdle = false;
    }

    handleParticles() {
        if (!this.particlesArray.length) {
            this.isIdle = true;
        }

        for (let i = 0; i < this.particlesArray.length; i++) {
            this.particlesArray[i].update();
            this.particlesArray[i].draw();

            for (let j = i; j < this.particlesArray.length; j++) {
                const dx = this.particlesArray[i].x - this.particlesArray[j].x;
                const dy = this.particlesArray[i].y - this.particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.particlesArray[i].color;
                    this.ctx.lineWidth = 0.2;
                    this.ctx.moveTo(
                        this.particlesArray[i].x,
                        this.particlesArray[i].y
                    );
                    this.ctx.lineTo(
                        this.particlesArray[j].x,
                        this.particlesArray[j].y
                    );
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            }

            if (this.particlesArray[i].size <= 0.3) {
                this.particlesArray.splice(i, 1);
                i--;
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.handleParticles();
        this.hue += 0.5;

        if (!this.isIdle) {
            requestAnimationFrame(this.animate);
        }
    }
}

class Particle {
    constructor(x, y, ctx, hue, size) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.hue = hue;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${this.hue}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
