import { MapContainer, PropertyName } from "./index";

export function ensureMap<TKey extends PropertyName, TElement, TContainer extends MapContainer<TKey, TElement>>(
    container: TContainer,
    key: TKey): TContainer[TKey] {
    let value = container[key];
    if (value !== undefined) {
        return value;
    }
    return container[key] = {} as TContainer[TKey];
}
