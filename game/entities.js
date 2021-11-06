import { SET_CURRENT_STATE, GAME_STATES } from "./lifecycle.js";

// CANVAS 
const bg = document.getElementById('background-layer');
const canvas = document.getElementById('player-layer');
const img = document.getElementById("trees-layer");

const ctx = canvas.getContext('2d');
const bgctx = bg.getContext('2d');
const imgctx = img.getContext('2d');

// GLOBALS
const MAX_WIDTH = canvas.width = bg.width = img.width = 800;
const MAX_HEIGHT = canvas.height = bg.height = img.height = 400;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mass = 1;
        this.image = new Image();
        this.image.src = "./assets/sprite/Jump_(1).png";

        // Load an image of intrinsic size 300x227 in CSS pixels
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, 75, 75);
    }

    jump() {
        this.y -= 50;
    }

    update() {
        // erase before we redraw
        console.log(canvas.height, canvas.width)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.y <= canvas.height - 75) {
            this.y += 0.5;
        }

        if (this.y >= (canvas.height - 75))
            SET_CURRENT_STATE(GAME_STATES["GAME_OVER"]);

        if (this.y <= 0)
            SET_CURRENT_STATE(GAME_STATES["GAME_OVER"]);

    }
}

class ScrollingBackground {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.bgx = 0;
        this.bgy = 0;
    }

    update() {
        bgctx.filter = 'none';
        this.bgx--;

        if (this.bgx + canvas.width <= 0)
            this.bgx = 0;

    }

    draw() {
        const img = document.getElementById('image');
        bgctx.drawImage(img, this.bgx, this.bgy);
        bgctx.drawImage(img, this.bgx + canvas.width, this.bgy);
    }

    filter() {
        bgctx.filter = 'blur(5px)';
        bgctx.drawImage(img, this.bgx, this.bgy);
    }
}

export const SCROLLING_BACKGROUND = new ScrollingBackground();
export const PLAYER = new Player(MAX_WIDTH / 3, MAX_HEIGHT / 2);