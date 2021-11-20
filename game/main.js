import { Init, currentState, Update, Draw, Filter, STATES, username, setPrevTime, setDeltaTime, prevTime, score} from './lifecycle.js';
import { sendScore } from './leaderboards.js';

Init();

let currentTime = Date.now();
setPrevTime(currentTime);

let UPDATED_LEADERBOARD = false;

const gameLoop = () => {
    setPrevTime(currentTime);
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
            if (!UPDATED_LEADERBOARD) {
                sendScore(username, Math.round(score));
                UPDATED_LEADERBOARD = true;
            }
            Update();
            Draw();
            break;
    }
    currentTime = Date.now();
    setDeltaTime(currentTime - prevTime);
    window.requestAnimationFrame(gameLoop);
}

gameLoop();