import { BACKGROUND, PLAYER, TREES } from "./entities.js";
import { getLeaderboard } from "./leaderboards.js";

export const STATES = {
    "INITIAL": 0,
    "PLAYING": 1,
    "PAUSE": 2,
    "GAME_OVER": 3
};

export let username = "";
export let score = 0;
export let deltaTime = 0;
export let prevTime = 0;
export let currentState = 0;

export const setCurrentState = (state) => {
    currentState = state;
}

export const setDeltaTime = (t) => {
    deltaTime = t;
}

export const setPrevTime = (t) => {
    prevTime = t;
}

export const Init = () => {
    const playButton = document.querySelector("input.button");
    const name = document.querySelector(".name-input-elm");

    name.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            playButton.click();
        }
    })

    playButton.addEventListener('click', () => {
        if (name.value != "") {
            playButton.disabled = true;
            name.disabled = true;
            username = name.value;
            setCurrentState(STATES["PLAYING"]);
        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === " ") {

            if (currentState === STATES["PLAYING"]) {
                PLAYER.jump();
                PLAYER.setState('Keydown');
            }

        } else if (e.key === "p" && currentState == STATES["PLAYING"]) {
            setCurrentState(STATES["PAUSE"]);
        } else if (e.key === "p" && currentState == STATES["PAUSE"]) {
            setCurrentState(STATES["PLAYING"]);
        }
    })

    window.addEventListener('keyup', (e) => {

        if (currentState === STATES["PLAYING"]) {
            PLAYER.setState('Keyup');
        }
    })

    // The play event click will trigger a game state change if player has eneterd their name
    // it will grab the name from the input textbox
    getLeaderboard();
}

export const Update = () => {
    BACKGROUND.update();

    if (currentState === STATES["PLAYING"]) {
        PLAYER.update();
        TREES.update();
    }
}

export const Draw = () => {
    BACKGROUND.draw();

    if (currentState === STATES["PLAYING"]) {
        PLAYER.draw();
        TREES.draw();
    }
}

export const Filter = () => {
    BACKGROUND.filter();
}