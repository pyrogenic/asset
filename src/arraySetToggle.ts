import { isEqual, PropertyName } from "lodash";
import { arraySetAdd } from "./arraySetAdd";
import { ArraySetOrderRule, ArraySetContainer } from "./index";
import { ensureArray } from "./ensureArray";

/**
 * @return true if the item is now in the list, false otherwise.
 */

export function arraySetToggle<
    TElement,
    TKey extends PropertyName>(
        container: ArraySetContainer<TKey, TElement>,
        key: TKey,
        value: TElement,
        sorted?: ArraySetOrderRule<TElement>) {
    if (container[key] === undefined) {
        arraySetAdd(container, key, value, sorted);
        return true;
    }
    const list = ensureArray(container, key);
    const index = typeof value !== "object" ? list.indexOf(value) : list.findIndex(isEqual.bind(null, value));
    if (index >= 0) {
        list.splice(index, 1);
        return false;
    }
    arraySetAdd(container, key, value, sorted);
    return true;
}
