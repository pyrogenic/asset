
export function peek<T, TU extends T extends undefined ? undefined : never>(value: TU | T | T[]) {
    if (value === undefined) {
        return value;
    }
    if (Array.isArray(value)) {
        return value[0];
    }
    return value;
}
