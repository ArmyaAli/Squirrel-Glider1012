import { SCROLLING_BACKGROUND, PLAYER } from "./entities.js";
import { getLeaderboard } from "./network.js";

export const GAME_STATES = {
    "INITIAL": 0,
    "PLAYING": 1,
    "PAUSE": 2,
    "GAME_OVER": 3
};

export let CURRENT_STATE = 0;

export const SET_CURRENT_STATE = (state) => {
    CURRENT_STATE = state;
}

export const GET_CURRENT_STATE = () => {
    return state;
}

export const  Init = () => {
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
            SET_CURRENT_STATE(GAME_STATES["PLAYING"]);
        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === " ") {

            if (CURRENT_STATE === GAME_STATES["PLAYING"]) {
                PLAYER.jump();
            }

        } else if (e.key === "p" && CURRENT_STATE == GAME_STATES["PLAYING"]) {
            SET_CURRENT_STATE(GAME_STATES["PAUSE"]);
        } else if (e.key === "p" && CURRENT_STATE == GAME_STATES["PAUSE"]) {
            SET_CURRENT_STATE(GAME_STATES["PLAYING"]);
        }
    })

    // The play event click will trigger a game state change if player has eneterd their name
    // it will grab the name from the input textbox
    getLeaderboard();
}

export const Update = () => {
    SCROLLING_BACKGROUND.update();

    if (CURRENT_STATE === GAME_STATES["PLAYING"]) {
        PLAYER.update();
    }
}

export const Draw = () => {
    SCROLLING_BACKGROUND.draw();

    if (CURRENT_STATE === GAME_STATES["PLAYING"])
        PLAYER.draw();
}

export const Filter = () => {
    SCROLLING_BACKGROUND.filter();
}