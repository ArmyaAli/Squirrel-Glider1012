import { Init, currentState, Update, Draw, Filter, STATES, username, deltaTime, setPrevTime, setDeltaTime, prevTime } from './lifecycle.js';
import { sendScore } from './leaderboards.js';

Init();

let currentTime = Date.now();
setPrevTime(currentTime);

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
            Update();
            Draw();
            break;
    }
    currentTime = Date.now();
    setDeltaTime(currentTime - prevTime);
    window.requestAnimationFrame(gameLoop);
}

gameLoop();