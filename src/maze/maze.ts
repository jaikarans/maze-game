import {Cell} from './cell'

export class Maze {
    rows: number;
    columns: number;
    wallColor: string;
    surfaceColor: string;
    playerColor: string;
    desinationColor: string;
    wCell: number;
    hCell: number;
    cells: Cell[][] = new Array<Cell[]>();
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, rows: number, columns: number, wallColor: string, surfaceColor: string, playerColor: string, destinationColor: string) {
        this.rows = rows;
        this.columns = columns;
        this.wallColor = wallColor;
        this.surfaceColor = surfaceColor;
        this.playerColor = playerColor;
        this.desinationColor = destinationColor;
        this.hCell = ctx.canvas.height/columns;
        this.wCell = ctx.canvas.width/rows;
        this.ctx = ctx;
        ctx.canvas.style.border = `5px solid ${this.wallColor}`

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

        this.generateMazePaths(0,0);
        this.renderPath();

    }

    renderPath() {
        this.cells.forEach(cellArray => {
            cellArray.forEach(cell => {
                cell.drawCellBoundary(this, this.ctx);
            })
        })
    }

    generateMazePaths(initialCellX:number, initialCellY:number) {
        let cellStack: Cell[] = new Array();

        // here is the algorithm for generating the maze
        // https://en.wikipedia.org/wiki/Maze_generation_algorithm#Iterative_implementation_(with_stack)

        // Step-(1) Choose the initial cell, mark it as visited and push it to the stack
        let initialCell: Cell = this.cells[initialCellX][initialCellY];
        initialCell.isVisited = true;
        cellStack.push(initialCell);

        // Step-(2) while stack is not empty
        while(cellStack.length > 0) {
            /// Step-(2A) Pop a cell from the stack and make it a current cell
            let currentCell: Cell = cellStack.pop() as Cell;

            /// Step-(2B) If the current cell has any neighbours which have not been visited
            if (currentCell.hasUnvisitedNeighbour()) {
                //// Step-(2B-1) Push the current cell to the stack
                cellStack.push(currentCell);


                //// Step-(2B-2) Choose one of the unvisited neighbours
                let cellUnvisited: Cell | null = currentCell.getAnyUnvisitedNeighbour();

                if (cellUnvisited) {
                    //// Step-(2B-3) Remove the wall between the current cell and the chosen cell
                    currentCell.removeWallBetween(cellUnvisited);

                    //// Step-(2B-4) Mark the chosen cell as visited and push it to the stack
                    cellUnvisited.isVisited = true;
                    cellStack.push(cellUnvisited);

                }
            }
        }
    }

    
}