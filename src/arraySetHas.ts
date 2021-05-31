import { ArrayPropertiesOfType, ArraySetContainer, PropertyName } from "./index";

/** array set has */

export function arraySetHas<
    TElement,
    TKey extends PropertyName>(
        container: ArraySetContainer<TKey, TElement>,
        key: TKey,
        value: TElement | ((element: TElement) => boolean)) {
    const list = container[key];
    if (list === undefined) {
        return false;
    }
    if (typeof value === "function") {
        return list.findIndex(value.bind(null)) >= 0;
    }
    return list.includes(value);
}
