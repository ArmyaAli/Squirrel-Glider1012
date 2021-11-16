import { TREES, PLAYER, SCORE } from "./entities.js";

export const collisionCheck = () => {
    const trees = TREES.position;
    const player = PLAYER.position;
    const offset = 0;
    // console.log("Trees", trees);
    // get the 6 ranges that our player will not be allowed to touch
    if (trees.length > 0) {
        for (let i = 0; i < trees.length; ++i) {
            if (player.x > trees[i].xB && player.x < trees[i].xB + TREES.width + offset) {
                if (player.y > trees[i].yT || player.y < trees[i].yB + TREES.heightBranch - offset) {
                    console.log("GAMEOVER");
                } else {

                }
            }
        }
    }

    // console.log("Player", PLAYER.position);
}