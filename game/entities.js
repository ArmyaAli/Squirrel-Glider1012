import { setCurrentState, STATES, deltaTime, prevTime, score } from "./lifecycle.js";

// CANVAS 
const playercanvas = document.getElementById('player-layer');
const bgcanvas = document.getElementById('background-layer');
const treescanvas = document.getElementById("trees-layer");

const playerctx = playercanvas.getContext('2d');
const bgctx = bgcanvas.getContext('2d');
const treectx = treescanvas.getContext('2d');

// GLOBALS
export const MAX_WIDTH = 800;
export const MAX_HEIGHT = 400;
export const GAME_SPEED = 3; // smaller = faster
export let DONE_FALLING = false;
const NUM_TREES = 2;

// all our canvases should be equal size
playercanvas.width = bgcanvas.width = treescanvas.width = 800;
playercanvas.height = bgcanvas.height = treescanvas.height = 400;


class Player {
    constructor() {
        this.x = MAX_WIDTH / 3;
        this.y = MAX_HEIGHT / 2;
        this.g = 0.1;
        this.deltaTime = 0;
        this.deltaTimeScore = 0;
        this.width = 75;
        this.height = 75;
        this.position = { x: this.x, y: this.y };
        this.mass = 1;
        this.squirrelSprite = [new Image(), new Image(), new Image()];
        this.squirrel = {
            0: {
                image: new Image(),
                src: "./assets/sprite/sqFall.png"
            },
            1: {
                image: new Image(),
                src: "./assets/sprite/sqJump.png"
            },
            2: {
                image: new Image(),
                src: "./assets/sprite/sqDead.png"
            }
        }
        this.image = new Image();
        this.states = {
            "Falling": 0,
            "Jumping": 1,
            "Dead": 2
        };
        this.currentState = this.states["Falling"];
        // set the squirrel images
        this.squirrel[0].image.src = this.squirrel[0].src;
        this.squirrel[1].image.src = this.squirrel[1].src;
        this.squirrel[2].image.src = this.squirrel[2].src;
    }

    draw() {
        playerctx.font = '32px sans-serif';
        playerctx.fillText(`Score: ${Math.round(score)}`, 16, 48, 512);
        playerctx.fillStyle = "#00FF49";
        playerctx.drawImage(this.squirrel[this.currentState].image, this.x, this.y, this.width, this.height);
    }

    setState(keyEvent) {
        if (keyEvent === 'Keydown')
            this.currentState = this.states["Jumping"];
        else
            this.currentState = this.states["Falling"];

    }

    jump() {
        this.deltaTime = 0;
        this.y -= 20;
    }

    update() {
        // erase before we redraw
        playerctx.clearRect(0, 0, playercanvas.width, playercanvas.height);
        this.deltaTimeScore += deltaTime;
        // update the player score too
        // for every frame we can update the score. The average
        // setTimeout(() => {
        //     SCORE = Math.floor((this.deltaTimeScore / deltaTime) / 1000);
        // }, deltaTime * 320);

        // SCORE = Math.floor((Math.round(this.deltaTimeScore / deltaTime) / (1 / (deltaTime * 0.001))) * (deltaTime * 160 * 0.001));
        if (this.currentState === this.states["Dead"]) {
            this.deltaTime += deltaTime;
            this.y += this.g * (this.deltaTime * this.deltaTime) * 0.00001;
            this.x = MAX_WIDTH / 3 - 50;

            if (this.y >= MAX_HEIGHT) {
                setTimeout(() => {
                    DONE_FALLING = true;
                }, 600);
            }
            return;
        }

        if (this.y <= playercanvas.height - 75) {
            this.deltaTime += deltaTime;
            this.y += this.g * (this.deltaTime * this.deltaTime) * 0.00001;
            this.position.y = this.y;
        }
    }
}

class ScrollingBackground {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.bgx = 0;
        this.bgy = 0;
        this.image = new Image();
        this.image.src = "./assets/greenbg.png";
    }

    update() {
        bgctx.filter = 'none';
        this.bgx--;

        if (this.bgx + playercanvas.width <= 0)
            this.bgx = 0;

    }

    draw() {
        bgctx.drawImage(this.image, this.bgx, this.bgy);
        bgctx.drawImage(this.image, this.bgx + bgcanvas.width, this.bgy);
    }

    filter() {
        bgctx.filter = 'blur(5px)';
        bgctx.drawImage(this.image, this.bgx, this.bgy);
    }
}

class Trees {
    constructor() {
        this.width = 75;
        this.gap = 100;
        this.xOffset = MAX_WIDTH / NUM_TREES;
        this.heightTrunk = MAX_HEIGHT / 2;
        this.heightBranch = MAX_HEIGHT / 2;
        this.x = 0;
        this.imageBranch = new Image();
        this.imageTrunk = new Image();
        this.imageBranch.src = "./assets/branch.png";
        this.imageTrunk.src = "./assets/trunk.png";
        this.position = [];
        this.treeOffsets = [];
        for (let i = 0; i < 2 * NUM_TREES; i++) {
            this.treeOffsets.push(this.heightOffset());
        }
    }

    heightOffset() {
        return Math.floor(Math.random() * (50 - -(50) + 1) + (-50));
    }

    update() {

        this.x -= (deltaTime / GAME_SPEED);  
        if (this.x <= -(2 * MAX_WIDTH)) {
            this.x = -MAX_WIDTH;

            for (let i = 0; i < 2 * NUM_TREES; i++) {
                if (i < NUM_TREES) {
                    this.treeOffsets.splice(i, 1, this.treeOffsets[NUM_TREES + i]);
                } else {
                    this.treeOffsets.splice(i, 1, this.heightOffset());
                }
            }
        }
        this.position = [];
    }

    draw() {
        treectx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

        for (let i = 0; i < 2 * NUM_TREES; i++) {
            const xBranch = this.x + MAX_WIDTH + this.xOffset * i;
            const yBranch = 0 - this.gap / 2 + this.treeOffsets[i];

            const xTrunk = this.x + MAX_WIDTH + this.xOffset * i;
            const yTrunk = MAX_HEIGHT - this.heightTrunk + this.gap / 2 + this.treeOffsets[i];

            treectx.drawImage(this.imageBranch, xBranch, yBranch, this.width, this.heightBranch);
            treectx.drawImage(this.imageTrunk, xTrunk, yTrunk, this.width, this.heightTrunk);

            this.position.push({ xB: xBranch, yB: yBranch, xT: xTrunk, yT: yTrunk });
        }
    }
}

class gameOver {
    constructor() {
        this.message = "Game Over";
    }

    update() {

    }

    draw() {
        playerctx.font = '72px sans-serif';
        playerctx.clearRect(0, 0, playercanvas.width, playercanvas.height);
        playerctx.fillText(this.message, MAX_WIDTH / 2 - playerctx.measureText(this.message).width / 2, MAX_HEIGHT / 2);
    }
}

export const BACKGROUND = new ScrollingBackground();
export const PLAYER = new Player();
export const TREES = new Trees();
export const GAMEOVER = new gameOver();