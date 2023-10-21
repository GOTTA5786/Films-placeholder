export function getDateFromTimespamt(timestamp:number): string{
    let date = new Date(timestamp);
    let hours = date.getHours()
    let minutes: string | number = date.getMinutes()
    if (minutes < 10) minutes = '0' + minutes
    return hours + ":" + minutes + ", "+ date.toDateString();
}