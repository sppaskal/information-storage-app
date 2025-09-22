// Helper function to show success popup
export function showSuccessPopup(addButton) {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.textContent = 'Account successfully created';
    document.body.appendChild(popup);

    // Position popup to the right of the add button
    const buttonRect = addButton.getBoundingClientRect();
    popup.style.position = 'absolute';
    popup.style.top = `${buttonRect.top + window.scrollY}px`;
    popup.style.left = `${buttonRect.right + 10}px`;
    popup.style.height = `${addButton.offsetHeight}px`;

    // Trigger animation
    setTimeout(() => popup.classList.add('show'), 10);

    // Auto-close after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// Helper function to show failure popup
export function showFailurePopup(addButton) {
    const popup = document.createElement('div');
    popup.className = 'failure-popup';
    popup.textContent = 'Failed to create account (make sure to use a valid email/site)';
    document.body.appendChild(popup);

    // Position popup to the right of the add button
    const buttonRect = addButton.getBoundingClientRect();
    popup.style.position = 'absolute';
    popup.style.top = `${buttonRect.top + window.scrollY}px`;
    popup.style.left = `${buttonRect.right + 10}px`;
    popup.style.height = `${addButton.offsetHeight}px`;

    // Trigger animation
    setTimeout(() => popup.classList.add('show'), 10);

    // Auto-close after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// Helper function to show edit success popup
export function showEditSuccessPopup(saveButton) {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.textContent = 'Account successfully updated';
    document.body.appendChild(popup);

    // Position popup to the right of the save button
    const buttonRect = saveButton.getBoundingClientRect();
    popup.style.position = 'absolute';
    popup.style.top = `${buttonRect.top + window.scrollY}px`;
    popup.style.left = `${buttonRect.right + 10}px`;
    popup.style.height = `${saveButton.offsetHeight}px`;

    // Trigger animation
    setTimeout(() => popup.classList.add('show'), 10);

    // Auto-close after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// Helper function to show reminder popup
export function showReminderPopup(addButton) {
    const popup = document.createElement('div');
    popup.className = 'reminder-popup';
    popup.textContent = 'Make sure to save newly added accounts';
    document.body.appendChild(popup);

    // Position popup to the right of the add button
    const buttonRect = addButton.getBoundingClientRect();
    popup.style.position = 'absolute';
    popup.style.top = `${buttonRect.top + window.scrollY}px`;
    popup.style.left = `${buttonRect.right + 10}px`;
    popup.style.height = `${addButton.offsetHeight}px`;

    // Trigger animation
    setTimeout(() => popup.classList.add('show'), 10);
}
