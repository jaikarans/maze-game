import {Cell} from './cell'
import { getAnyUnvisitedNeighbourOf, removeWallBetween } from './cellOperations';
import { generateMazePaths } from './mazeGeneration';
import { drawCellBoundary } from './cellRender';
import { renderMazePath } from './mazeBoundaryRender';

export class Maze {
    rows: number;
    columns: number;
    wallColor: string;
    wallShadowColor: string;
    backgroundColor: string;
    objectShadow: string;
    playerColor: string;
    playerRecentPathHighlightColor: string;
    wCell: number;
    hCell: number;
    cells: Cell[][] = new Array<Cell[]>();
    ctx: CanvasRenderingContext2D;
    wallLineWidth: number = 2;

    constructor(ctx: CanvasRenderingContext2D, rows: number, columns: number, wallColor: string, wallShadowColor: string, backgroundColor: string, objectShadow: string, playerColor: string, playerRecentPathHighlightColor: string, wallLineWidth: number) {
        this.rows = rows;
        this.columns = columns;
        this.wallColor = wallColor;
        this.wallShadowColor = wallShadowColor;
        this.backgroundColor = backgroundColor;
        this.objectShadow = objectShadow;
        this.playerColor = playerColor;
        this.playerRecentPathHighlightColor = playerRecentPathHighlightColor;
        this.hCell = ctx.canvas.height/columns;
        this.wCell = ctx.canvas.width/rows;
        this.wallLineWidth = wallLineWidth;
        this.ctx = ctx;
        // ctx.canvas.style.border = `3px solid ${this.wallColor}`
        // ctx.save();
        // ctx.globalAlpha = 0.5;
        ctx.canvas.style.backgroundColor = this.backgroundColor;

        // generating the cell of the maze
        for (let i=0; i<rows; i++) {
            this.cells.push(new Array<Cell>())
            for (let j=0; j<columns; j++) {
                this.cells[i].push(new Cell(i,j))
            }
        }

        // adding neibhours to the cells of mazes
        this.cells.forEach(cellArray => {
            cellArray.forEach(cell => {
                cell.getNeighbourCells(this);
            })
        })

        generateMazePaths(this, 0,0);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.wallColor;
        this.ctx.lineWidth = this.wallLineWidth; 
        this.ctx.strokeRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.stroke();
        this.ctx.restore();

        renderMazePath(this);

    }

    

    removeUnlikedNeighbours() {
        this.cells.forEach(cellArray => {
            cellArray.forEach(cell => {
                if(!cell.isTopOpen) {
                    cell.topNeighbour = null;
                }
                if(!cell.isRightOpen) {
                    cell.rightNeighbour = null;
                }
                if(!cell.isBottomOpen) {
                    cell.bottomNeighbour = null;
                }
                if(!cell.isLeftOpen) {
                    cell.leftNeighbour = null;
                }
            })
        })
    }


}