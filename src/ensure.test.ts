import { ensure } from "./ensure";

class Test {
    constructor(public value?: string) { }
}

type Container = {
    str?: string,
    obj?: Test,
    strings?: string[],
    objects?: Test[],
};

const alphaTest = new Test("alpha");
const zetaTest = new Test("zeta");

describe("ensure", () => {
    test("undefined array", () => {
        const container: Container = {};
        const strings: string[] = ensure(container, "strings", { factory: (): string[] => [] });
        expect(strings).toEqual([]);
        expect(container.strings).toBe(strings);
        const objects: Test[] = ensure(container, "objects", { factory: (): Test[] => [] });
        expect(objects).toEqual([]);
        expect(container.objects).toBe(objects);
    });

    test("defined array", () => {
        const strings = ["alpha"];
        const objects = [alphaTest];
        const container: Container = { strings, objects };
        expect(ensure(container, "strings", { factory: (): string[] => [] })).toBe(strings);
        expect(container.strings).toBe(strings);
        expect(ensure(container, "objects", { factory: (): Test[] => [] })).toBe(objects);
        expect(container.objects).toBe(objects);
    });

    test("undefined object", () => {
        const container: Container = {};
        const str: string = ensure(container, "str", { factory: () => "test" });
        expect(str).toEqual("test");
        expect(container.str).toBe(str);
        const obj: Test = ensure(container, "obj", Test);
        expect(obj).toHaveProperty("value", undefined);
        expect(container.obj).toBe(obj);
    });

    test("defined object", () => {
        const str = "alpha";
        const obj = alphaTest;
        const container: Container = { str, obj };
        expect(ensure(container, "str", { factory: () => "other" })).toBe(str);
        expect(container.str).toBe(str);
        expect(ensure(container, "obj", Test)).toBe(obj);
        expect(container.obj).toBe(obj);
    });
});
