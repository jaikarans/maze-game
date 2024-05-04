import { Player } from "../player/player";
import { Cell } from "./cell";
import { Maze } from "./maze";
import { renderMazePath } from "./mazeBoundaryRender";
import { reduceAlpha } from "./reduceAlpha";

export const drawCellBoundary = (cell: Cell, maze: Maze, ctx: CanvasRenderingContext2D) => {
    let h = maze.hCell;
    let w = maze.wCell;
    ctx.strokeStyle = maze.wallColor;
    ctx.lineCap = 'round'
    ctx.lineWidth = maze.wallLineWidth;

    if (!cell.isTopOpen) {
        ctx.beginPath();
        ctx.moveTo(cell.x * w, cell.y * h);
        ctx.lineTo(cell.x * w + w, cell.y * h);
        ctx.stroke();
        ctx.closePath();

    }

    if (!cell.isRightOpen) {
        ctx.beginPath();
        ctx.moveTo(cell.x * w + w, cell.y * h);
        ctx.lineTo(cell.x * w + w, cell.y * h + h);
        ctx.stroke();
        ctx.closePath();
    }

    // also redering visited cell shadow 
    maze.ctx.save();
    maze.ctx.fillStyle = maze.playerColor;
    maze.ctx.globalAlpha = cell.alpha
    cell.alpha = cell.alpha;
    maze.ctx.fillRect(cell.x * maze.wCell + (2*maze.wallLineWidth), cell.y * maze.hCell + (2*maze.wallLineWidth), maze.wCell - (maze.wallLineWidth * 4), maze.hCell - (maze.wallLineWidth * 4));
    maze.ctx.restore();
}

export const highlightVisitedCells = (maze: Maze, player: Player) => {
    console.log('highlight ');
    if(!player.isPlayerAnimating){

        maze.ctx.clearRect(0, 0, maze.ctx.canvas.width, maze.ctx.canvas.height)
        renderMazePath(maze);
    
        player.drawPlayer(player.x, player.y);
        player.drawEnemy();

        
        maze.cells.forEach(cellArray => {
            cellArray.forEach(cell => {
                maze.ctx.save();
                maze.ctx.fillStyle = maze.playerColor;
                maze.ctx.globalAlpha = cell.alpha
                console.log('highilight cell aplpha ',cell.alpha)
                maze.ctx.fillRect(cell.x * maze.wCell + (maze.wallLineWidth), cell.y * maze.hCell + (maze.wallLineWidth), maze.wCell - (maze.wallLineWidth * 2), maze.hCell - (maze.wallLineWidth * 2));
                maze.ctx.restore();
            })
        })
        

        if(player.isPlayerAnimating) {
            return;
        }

        requestAnimationFrame(() => {
            highlightVisitedCells(maze, player);
        })
        
                
    }
    if(player.isPlayerAnimating) {
        console.log('highlighting exit... ')
        return;
    }


}