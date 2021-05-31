import { PropertyName } from "./index";


export function ensure<
    TResult,
    TKey extends PropertyName,
    TContainer extends {
        [K in TKey]: TResult;
    }>(
        container: TContainer,
        key: TKey,
        factory: new () => Required<TContainer>[TKey]): Required<TContainer>[TKey] {
    let value = container[key];
    if (container[key] === undefined) {
        value = new factory();
        container[key] = value;
    }
    return value;
}
