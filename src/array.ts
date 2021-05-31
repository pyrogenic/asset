
export function array<T>(value: undefined | T | T[]) {
    if (value === undefined) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
}
