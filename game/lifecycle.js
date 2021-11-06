import { SCROLLING_BACKGROUND } from "./entities.js";

const GAME_STATES = {
    0: "INITIAL",
    1: "PLAYING",
    2: "GAME_OVER"
};

export let CURRENT_STATE = "INITIAL";

export const Init = () => {
    const playButton = document.querySelector("input.button");
    const name = document.querySelector(".name-input-elm");

    name.addEventListener('keypress', (e) => {
        console.log(e.key);
        if (e.key === "Enter") {
            playButton.click();
        }
    })

    playButton.addEventListener('click', () => {
        if (name.value != "") {
            playButton.disabled = true;
            name.disabled = true;
            CURRENT_STATE = GAME_STATES[1];
        }
    })

    // The play event click will trigger a game state change if player has eneterd their name
    // it will grab the name from the input textbox
}

export const Update = () => {
    SCROLLING_BACKGROUND.update();
}

export const Draw = () => {
    SCROLLING_BACKGROUND.draw();
}

export const Filter = () => {
    SCROLLING_BACKGROUND.filter();
}