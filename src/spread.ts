
export function spread<T>(value: undefined | T | T[]): T[] {
    if (value === undefined) {
        return [];
    }
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
}
