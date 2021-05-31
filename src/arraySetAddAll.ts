import { arraySetAdd } from "./arraySetAdd";
import { PropertyName, ArraySetContainer, ElementType, ArraySetOrderRule } from "./index";


export function arraySetAddAll<
    TElement,
    TKey extends PropertyName>(
        container: ArraySetContainer<TKey, TElement>,
        key: TKey,
        value: Array<ElementType<TContainer[TKey]>> | undefined,
        sorted?: ArraySetOrderRule<TElement>) {
    const result = value?.map((i) => arraySetAdd(container, key, i, sorted)).includes(true);
    if (result) { return true; }
    return false;
}
