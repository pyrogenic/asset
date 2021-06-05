import type { ArraySetContainer, ElementType, Predicate, PropertyName, ValueOrPredicate } from "./index";

export function arraySetHas<
    TElement>(
        container: TElement[] | undefined,
        value: ValueOrPredicate<TElement>): boolean;

export function arraySetHas<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer extends undefined ? never : TContainer,
        key: TKey,
        value: ValueOrPredicate<TElement>): boolean;

export function arraySetHas<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer | TElement[],
        keyOrValue: TKey | ValueOrPredicate<TElement>,
        valueOrNothing?: ValueOrPredicate<TElement>): boolean {
    // NB: we use null here to avoid the compiler inferring that list is non-optional from the first clause
    const [list, value] = Array.isArray(container) ? [container, keyOrValue] : [container?.[keyOrValue] ?? null, valueOrNothing];
    if (list === null) {
        return false;
    }
    if (typeof value === "function") {
        return list.findIndex(value as Predicate<TElement>) >= 0;
    }
    return list.includes(value as TElement);
}
