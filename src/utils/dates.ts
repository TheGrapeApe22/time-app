export function timeStringToDate(time: string | null): Date | null {
    if (!time) return null;
    const [hh, mm] = time.split(":").map((v) => Number(v));
    if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
    const d = new Date();
    d.setHours(hh, mm, 0, 0);
    return d;
}

export function dateToTimeString(d: Date | null): string | null {
    if (!d) return null;
    const hh = d.getHours().toString().padStart(2, "0");
    const mm = d.getMinutes().toString().padStart(2, "0");
    return `${hh}:${mm}`;
}