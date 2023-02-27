export const formatDate = (timeStamp: string) => {
    return new Date(timeStamp).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}