import { BACKGROUND, PLAYER, TREES, DONE_FALLING, GAMEOVER, GAME_SPEED, BUTTON_INFO } from "./entities.js";
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
    score += (1 * deltaTime) / (75 * GAME_SPEED);
}

export const Init = () => {
    const playButton = document.querySelector("input.button");
    const name = document.querySelector(".name-input-elm");
    const errorMessage = document.querySelector(".input-error");

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
        if (name.value.includes(" ")) {
            errorMessage.innerHTML = "You may not have spaces in your username!"
            return;
        }

        if (name.value == "") {
            errorMessage.innerHTML = "Your username may not be empty!"
            return;
        }

        playButton.disabled = true;
        name.disabled = true;
        username = name.value;
        setCurrentState(STATES["PLAYING"]);
        errorMessage.innerHTML = "";


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

    window.addEventListener('mousemove', (e) => {
        if (currentState !== STATES["GAME_OVER"])
            return;

        const target = e.target;
        const rect = target.getBoundingClientRect();
        const { x, y } = { x: e.clientX - rect.left, y: e.clientY - rect.top };

        if (x >= BUTTON_INFO["replay"].x && x <= BUTTON_INFO["replay"].x + 200) {
            if (y >= BUTTON_INFO["replay"].y && y <= BUTTON_INFO["replay"].y + 80) {
                document.body.style.cursor = 'pointer';
                return;
            }
        }

        if (x >= BUTTON_INFO["share"].x && x <= BUTTON_INFO["share"].x + 200) {
            if (y >= BUTTON_INFO["share"].y && y <= BUTTON_INFO["share"].y + 80) {
                document.body.style.cursor = 'pointer';
                return;
            }
        }

        document.body.style.cursor = 'default';

    });

    window.addEventListener('click', (e) => {
        if (currentState !== STATES["GAME_OVER"])
            return;

        const target = e.target;
        const rect = target.getBoundingClientRect();
        const { x, y } = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        const message = `PogChamp%20I%20scored%20${Math.round(score)}%20points%20on%20Squrriel%20Glider!`;
        const twitterLink = `https://twitter.com/intent/tweet?text=${message}`;

        if (x >= BUTTON_INFO["replay"].x && x <= BUTTON_INFO["replay"].x + 200) {
            if (y >= BUTTON_INFO["replay"].y && y <= BUTTON_INFO["replay"].y + 80) {
                window.location.reload();
            }
        }


        if (x >= BUTTON_INFO["share"].x && x <= BUTTON_INFO["share"].x + 200) {
            if (y >= BUTTON_INFO["share"].y && y <= BUTTON_INFO["share"].y + 80) {
                window.location.assign(twitterLink);
            }
        }
    });

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