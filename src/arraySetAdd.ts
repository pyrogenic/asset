import { isEqual } from "lodash";
import { ArraySetOrderRule, ArraySetContainer, PropertyName, ElementType, ValueOrPredicate } from "./index";
import { ensureArray } from "./ensureArray";

export function arraySetAdd<
    TElement>(
        container: TElement[],
        value: TElement,
        sorted?: ArraySetOrderRule<TElement>): boolean;

/** 
 * @param container object with an array property called {@link key}
 * @param key name of an array property on {@link container}
 * @param value to add to the array set
 * @param sorted keeps the set in a particular order (see {@link ArraySetOrderRule} for more information).
 * @return [true] if {@link value} was newly-added to the set
 */
export function arraySetAdd<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer,
        key: TKey,
        value: TElement,
        sorted?: ArraySetOrderRule<TElement>): boolean;

export function arraySetAdd<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer | TElement[],
        keyOrValue: TKey | TElement,
        valueOrSorted?: TElement | ArraySetOrderRule<TElement>,
        sortedOrNothing?: ArraySetOrderRule<TElement>): boolean {
    let list: TElement[];
    let value: TElement;
    let sorted: ArraySetOrderRule<TElement> | undefined;
    if (Array.isArray(container)) {
        list = container;
        value = keyOrValue as TElement;
        sorted = valueOrSorted;
    } else {
        list = ensureArray(container, keyOrValue);
        value = valueOrSorted as TElement;
        sorted = sortedOrNothing;
    }
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
