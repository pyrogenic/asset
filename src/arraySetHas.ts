import { ArraySetContainer, PropertyName, ValueOrPredicate } from "./index";

/** array set has */
export function arraySetHas<
    TElement,
    TKey extends PropertyName>(
        container: ArraySetContainer<TKey, TElement>,
        key: TKey,
        value: ValueOrPredicate<TElement>) {
    const list = container[key];
    if (list === undefined) {
        return false;
    }
    if (typeof value === "function") {
        return list.findIndex(value) >= 0;
    }
    return list.includes(value);
}
