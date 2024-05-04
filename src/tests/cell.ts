import { Cell } from "../maze/cell"
import { Maze } from "../maze/maze";

export const CellsWithoutAnyOpenSide = (cellArray: Cell[][]) : Cell[] => {
    let closeCells: Cell[] = new Array();
    cellArray.forEach(cells => {
        cells.forEach(cell => {
            if (isClosedCell(cell)){
                console.log('cell is closed: ', cell.x, ', ', cell.y);
                closeCells.push(cell);
            }
        })
    })
    console.log('CellsWithoutAnyOpenSide, ', closeCells.length);
    return closeCells;
}

function isClosedCell(cell: Cell) {
    if (!cell.isTopOpen && !cell.isRightOpen && !cell.isBottomOpen && !cell.isLeftOpen) {
        return true;
    } else
        return false;
}

export const printCellPath = (maze: Maze, ctx: CanvasRenderingContext2D) => {
    let cells = maze.cells;
    let w = maze.wCell;
    let h = maze.hCell;
    
    ctx.font='10px'
    cells.forEach(cellArray => {
        cellArray.forEach(cell => {
            let text = `${cell.isTopOpen} ${cell.isRightOpen}`
            let text2 = `${cell.isLeftOpen} ${cell.isBottomOpen} `
            // ${cell.isTopOpen}, 
            //     ${cell.isRightOpen}
            //     ${cell.isBottomOpen}
            //     ${cell.isLeftOpen}
            // ${cell.isBottomOpen} ${cell.isLeftOpen}
            // ctx.fillText(text, w*cell.x + w/8, h*cell.y+h/3);
            // ctx.fillText(text2, w*cell.x + w/8, h*cell.y+h/2);

            // ctx.fillText(`${cell.isTopOpen}`, w*cell.x + w/3, h*cell.y+h/9);
            // ctx.fillText(`${cell.isRightOpen}`, w*cell.x + w - w/3, h*cell.y+h/2);
            // ctx.fillText(`${cell.isBottomOpen}`, w*cell.x + w/3, h*cell.y+h-h/8);
            // ctx.fillText(`${cell.isLeftOpen}`, w*cell.x + w/9, h*cell.y+h/2);
            
            ctx.fillText(`${cell.x}, ${cell.y}`, w*cell.x + w/3, h*cell.y+h/3);

        })
    })
}
