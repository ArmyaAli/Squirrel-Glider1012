import { BACKGROUND, PLAYER, TREES, DONE_FALLING, GAMEOVER, GAME_SPEED, BUTTON_INFO, GAME_RESET } from "./entities.js";
import { getLeaderboard } from "./leaderboards.js";
import { collisionCheck } from "./collision.js"

//AUDIO
export const audioBackground = new Audio("./assets/song.mp3");
const audioDead = new Audio("./assets/death.mp3");
const audioJump = new Audio("./assets/jump.mp3");
export const audioLevel = new Audio("./assets/levelup.mp3");

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext1 = new AudioContext();
const audioContext2 = new AudioContext();
const audioContext3 = new AudioContext();
const audioContext4 = new AudioContext();

audioBackground.volume = 0.05;
audioDead.volume = 0.05;
audioJump.volume = 0.05;

// pass it into the audio context
const bgTrack = audioContext1.createMediaElementSource(audioBackground);
const deadTrack = audioContext2.createMediaElementSource(audioDead);
const jumpTrack = audioContext3.createMediaElementSource(audioJump);
const levelTrack = audioContext4.createMediaElementSource(audioLevel);

bgTrack.connect(audioContext1.destination);
deadTrack.connect(audioContext2.destination);
jumpTrack.connect(audioContext3.destination);
levelTrack.connect(audioContext4.destination);

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
export let updatedLeaderboard = false;

export const setUpdatedLeaderboard = (bool) => {
    updatedLeaderboard = bool;
}

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
    const toggleMute = document.querySelector(".toggleMute");

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

        if (name.value === "") {
            errorMessage.innerHTML = "Your username may not be empty!"
            return;
        }

        if (name.value.length > 12) {
            errorMessage.innerHTML = "12 characters max for your display name!"
            return;
        }

        audioBackground.play();
        playButton.disabled = true;
        name.disabled = true;
        username = name.value;
        setCurrentState(STATES["PLAYING"]);
        errorMessage.innerHTML = "";
        document.querySelector("#background-layer").focus();
    })

    toggleMute.addEventListener('click', () => {
        if (audioBackground.muted == true && audioDead.muted == true && audioJump.muted == true) {
            audioBackground.muted = false;
            audioDead.muted = false;
            audioJump.muted = false;
            document.getElementById("toggleMute").src = "./assets/play.png";
        } else {
            audioBackground.muted = true;
            audioDead.muted = true;
            audioJump.muted = true;
            document.getElementById("toggleMute").src = "./assets/mute.png";

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

    window.addEventListener('mousemove', (e) => {
        if (currentState !== STATES["GAME_OVER"])
            return;

        const target = e.target;
        const rect = target.getBoundingClientRect();
        const { x, y } = { x: e.clientX - rect.left, y: e.clientY - rect.top };

        if (x >= BUTTON_INFO["replay"].x && x <= BUTTON_INFO["replay"].x + 200) {
            if (y >= BUTTON_INFO["replay"].y + 50 && y <= BUTTON_INFO["replay"].y + 80 + 50) {
                document.body.style.cursor = 'pointer';
                return;
            }
        }

        if (x >= BUTTON_INFO["share"].x && x <= BUTTON_INFO["share"].x + 200) {
            if (y >= BUTTON_INFO["share"].y + 60 && y <= BUTTON_INFO["share"].y + 80 + 60) {
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
            if (y >= BUTTON_INFO["replay"].y + 60 && y <= BUTTON_INFO["replay"].y + 80 + 60) {
                currentState = STATES["INITIAL"];
                score = 0;
                document.querySelector("input.button").disabled = false;
                document.querySelector(".name-input-elm").disabled = false;
                document.querySelector(".name-input-elm").focus();
                updatedLeaderboard = false;
                GAME_RESET();
            }
        }


        if (x >= BUTTON_INFO["share"].x && x <= BUTTON_INFO["share"].x + 200) {
            if (y >= BUTTON_INFO["share"].y + 60 && y <= BUTTON_INFO["share"].y + 80 + 60) {
                window.location.assign(twitterLink);
            }
        }
    });

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
            BACKGROUND.filter();
            return;
        }
        PLAYER.draw();
        TREES.draw();
    }
}

export const Filter = () => {
    BACKGROUND.filter();
}