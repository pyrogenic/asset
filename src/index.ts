export * from "./array";
export * from "./arraySetAdd";
export * from "./arraySetAddAll";
export * from "./arraySetClear";
export * from "./arraySetHas";
export * from "./arraySetRemove";
export * from "./arraySetToggle";
export * from "./compare";
export * from "./ensure";
export * from "./ensureArray";
export * from "./ensureMap";
export * from "./first";
export * from "./last";
export * from "./spread";
export * from "./sync";

export type Diff<T, U> = T extends U ? never : T;  // Remove types from T that are assignable to U
export type Filter<T, U> = T extends U ? T : never;  // Remove types from T that are not assignable to U

export type PropertyName = string | symbol | number;

export type ArrayLike<TElement> = Pick<TElement[], "slice" | "length" | "findIndex" | "includes"> & { [K: number]: TElement };

export type ArraySetContainer<TKey extends string | symbol | number, TElement> = TElement extends Function ? never : {
    [K in TKey]?: TElement[];
};

export type MapContainer<TKey extends string | symbol | number, TElement> = {
    [K in TKey]?: { [key: string]: TElement };
};

export type PropertyNamesOfType<T, P> = {
    [K in keyof Required<T>]: T[K] extends P ? K : never;
}[keyof T];

export type PropertiesOfType<T, P> = Pick<T, PropertyNamesOfType<T, P>>;

export type MultipleValue<T, P extends keyof T> = {
    [K in keyof T]: K extends P ? Array<T[K]> : T[K];
};

export type Comparer<T> = Parameters<Array<T>["sort"]>[0];

export type ElementType<T> = T extends Array<infer E> ? E : never;

export type ArraySetOrderRule<TElement> = (TElement extends string | number | boolean | bigint ? boolean : false) | "mru" | Comparer<TElement>;

export type ArrayPropertyNames<TContainer> = {
    [K in keyof TContainer]: Required<TContainer>[K] extends any[] ? K : never
}[keyof TContainer];
export type ArrayPropertyNamesOfType<TContainer, TElement> = {
    [K in keyof TContainer]: Required<TContainer>[K] extends TElement[] ? K : never
}[keyof TContainer];
export type MapPropertyNames<TContainer> = {
    [K in keyof TContainer]: Required<TContainer>[K] extends { [key: string]: any } ? K : never
}[keyof TContainer];
export type NonArrayPropertyNames<TContainer> = {
    [K in keyof TContainer]: Required<TContainer>[K] extends any[] ? never : K
}[keyof TContainer];
export type PlainPropertyNames<TContainer> = {
    [K in keyof TContainer]: Required<TContainer>[K] extends
    any[] | { [key: string]: any } ? never : K
}[keyof TContainer];

export type ArrayProperties<TContainer> = Pick<TContainer, ArrayPropertyNames<TContainer>>;
export type ArrayPropertiesOfType<TContainer, TElement> = {
    [K in keyof ArrayPropertyNamesOfType<TContainer, TElement>]?: TElement[];
};

export type MapProperties<TContainer> = Pick<TContainer, MapPropertyNames<TContainer>>;
export type NonArrayProperties<TContainer> = Pick<TContainer, NonArrayPropertyNames<TContainer>>;
export type PlainProperties<TContainer> = Pick<TContainer, PlainPropertyNames<TContainer>>;
export type ArrayPropertyElementTypes<TContainer> = {
    [K in ArrayPropertyNames<TContainer>]: ElementType<TContainer[K]>
}[keyof ArrayProperties<TContainer>];

type AnyFunction = (...args: any) => any;

export type Predicate<TElement> = Parameters<TElement[]["findIndex"]>[0];
export type ValueOrPredicate<TElement> = TElement extends AnyFunction ? never : (TElement | Predicate<TElement>);
