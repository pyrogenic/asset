type Comparand<T> = undefined | string | Comparand<T>[];
type Options<T> = {
    emptyLast?: boolean;
    toString?: (v: T) => Comparand<T>;
}

export function compare<T>(a: Comparand<T>, b: Comparand<T>, options?: Options<T>): number {
    if (a === undefined) {
        if (b === undefined) {
            return 0;
        }
        return options?.emptyLast ? 1 : -1;
    } else if (b === undefined) {
        return options?.emptyLast ? -1 : 1;
    }
    if (arrayLike(a)) {
        if (arrayLike(b)) {
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
                const r = compare(a[i], b[i], options);
                if (r !== 0) {
                    return r;
                }
            }
            return a.length === b.length ? 0 : -1;
        }
        return compare(a, [b], options);
    } else if (arrayLike(b)) {
        return compare([a], b, options);
    }
    if (typeof a === "string") {
        if (typeof b === "string") {
            return a.localeCompare(b);
        } else if (options?.toString) {
            return compare(a, options.toString(b), options);
        }
    } else if (typeof b === "string") {
        if (options?.toString) {
            return compare(options.toString(a), b, options);
        }
    } else if (options?.toString) {
        return compare(options.toString(a), options.toString(b), options);
    }
    console.warn({ badOperands: { a, b }, ...(options ?? {}) });
    return 0;
}

function arrayLike<T>(a: string | Comparand<T>[]): a is Comparand<T>[] {
    return Array.isArray(a);
    // if (typeof a === "object") {
    //     return a.length !== undefined;
    // }
    // return false;
}
