import { Maze } from "./maze";

export class Cell {
    // coordinate of the Array in which cell is stored
    // the path can be draw with help of it when cell height and width is known
    x: number;
    y: number;

    // which side of the cell is open to pass the character
    isTopOpen: boolean = false;
    isRightOpen: boolean = false;
    isBottomOpen: boolean = false;
    isLeftOpen: boolean = false;

    // this variable will used for maze generation as well as for player after generating maze
    isVisited: boolean = false;

    alpha: number = 0;
    

    topNeighbour: Cell | null = null;
    rightNeighbour: Cell | null = null;
    bottomNeighbour: Cell | null = null;
    leftNeighbour: Cell | null = null;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    getNeighbourCells(maze: Maze) {
        let row: number = maze.rows;
        let col: number = maze.columns;

        /**
         * if any cell is on edge on array and cell does not have 4 neighbour,
         * then it's given a null value
         * this prevents us from ArrayOutOfBound type of Errors
         */
        this.topNeighbour   = this.y-1 < 0    ? null : maze.cells[this.x][this.y-1];
        this.rightNeighbour = this.x+1 >= row ? null : maze.cells[this.x+1][this.y];
        this.bottomNeighbour= this.y+1 >= col ? null : maze.cells[this.x][this.y+1];
        this.leftNeighbour  = this.x-1 < 0    ? null : maze.cells[this.x-1][this.y];

    }

    hasUnvisitedNeighbour() {
        if ((this.topNeighbour && !this.topNeighbour.isVisited) ||
            (this.rightNeighbour && !this.rightNeighbour.isVisited) ||
            (this.bottomNeighbour && !this.bottomNeighbour.isVisited) ||
            (this.leftNeighbour && !this.leftNeighbour.isVisited)
        ) {
            return true;
        } else {
            return false;
        }
    }

}
