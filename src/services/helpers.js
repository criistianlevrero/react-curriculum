const shortMonthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export function getMonthYear(dateString) {
    const date = new Date(dateString)
    return `${shortMonthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

export function getYear(dateString) {
    return new Date(dateString).getUTCFullYear()
}