import type { ArraySetContainer, ArraySetOrderRule, PropertyName } from "./index";
import { arraySetAdd } from "./arraySetAdd";
import { spread } from "./spread";


export function arraySetAddAll<
    TElement,
    TKey extends PropertyName>(
        container: ArraySetContainer<TKey, TElement>,
        key: TKey,
        value: TElement[] | undefined,
        sorted?: ArraySetOrderRule<TElement>) {
    return spread(value).map((item) => arraySetAdd(container, key, item, sorted)).includes(true);
}
