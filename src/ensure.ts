import { PropertyName } from "./index";


type ConstructorOrFactory<
    TResult,
    TKey extends PropertyName,
    TContainer extends {
        [K in TKey]?: TResult;
    },
    > = { new(): Required<TContainer>[TKey] } | {
        factory: () => Required<TContainer>[TKey];
    };

export function ensure<
    TResult,
    TKey extends PropertyName,
    TContainer extends {
        [K in TKey]?: TResult;
    }>(
        container: TContainer,
        key: TKey,
        factory: ConstructorOrFactory<TResult, TKey, TContainer>): Required<TContainer>[TKey] {
    let value = container[key];
    if (value !== undefined) {
        return value;
    }
    switch (typeof factory) {
        case "function":
            value = new factory();
            break;
        default:
            value = factory.factory();
            break;
    }
    return container[key] = value;
}
