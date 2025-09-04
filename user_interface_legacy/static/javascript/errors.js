export function combineErrorMessages(errorDict) {
    let errorMessage = '';
    for (const key in errorDict) {
        errorMessage += `${errorDict[key]}\n`; // Concatenate only the error messages
    }
    // Remove leading and trailing whitespace
    return errorMessage.trim().replace(/\n/g, '<br>');
}
