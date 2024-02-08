export function createEditablePopup(cell) {
    // Get the position and dimensions of the clicked cell
    var cellRect = cell.getBoundingClientRect();

    // Create a container div for the popup
    var popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');
    popupContainer.style.top = cellRect.top + 'px';
    popupContainer.style.left = cellRect.left + 'px';

    // Create a textarea element
    var textarea = document.createElement('textarea');
    textarea.classList.add('popup-textarea');
    textarea.value = cell.textContent.trim();

    // Append the textarea to the container
    popupContainer.appendChild(textarea);

    // Append the container to the body
    document.body.appendChild(popupContainer);

    // Focus on the textarea to allow immediate editing
    textarea.focus();

    // Use setTimeout to ensure the browser renders
    // the textarea before setting its height
    setTimeout(function () {
        // Trigger the input event to ensure immediate
        // adjustment of height
        textarea.dispatchEvent(new Event('input'));
    }, 0);

    // Add event listener to handle changes in the textarea
    textarea.addEventListener('input', function () {
        // Adjust the height of the textarea up to a maximum of 800 pixels
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 800) + 'px';
        // Adjust the height of the container accordingly
        popupContainer.style.height = Math.min(textarea.scrollHeight, 800) + 'px';
    });

    // Add event listener to handle changes when the user finishes editing
    textarea.addEventListener('blur', function () {
        // Save the changes when the textarea loses focus
        cell.textContent = textarea.value;
        // Remove the popup from the DOM
        document.body.removeChild(popupContainer);
    });
}
