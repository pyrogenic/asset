
export function first<T, TU extends T extends undefined ? undefined : never>(value: TU | T | T[]) {
    if (value === undefined) {
        return value;
    }
    if (Array.isArray(value)) {
        if (value.length === 0) {
            return undefined;
        }
        return value[0];
    }
    return value;
}
