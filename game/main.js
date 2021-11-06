import { Init, CURRENT_STATE, Update, Draw, Filter } from './lifecycle.js';

Init();

const gameLoop = () => {
    switch (CURRENT_STATE) {
        case "INITIAL":
            Filter();
            Draw();
            console.log(CURRENT_STATE)
            break;
        case "PLAYING":
            Update();
            Draw();
            console.log(CURRENT_STATE)
            break;
        case "GAME_OVER":
            break;
    }
    window.requestAnimationFrame(gameLoop);
}

gameLoop();