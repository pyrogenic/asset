import { isEqual, PropertyName } from "lodash";
import { arraySetAdd } from "./arraySetAdd";
import { ArraySetOrderRule, ArraySetContainer, ElementType, ValueOrPredicate } from "./index";
import { ensureArray } from "./ensureArray";

/**
 * @return true if the item is now in the list, false otherwise.
 */

export function arraySetToggle<
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
export function arraySetToggle<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer,
        key: TKey,
        value: TElement,
        sorted?: ArraySetOrderRule<TElement>): boolean;

export function arraySetToggle<
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
        value = valueOrSorted as TElement;
        sorted = sortedOrNothing;
        if (container[keyOrValue] === undefined) {
            arraySetAdd(container, keyOrValue, value, sorted);
            return true;
        }
        list = ensureArray(container, keyOrValue);
    }
    const index = typeof value !== "object" ? list.indexOf(value) : list.findIndex(isEqual.bind(null, value));
    if (index >= 0) {
        list.splice(index, 1);
        return false;
    }
    arraySetAdd(list, value, sorted);
    return true;
}
