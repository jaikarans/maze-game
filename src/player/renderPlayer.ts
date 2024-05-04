import { Maze } from "../maze/maze";
import { Path, Player } from "./player";

export const renderPlayer = (player: Player, maze: Maze, ctx: CanvasRenderingContext2D) => {
    let cx = player.w * player.x + player.w/2;
    let cy = player.h * player.y + player.h/2;

    ctx.fillStyle = player.playerColor;
    ctx.beginPath();
    ctx.arc(cx, cy, player.w/3, 0, 2 * Math.PI, false);
    ctx.fill();

}

