import { Cell } from "./cell";

export const getAnyUnvisitedNeighbourOf = (cell: Cell) : Cell | null => {
    let a: Cell[] = new Array();
    
    if(cell.topNeighbour && !cell.topNeighbour.isVisited) a.push(cell.topNeighbour);
    if(cell.rightNeighbour && !cell.rightNeighbour.isVisited) a.push(cell.rightNeighbour);
    if(cell.bottomNeighbour  && !cell.bottomNeighbour.isVisited) a.push(cell.bottomNeighbour);
    if(cell.leftNeighbour && !cell.leftNeighbour.isVisited) a.push(cell.leftNeighbour);

    if (a.length >= 0)
        return a[Math.floor(Math.random()*a.length)];
    else return null;

}

export const removeWallBetween = (cell1: Cell, cell2: Cell) => {
    if (cell1.topNeighbour === cell2) {
        cell1.isTopOpen = true;
        cell2.isBottomOpen = true;
        
    }  if (cell1.rightNeighbour === cell2) {
        cell1.isRightOpen = true;
        cell2.isLeftOpen = true;
        
    }  if (cell1.bottomNeighbour === cell2) {
        cell1.isBottomOpen = true;
        cell2.isTopOpen = true;

    } if (cell1.leftNeighbour === cell2) {
        cell1.isLeftOpen = true;
        cell2.isRightOpen = true;
    }
}