import * as constants from './constants.js';

export function getCurrentAccountKey(clickedCell, account) {
    // Determine the column index of the clicked cell
    var columnIndex = Array.from(clickedCell.parentElement.cells)
        .filter(cell => cell.cellIndex !== 0) // Exclude non-data cells
        .indexOf(clickedCell);
    // Get the corresponding keys from the headers (excluding non-data keys)
    var keys = Object.keys(account)
        .filter(key => constants.viewableAccountFields.includes(key));
    // Get the current key (header) based on the columnIndex
    return keys[columnIndex];
}

export function findRowIndexById(accountList, accountId) {
    for (let i = 0; i < accountList.rows.length; i++) {
        const row = accountList.rows[i];
        // Assuming the ID cell is at index 1. This should
        // always be the case as id is always displayed
        // first after action column.
        const idCell = row.cells[1]; 

        if (idCell.textContent.trim() === accountId.toString()) {
            return i;
        }
    }

    return -1; // Return -1 if not found
}
