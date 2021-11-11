import { setCurrentState, STATES, deltaTime, prevTime } from "./lifecycle.js";

// CANVAS 
const playercanvas = document.getElementById('player-layer');
const bgcanvas = document.getElementById('background-layer');
const treescanvas = document.getElementById("trees-layer");

const playerctx = playercanvas.getContext('2d');
const bgctx = bgcanvas.getContext('2d');
const treectx = treescanvas.getContext('2d');

// GLOBALS
const MAX_WIDTH = 800;
const MAX_HEIGHT = 400;
const NUM_TREES = 3;
let SCORE = 0;

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
        this.mass = 1;
        this.squrrilSprite = [new Image(), new Image(), new Image()];
        this.squrril = {
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
        // set the squrril images
        this.squrril[0].image.src = this.squrril[0].src;
        this.squrril[1].image.src = this.squrril[1].src;
        this.squrril[2].image.src = this.squrril[2].src;
    }

    draw() {
        playerctx.font = '48px serif';
        playerctx.fillText(`Score: ${SCORE}`, 16, 48, 200);
        playerctx.fillStyle = "#00FF49";
        playerctx.drawImage(this.squrril[this.currentState].image, this.x, this.y, 75, 75);

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

        SCORE = Math.floor((Math.round(this.deltaTimeScore / deltaTime) / (1 / (deltaTime * 0.001))) * (deltaTime * 160 * 0.001));

        if (this.y <= playercanvas.height - 75) {
            this.deltaTime += deltaTime;
            this.y += this.g * (this.deltaTime * this.deltaTime) * 0.00001;
        }

        if (this.y >= (playercanvas.height - 75))
            setCurrentState(STATES["GAME_OVER"]);

        if (this.y <= 0)
            setCurrentState(STATES["GAME_OVER"]);

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
        this.treeOffsets = [
            this.heightOffset(),
            this.heightOffset(),
            this.heightOffset(),
            this.heightOffset(),
            this.heightOffset(),
            this.heightOffset()
        ];
    }

    heightOffset() {
        return Math.floor(Math.random() * (50 - -(50) + 1) + (-50));
    }

    update() {
        this.x -= (deltaTime / 4);
        if (this.x <= -(2 * MAX_WIDTH)) {
            this.x = -MAX_WIDTH;
            this.treeOffsets = [
                this.treeOffsets[3],
                this.treeOffsets[4],
                this.treeOffsets[5],
                this.heightOffset(),
                this.heightOffset(),
                this.heightOffset()
            ];
        }
    }

    draw() {
        treectx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

        for (let i = 0; i < 2 * NUM_TREES; i++) {
            treectx.drawImage(this.imageBranch, this.x + MAX_WIDTH + this.xOffset * i, 0 - this.gap / 2 + this.treeOffsets[i], this.width, this.heightBranch);
            treectx.drawImage(this.imageTrunk, this.x + MAX_WIDTH + this.xOffset * i, MAX_HEIGHT - this.heightTrunk + this.gap / 2 + this.treeOffsets[i], this.width, this.heightTrunk);
        }
    }
}

export const BACKGROUND = new ScrollingBackground();
export const PLAYER = new Player();
export const TREES = new Trees();