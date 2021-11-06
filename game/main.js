import { Init, CURRENT_STATE, Update, Draw, Filter, GAME_STATES } from './lifecycle.js';

Init();

const gameLoop = () => {
    console.log(CURRENT_STATE);
    switch (CURRENT_STATE) {
        case GAME_STATES["INITIAL"]:
            Filter();
            Draw();
            break;
        case GAME_STATES["PLAYING"]:
            Update();
            Draw();
            break;
        case GAME_STATES["PAUSE"]:
            Filter();
            Draw();
            break;
        case GAME_STATES["GAME_OVER"]:
            break;
    }
    window.requestAnimationFrame(gameLoop);
}

gameLoop();