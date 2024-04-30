import { Cell } from "./cell";

// tells if cell is only open by one side
export const cellIsDeadend = (cell : Cell) => {
    let ways = 0;
    if (cell.isTopOpen) ways+=1;
    if (cell.isRightOpen) ways+=1;
    if (cell.isBottomOpen) ways+=1;
    if (cell.isLeftOpen) ways+=1;

    if (ways == 1)
        return true;
    else
        return false;
}

// if the cell has three open sides i.e. has two paths ahead
export const cellHasTwoPaths = (cell: Cell): boolean => {
    let ways = 0;
    if (cell.isTopOpen) ways+=1;
    if (cell.isRightOpen) ways+=1;
    if (cell.isBottomOpen) ways+=1;
    if (cell.isLeftOpen) ways+=1;

    if (ways > 2)
        return true;
    else
        return false;
}