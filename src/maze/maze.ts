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
    surfaceColor: string;
    playerColor: string;
    desinationColor: string;
    wCell: number;
    hCell: number;
    cells: Cell[][] = new Array<Cell[]>();
    ctx: CanvasRenderingContext2D;
    wallLineWidth: number = 2;

    constructor(ctx: CanvasRenderingContext2D, rows: number, columns: number, wallColor: string, wallShadowColor: string, surfaceColor: string, playerColor: string, destinationColor: string) {
        this.rows = rows;
        this.columns = columns;
        this.wallColor = wallColor;
        this.wallShadowColor = wallShadowColor;
        this.surfaceColor = surfaceColor;
        this.playerColor = playerColor;
        this.desinationColor = destinationColor;
        this.hCell = ctx.canvas.height/columns;
        this.wCell = ctx.canvas.width/rows;
        this.ctx = ctx;
        ctx.canvas.style.border = `5px solid ${this.wallColor}`
        // ctx.save();
        // ctx.globalAlpha = 0.5;
        // ctx.canvas.style.backgroundColor = this.surfaceColor;

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