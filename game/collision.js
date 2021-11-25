import { TREES, PLAYER, MAX_HEIGHT, GAME_SPEED, decrementGameSpeed } from "./entities.js";
import { setCurrentState, incrementScore, STATES, score, setLevel, levelThreshold } from "./lifecycle.js";

export const collisionCheck = () => {
    const trees = TREES.position;
    const player = PLAYER.position;
    const offset = 20;

    if (trees.length > 0) {
        for (let i = 0; i < trees.length; ++i) {
            if (player.x > trees[i].xT && player.x < trees[i].xT + TREES.width) {
                if (player.y + PLAYER.height > trees[i].yT + offset || player.y < trees[i].yB + TREES.heightBranch - offset) {
                    PLAYER.currentState = PLAYER.states["Dead"];
                    setCurrentState(STATES["GAME_OVER"]);
                } else {
                    incrementScore();
                    if (Math.round(score) % levelThreshold === 0 && Math.round(score) > 0) {
                        setLevel();
                        decrementGameSpeed();
                    }
                }
            }
        }
    }

    if (PLAYER.y >= (MAX_HEIGHT - 75)) {
        PLAYER.currentState = PLAYER.states["Dead"];
        setCurrentState(STATES["GAME_OVER"]);
    }

    if (PLAYER.y <= 0) {
        PLAYER.currentState = PLAYER.states["Dead"];
        setCurrentState(STATES["GAME_OVER"]);
    }
}