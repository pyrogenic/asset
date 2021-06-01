import { isEqual } from "lodash";
import { ArraySetOrderRule, ArraySetContainer, PropertyName } from "./index";
import { ensureArray } from "./ensureArray";

/** 
 * @param container object with an array property called {@link key}
 * @param key name of an array property on {@link container}
 * @param value to add to the array set
 * @param sorted keeps the set in a particular order (see {@link ArraySetOrderRule} for more information).
 * @return [true] if {@link value} was newly-added to the set
 */
export function arraySetAdd<
    TElement,
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, TElement>>(
        container: TContainer,
        key: TKey,
        value: TElement,
        sorted?: ArraySetOrderRule<TElement>): boolean {
    const list = ensureArray(container, key);
    const index = typeof value !== "object" ? list.indexOf(value) : list.findIndex(isEqual.bind(null, value));
    const notNew = index >= 0;
    if (notNew) {
        if (sorted !== "mru") {
            return false;
        } else {
            list.splice(index, 1);
        }
    }
    list.push(value);
    if (typeof sorted === "function") {
        list.sort(sorted);
    } else if (sorted === true) {
        list.sort();
    }
    return !notNew;
}
