import { Init, currentState, Update, Draw, Filter, STATES, username } from './lifecycle.js';
import { sendScore } from './leaderboards.js';

Init();

const gameLoop = () => {
    switch (currentState) {
        case STATES["INITIAL"]:
            Filter();
            Draw();
            break;
        case STATES["PLAYING"]:
            Update();
            Draw();
            break;
        case STATES["PAUSE"]:
            Filter();
            Draw();
            break;
        case STATES["GAME_OVER"]:
            break;
    }
    window.requestAnimationFrame(gameLoop);
}

gameLoop();