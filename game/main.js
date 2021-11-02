const canvas = document.getElementById('canvas');
const background = document.getElementById('canvas-background-layer');

const ctx = canvas.getContext('2d');
const bgctx = background.getContext('2d');
const MAX_WIDTH = canvas.width = background.width = 800;
const MAX_HEIGHT = canvas.height = background.height = 400;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mass = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.stroke();
    }

    update() {
        // erase before we redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.y <= canvas.height - 50) {
            this.y += 2;
            console.log(canvas.height + 50)
        }
    }
}

class ScrollingBackground {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    generateTrees() {
        // each tree will have a random x position and an equal chance of having either a 0 y position or max height y position
        // they will be reflected depending on top of bottom
    }

    update() {
        bgctx.clearRect(0, 0, canvas.width, canvas.height);
        this.x -= 1.1;
        if (this.x <= 0) {
            this.x = MAX_WIDTH;
        }
    }

    draw() {
        bgctx.fillStyle = 'green';
        bgctx.fillRect(this.x + 150, 0, 50, MAX_HEIGHT / 2 - 50);

        bgctx.fillStyle = 'green';
        bgctx.fillRect(this.x, 0, 50, MAX_HEIGHT / 2 - 50);
    }
}

let p = new Player(canvas.width / 2 - 120, canvas.height / 2);
let bg = new ScrollingBackground();

window.addEventListener('keypress', () => {
    p.y -= 100;
})

const gameLoop = () => {
    p.update();
    bg.update();
    p.draw();
    bg.draw();
    window.requestAnimationFrame(gameLoop);
}

gameLoop();