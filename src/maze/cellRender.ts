import { Cell } from "./cell";
import { Maze } from "./maze";

export const drawCellBoundary = (cell: Cell, maze: Maze, ctx: CanvasRenderingContext2D) => {
    let h = maze.hCell;
    let w = maze.wCell;
    ctx.strokeStyle = maze.wallColor;
    ctx.lineCap = 'round'
    ctx.lineWidth = 4;

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
    
}