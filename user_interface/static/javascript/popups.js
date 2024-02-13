export function createInputPopup(baseApiUrl, accessToken, cell, key) {
    console.log(key)
    if (key === 'type_name') {
        createTypeOptionsPopup(baseApiUrl, accessToken, cell);
    } else {
        createEditablePopup(cell);
    }
}

// -------------------------------------------------------------------

function createTypeOptionsPopup(baseApiUrl, accessToken, cell) {
    // Fetch options from the backend endpoint
    fetch(`${baseApiUrl}accounts-api/types`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
    })
    .then(response => response.json())
    .then(options => {
        // Create a select element with options
        const select = document.createElement('select');
        select.classList.add('popup-select');

        // Add a default option with text "Select" (disabled)
        const defaultOption = document.createElement('option');
        defaultOption.value = 'select';
        defaultOption.text = '-- select --';
        defaultOption.disabled = true;
        select.add(defaultOption);

        console.log(options)

        // Add options to the select element
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.name;
            optionElement.text = option.name;
            select.add(optionElement);
        });

        // Set the initial selected option based on the current cell
        // value if it exists in the options, otherwise, select the default option
        const currentCellValue = cell.textContent.trim();
        select.value = options.some(option => option.name === currentCellValue) ? currentCellValue : 'select';

        // Append the select to the body
        document.body.appendChild(select);

        // Get the position and dimensions of the clicked cell
        const cellRect = cell.getBoundingClientRect();

        // Set the position of the dropdown relative to the cell
        select.style.position = 'absolute';
        select.style.top = cellRect.top + 'px';
        select.style.left = cellRect.left + 'px';
        select.style.width = cell.offsetWidth + 'px';

        // Add event listener to handle changes when the user selects an option
        select.addEventListener('change', function () {
            // Save the selected option when the user makes a selection
            cell.textContent = select.value;
            // Remove the select from the DOM
            document.body.removeChild(select);
        });

        // Add event listener to handle clicks outside the dropdown
        const closePopup = function (event) {
            if (!select.contains(event.target)) {
                document.removeEventListener('click', closePopup);
                // Check if the select is still a child before removing
                if (document.body.contains(select)) {
                    document.body.removeChild(select);
                }
            }
        };

        // Add event listener to handle clicks outside the dropdown
        document.addEventListener('click', closePopup);
    })
    .catch(error => {
        console.error('Error fetching options:', error);
    });
}

// -------------------------------------------------------------------

function createEditablePopup(cell) {
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
