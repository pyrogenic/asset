export function sync<T>(from: T[], to: T[]) {
    let i = 0;
    while (i < to.length) {
        if (from.includes(to[i])) {
            i++;
            continue;
        }
        let j = 1;
        while (i + j < to.length) {
            if (from.includes(to[i + j])) {
                break;
            }
            j++;
        }
        to.splice(i, j);
    }
    i = 0;
    while (i < from.length) {
        if (to.includes(from[i])) {
            i++;
            continue;
        }
        let j = 1;
        while (i + j < to.length) {
            if (to.includes(from[i + j])) {
                break;
            }
            j++;
        }
        if (j === 1) {
            to.push(from[i]);
        } else {
            to.push(...from.slice(i, i + j))
        }
    }
}
