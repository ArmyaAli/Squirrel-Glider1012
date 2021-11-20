import { BACKGROUND, PLAYER, TREES, DONE_FALLING, GAMEOVER, GAME_SPEED } from "./entities.js";
import { getLeaderboard } from "./leaderboards.js";
import { collisionCheck } from "./collision.js"

//AUDIO
// for legacy browsers
// get the audio element
const audioBackground = new Audio("./assets/song.mp3");
audioBackground.playbackRate = 1.0; 
const audioContext1 = new AudioContext();
const bgTrack = audioContext1.createMediaElementSource(audioBackground);
audioBackground.volume = 0.05;

const audioDead = new Audio("./assets/death.mp3");
const audioJump = new Audio("./assets/jump.mp3");

const audioContext2 = new AudioContext();
const audioContext3 = new AudioContext();

audioDead.volume = 0.1;
audioJump.volume = 0.05;

// pass it into the audio context
const deadTrack = audioContext2.createMediaElementSource(audioDead);
const jumpTrack = audioContext3.createMediaElementSource(audioJump);

bgTrack.connect(audioContext1.destination);
deadTrack.connect(audioContext2.destination);
jumpTrack.connect(audioContext3.destination);

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

export const incrementScore = () => {
    score += (1*deltaTime)/(75 * GAME_SPEED);
}

export const Init = () => {
    const playButton = document.querySelector("input.button");
    const name = document.querySelector(".name-input-elm");

    const audioBackground = new Audio("./assets/song.mp3");
    audioBackground.playbackRate = 1.0; 
    const audioContext1 = new AudioContext();
    const bgTrack = audioContext1.createMediaElementSource(audioBackground);
    audioBackground.volume = 0.05;

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
            audioBackground.play();
            setCurrentState(STATES["PLAYING"]);
        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === " ") {

            if (currentState === STATES["PLAYING"]) {
                audioJump.currentTime = 0;
                audioJump.play();
                PLAYER.jump();
                PLAYER.setState('Keydown');
            }

        } else if (e.key === "p" && currentState == STATES["PLAYING"]) {
            audioBackground.pause();
            setCurrentState(STATES["PAUSE"]);
        } else if (e.key === "p" && currentState == STATES["PAUSE"]) {
            audioBackground.play();
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

    if (currentState === STATES["PLAYING"]) {
        BACKGROUND.update();
        collisionCheck();
        PLAYER.update();
        TREES.update();
    }

    if (currentState === STATES["GAME_OVER"]) {
        if (DONE_FALLING) {
            GAMEOVER.update();
            return;
        }
        audioBackground.pause();
        audioBackground.currentTime = 0;
        audioDead.play();
        PLAYER.update();
    }

    // check collision

}

export const Draw = () => {
    BACKGROUND.draw();

    if (currentState === STATES["PLAYING"]) {
        PLAYER.draw();
        TREES.draw();
    }

    if (currentState === STATES["GAME_OVER"]) {
        if (DONE_FALLING) {
            GAMEOVER.draw();
            return;
        }
        PLAYER.draw();
        TREES.draw();
    }
}

export const Filter = () => {
    BACKGROUND.filter();
}