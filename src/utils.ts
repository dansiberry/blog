// Reusable date format function that takes a timestamp and returns human readable date string.
export const formatDate = (timeStamp: string) => {
    return new Date(timeStamp).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};
