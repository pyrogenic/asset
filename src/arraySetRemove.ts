import { isEqual } from "lodash";
import { PropertyName, ArraySetContainer, ValueOrPredicate, Predicate } from "./index";
import { ensureArray } from "./ensureArray";

export function arraySetRemove<
    TElement,
    TKey extends PropertyName>(
        container: ArraySetContainer<TKey, TElement>,
        key: TKey,
        value: ValueOrPredicate<TElement>) {
    if (container[key] === undefined) {
        return false;
    }
    const list = ensureArray(container, key);
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
