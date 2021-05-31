import { ArraySetContainer, PropertyName, PropertyNamesOfType } from "./index";

// type IQ = {a?: string[]};
// type tt = PropertyNamesOfType<IQ, Pick<any[], "slice" | "length"> | undefined>;
// const ttt: tt = "a";
// const iq: IQ = {};
// const q = iq[ttt];

export function arraySetClear<
    TElement,
    TKey extends PropertyName>(
        container: ArraySetContainer<TKey, TElement>,
        key: TKey) {
    const set: Pick<any[], "slice" | "length"> | undefined = container[key];
    if (set !== undefined) {
        set.slice(0, set.length);
    }
    return set;
}
