export function isSameDateOrBefore(date1: Date, date2: Date): boolean {
    if (!date1 || !date2) {
        return false;
    }
    return date1.getTime() <= date2.getTime();
}