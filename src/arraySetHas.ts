import type { ArraySetContainer, ElementType, Predicate, PropertyName, ValueOrPredicate } from "./index";

/** array set has */
export function arraySetHas<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer,
        key: TKey,
        value: ValueOrPredicate<TElement>): boolean {
    const list = container[key];
    if (list === undefined) {
        return false;
    }
    if (typeof value === "function") {
        return list.findIndex(value as Predicate<TElement>) >= 0;
    }
    return list.includes(value as TElement);
}
