import { isEqual } from "lodash";
import { PropertyName, ArraySetContainer, ValueOrPredicate, Predicate, ArraySetOrderRule, ElementType } from "./index";
import { ensureArray } from "./ensureArray";

/**
 * @param container list of elements
 * @param value to remove from the array set
 * @return [true] if {@link value} was removed from the set
 */
export function arraySetRemove<
     TElement>(
         container: TElement[],
         value: ValueOrPredicate<TElement>): boolean;

/** 
 * @param container object with an array property called {@link key}
 * @param key name of an array property on {@link container}
 * @param value to remove from the array set
 * @return [true] if {@link value} was removed from the set
 */
export function arraySetRemove<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer,
        key: TKey,
        value: TElement): boolean;

export function arraySetRemove<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer | TElement[],
        keyOrValue: TKey | TElement,
        valueOrNothing?: TElement): boolean {
    let list: TElement[];
    let value: TElement;
    if (Array.isArray(container)) {
        list = container;
        value = keyOrValue as TElement;
    } else {
        if (container[keyOrValue] === undefined) {
            return false;
        }
        list = ensureArray(container, keyOrValue);
        value = valueOrNothing as TElement;
    }
    let index: number;
    switch (typeof value) {
        case "function":
            index = list.findIndex(value as Predicate<TElement>);
            break;
        case "object":
            index = list.findIndex(isEqual.bind(null, value));
            break;
        default:
            index = list.indexOf(value as TElement);
            break;
    }
    if (index >= 0) {
        list.splice(index, 1);
        return true;
    }
    return false;
}
