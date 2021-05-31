import { isEqual } from "lodash";
import { ArrayPropertyNames, PropertyNamesOfType, ElementType, PropertyName, ArraySetContainer } from "./index";
import { ensureArray } from "./ensureArray";


export function arraySetRemove<
    TElement,
    TKey extends PropertyName>(
        container: ArraySetContainer<TKey, TElement>,
        key: TKey,
        value: TElement) {
    if (container[key] === undefined) {
        return false;
    }
    const list = ensureArray(container, key);
    const index = typeof value !== "object" ? list.indexOf(value) : list.findIndex(isEqual.bind(null, value));
    if (index >= 0) {
        list.splice(index, 1);
        return true;
    }
    return false;
}
