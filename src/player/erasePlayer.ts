import { Maze } from "../maze/maze";
import { renderMazePath } from "../maze/mazeBoundaryRender";
import { Path, Player } from "./player";

// export const erasePlayerAndPath = (player: Player, maze: Maze, ctx: CanvasRenderingContext2D) => {
//     let cx = player.w * player.x;
//     let cy = player.h * player.y;

//     // if (!player.playerPath)

//     ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
//     renderMazePath(maze);

//     ctx.fillStyle = maze.surfaceColor;

//     let p: Path = player.playerPath[0][0];

//     let x: number;
//     let y: number;
//     let w: number;
//     let h: number;

//     ctx.fillStyle = 'blue'

//     player.playerPath.forEach((paths: any[]) => {
//         paths.forEach(path => {
            
            
//             w = h = x = y = 0;
//             // path line is horizontal
//             if (p.x != path.x && p.x < path.x) {
//                 w = path.x * player.w + player.w/2 - p.x * player.w;
//                 h = player.h/2;
                
//                 x = player.w * p.x + player.w/3;
//                 y = player.h * p.y + player.h/3;
//             }
//             else if (p.x != path.x && p.x > path.x){
//                 w = p.x * player.w + player.w/2 - path.x * player.w;
//                 h = player.h/2;

//                 x = player.w * path.x + player.w/3;
//                 y = player.h * path.y + player.h/3;
//             }

//             // path line is vertical
//             if (p.y != path.y && p.y < path.y) {
//                 h = path.y * player.h - p.y * player.h;
//                 w = player.w/2;

//                 x = player.w * p.x + player.w/3;
//                 y = player.h * p.y + player.h/3;
//             }
//             else if (p.y != path.y && p.y > path.y) {
//                 h = p.y * player.h - path.y * player.h;
//                 w = player.w/2;

//                 x = player.w * path.x + player.w/3;
//                 y = player.h * path.y + player.h/3;
//             }

//             console.log('erase player: (',p.x,' ',p.y,') (',path.x,' ',path.y,') w ',w,' h ',h)
//             console.log('erase playerpaths.lenght ',player.playerPath, player.playerPath)

//             ctx.clearRect(x, y, w, h);
//             p = path;
//         })
//     })
//     // ctx.beginPath();
//     // ctx.arc(cx, cy, player.w/3, 0, 2 * Math.PI, false);
//     // ctx.fill();
//     // ctx.clearRect(cx, cy, player.w, player.h);
// }
