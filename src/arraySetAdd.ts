import { isEqual } from "lodash";
import { ArraySetOrderRule, ArraySetContainer, PropertyName } from "./index";
import { ensureArray } from "./ensureArray";

/** array set add */

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
    if (index >= 0) {
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
    return true;
}
