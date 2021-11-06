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

// class Player {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.mass = 1;
//     }

//     draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, 50, 0, Math.PI * 2, true); // Outer circle
//         ctx.stroke();

//     }

//     update() {
//         // erase before we redraw
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         if (this.y <= canvas.height - 50) {
//             this.y += 2;
//             console.log(canvas.height + 50)
//         }
//     }
// }
// let p = new Player(canvas.width / 2 - 120, canvas.height / 2);
// let bg = new ScrollingBackground();

// window.addEventListener('keypress', () => {
//     p.y -= 100;
// })

class ScrollingBackground {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.bgx = 0;
        this.bgy = 0;
    }

    update() {
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
        bgctx.filter = 'contrast(1.4) sepia(1) drop-shadow(-9px 9px 3px #e81)';
        bgctx.drawImage(img, this.bgx, this.bgy);
    }
}

export const SCROLLING_BACKGROUND = new ScrollingBackground();