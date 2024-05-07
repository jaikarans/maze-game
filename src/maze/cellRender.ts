import { Player } from "../player/player";
import { Cell } from "./cell";
import { Maze } from "./maze";
import { renderMazePath } from "./mazeBoundaryRender";
import { reduceAlpha } from "./reduceAlpha";

export const drawCellBoundary = (cell: Cell, maze: Maze, ctx: CanvasRenderingContext2D) => {
    let h = maze.hCell;
    let w = maze.wCell;
    ctx.strokeStyle = maze.wallColor;
    // ctx.lineCap = 'round'
    ctx.lineWidth = maze.wallLineWidth;

    // also redering visited cell shadow 
    maze.ctx.save();
    maze.ctx.fillStyle = maze.playerRecentPathHighlightColor;
    maze.ctx.globalAlpha = cell.alpha
    cell.alpha = cell.alpha;
    maze.ctx.fillRect(cell.x * maze.wCell, cell.y * maze.hCell, maze.wCell , maze.hCell);
    maze.ctx.restore();

    if (!cell.isTopOpen && cellIsNotTopEdge(cell, maze.rows, maze.columns)) {
        ctx.save();
        ctx.shadowColor = maze.objectShadow;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(cell.x * w, cell.y * h);
        ctx.lineTo(cell.x * w + w, cell.y * h);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

    }

    if (!cell.isRightOpen && cellIsNotRightEdge(cell, maze.rows, maze.columns)) {
        ctx.save()
        ctx.shadowColor = maze.objectShadow;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(cell.x * w + w, cell.y * h);
        ctx.lineTo(cell.x * w + w, cell.y * h + h);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    
}

const cellIsNotTopEdge = (cell: Cell, rows: number, columns: number) => {
    
    if (cell.y == 0) {
        return false;
    }
    

    return true;
}

const cellIsNotRightEdge = (cell: Cell, rows: number, columns: number) => {
    
    if (cell.x == rows-1) {
        return false;
    }
    

    return true;
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