import { isEqual, PropertyName } from "lodash";
import { arraySetAdd } from "./arraySetAdd";
import { ArraySetOrderRule, ArraySetContainer, ElementType } from "./index";
import { ensureArray } from "./ensureArray";

/**
 * @return true if the item is now in the list, false otherwise.
 */

export function arraySetToggle<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer,
        key: TKey,
        value: TElement,
        sorted?: ArraySetOrderRule<TElement>): boolean {
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
