import * as constants from './constants.js';

export function getCurrentAccountKey(clickedCell, accounts) {
    // Determine the column index of the clicked cell
    var columnIndex = Array.from(clickedCell.parentElement.cells)
        .filter(cell => cell.cellIndex !== 0) // Exclude non-data cells
        .indexOf(clickedCell);
    // Get the corresponding keys from the headers (excluding non-data keys)
    var keys = Object.keys(accounts[0])
        .filter(key => constants.viewableAccountFields.includes(key));
    // Get the current key (header) based on the columnIndex
    return keys[columnIndex];
}