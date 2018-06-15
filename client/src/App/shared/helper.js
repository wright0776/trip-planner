export const formatDateForInputs = (dateStr) => {
    const startDate = new Date(dateStr);
    const year = startDate.getUTCFullYear()
    let month = startDate.getUTCMonth() + 1;
    month = month < 10 ? `0${month}`: month;
    let day = startDate.getUTCDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`
}
