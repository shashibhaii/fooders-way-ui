export const timestamp = () => {
    const dateTime = Date.now();
    return Math.floor(dateTime / 1000);

}