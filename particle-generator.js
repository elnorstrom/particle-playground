export class ParticleGenerator {
    constructor(canvas) {
        /** @type {HTMLElement} */
        this.canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext('2d');

        this._size = 15;
        this._speed = 3;
        this._quantity = 5;
        this._lines = false;
        this._trails = true;
        this._fading = true;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.x = 100;
        this.y = 100;
        this.particlesArray = [];
        this.hue = 0;
        this.animationStopped = false;
        this.animate = this.animate.bind(this);

        this.init();
    }

    set size(value) {
        this._size = value;
    }

    get size() {
        return this._size;
    }

    set speed(value) {
        this._speed = value;
    }

    get speed() {
        return this._speed;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get quantity() {
        return this._quantity;
    }

    set lines(value) {
        this._lines = value;

        if (value) {
            this.quantity = 5;
        }
    }

    get lines() {
        return this._lines;
    }

    set trails(value) {
        this._trails = value;
    }

    get trails() {
        return this._trails;
    }

    set fading(value) {
        this._fading = value;
    }

    get fading() {
        return this._fading;
    }

    init() {
        this.addListeners();
        this.animate();
    }

    addListeners() {
        window.addEventListener('resize', function () {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
        this.canvas.addEventListener('click', (e) => this.addParticles(e));
        this.canvas.addEventListener('mousemove', (e) => this.addParticles(e));
        this.canvas.addEventListener('mousedown', (e) => this.addParticles(e));
        this.canvas.addEventListener(
            'touchstart',
            (e) => this.addParticles(e),
            {
                passive: false,
            }
        );
        this.canvas.addEventListener('touchmove', (e) => this.addParticles(e), {
            passive: false,
        });
    }

    addParticles(event) {
        event.preventDefault();

        this.x = !isNaN(event.x) ? event.x : event.targetTouches[0].clientX;
        this.y = !isNaN(event.y) ? event.y : event.targetTouches[0].clientY;

        for (let i = 0; i < this.quantity; i++) {
            this.particlesArray.push(
                new Particle(
                    this.x,
                    this.y,
                    this.ctx,
                    this.hue,
                    this.size,
                    this.speed
                )
            );
        }

        if (this.animationStopped) {
            requestAnimationFrame(this.animate);
        }

        this.animationStopped = false;
    }

    handleParticles() {
        if (!this.particlesArray.length) {
            this.animationStopped = true;
        }

        for (let i = 0; i < this.particlesArray.length; i++) {
            this.particlesArray[i].update();
            this.particlesArray[i].draw();

            if (this.lines) {
                this.addLines(i);
            }

            if (this.particlesArray[i].size <= 0.3) {
                this.particlesArray.splice(i, 1);
                i--;
            }
        }
    }

    addLines(i) {
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
    }

    animate() {
        if (this.fading) {
            this.ctx.fillStyle = 'rgba(0,0,0,0.02)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        if (!this.trails) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.handleParticles();
        this.hue += 0.5;

        if (!this.animationStopped) {
            requestAnimationFrame(this.animate);
        }
    }

    clearCanvas() {
        this.particlesArray = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class Particle {
    constructor(x, y, ctx, hue, size, speed) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.hue = hue;
        this.size = Math.random() * size + 1;
        this.speedX = Math.random() * speed - speed / 2;
        this.speedY = Math.random() * speed - speed / 2;
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
