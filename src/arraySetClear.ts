import { ArraySetContainer, PropertyName, PropertyNamesOfType } from "./index";

export function arraySetClear<
    TKey extends PropertyName>(
        container: ArraySetContainer<TKey, any>,
        key: TKey) {
    const set: Pick<any[], "splice" | "length"> | undefined = container[key];
    if (set && set.length > 0) {
        set.splice(0, set.length);
    }
    return set;
}
