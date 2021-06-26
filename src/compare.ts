type Comparand = undefined | string | Comparand[];
type Options = {
    emptyLast?: boolean;
}

export function compare(a: Comparand, b: Comparand, options?: Options): number {
    if (a === undefined) {
        if (b === undefined) {
            return 0;
        }
        return options?.emptyLast ? 1 : -1;
    } else if (b === undefined) {
        return options?.emptyLast ? -1 : 1;
    }
    if (Array.isArray(a)) {
        if (Array.isArray(b)) {
            if (a.length === 0) {
                if (b.length === 0) {
                    return 0;
                }
                return options?.emptyLast ? 1 : -1;
            } else if (b.length === 0) {
                return options?.emptyLast ? -1 : 1;
            }
            for (let i = 0; i < a.length; ++i) {
                if (i >= b.length) {
                    // a is longer
                    return 1;
                }
                const r = compare(a[i], b[i]);
                if (r !== 0) {
                    return r;
                }
            }
            return a.length === b.length ? 0 : -1;
        }
        return compare(a, [b]);
    } else if (Array.isArray(b)) {
        return compare([a], b);
    }
    return a.localeCompare(b);
}
