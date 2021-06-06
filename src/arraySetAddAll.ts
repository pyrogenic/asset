import { arraySetAdd } from "./arraySetAdd";
import { ArraySetContainer, ArraySetOrderRule, ElementType, ensureArray, PropertyName } from "./index";
import { spread } from "./spread";

export function arraySetAddAll<
    TElement>(
        container: TElement[],
        value: TElement[] | undefined,
        sorted?: ArraySetOrderRule<TElement>): boolean;
export function arraySetAddAll<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer,
        key: TKey,
        value: TElement[] | undefined,
        sorted?: ArraySetOrderRule<TElement>): boolean;
export function arraySetAddAll<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer | TElement[],
        keyOrValue: TKey | TElement[] | undefined,
        valueOrSorted?: TElement[] | undefined | ArraySetOrderRule<TElement>,
        sortedOrNothing?: ArraySetOrderRule<TElement>): boolean {
    type Value = TElement[] | undefined;
    let list: TElement[];
    let value: Value;
    let sorted: ArraySetOrderRule<TElement> | undefined;
    if (Array.isArray(container)) {
        list = container;
        value = keyOrValue as Value;
        if (!value || value.length === 0) {
            return false;
        }
        sorted = valueOrSorted as ArraySetOrderRule<TElement>;
    } else {
        value = valueOrSorted as Value;
        if (!value || value.length === 0) {
            return false;
        }
        list = ensureArray(container, keyOrValue as PropertyName);
        sorted = sortedOrNothing;
    }
    return spread(value).map((item) => arraySetAdd(list, item, sorted)).includes(true);
}
