import { PropertyName, ArraySetContainer } from "./index";

export function ensureArray<
    TKey extends PropertyName,
    TElement>(
        container: ArraySetContainer<TKey, TElement>,
        key: TKey): TElement[] {
    let value = container[key];
    if (value !== undefined) {
        return value!;
    }
    return container[key] = [];
}
