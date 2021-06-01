import { PropertyName, ArraySetContainer } from "./index";

export function ensureArray<
    TKey extends PropertyName,
    TElement>(
        container: ArraySetContainer<TKey, TElement>,
        key: TKey): TElement[] {
    let value: TElement[] | undefined = container[key];
    if (value !== undefined) {
        return value;
    }
    type ActualValue = Exclude<ArraySetContainer<TKey, TElement>[TKey], undefined>;
    return container[key] = new Array() as ActualValue;
}
