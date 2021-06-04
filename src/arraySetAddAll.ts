import { arraySetAdd } from "./arraySetAdd";
import type { ArraySetContainer, ArraySetOrderRule, ElementType, PropertyName } from "./index";
import { spread } from "./spread";

export function arraySetAddAll<
    TKey extends PropertyName,
    TContainer extends ArraySetContainer<TKey, any>,
    TElement extends ElementType<TContainer[TKey]>>(
        container: TContainer,
        key: TKey,
        value: TElement[] | undefined,
        sorted?: ArraySetOrderRule<TElement>): boolean {
    if (value === undefined) {
        return false;
    }
    return spread(value).map((item) => arraySetAdd(container, key, item, sorted)).includes(true);
}
