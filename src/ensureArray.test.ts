import { ensureArray } from "./ensureArray";

class Test {
    constructor(public value?: string) { }
}

type Container = {
    strings?: string[],
    objects?: Test[],
};

const alphaTest = new Test("alpha");
const zetaTest = new Test("zeta");

describe("ensureArray", () => {
    test("undefined", () => {
        const container: Container = {};
        const strings = ensureArray(container, "strings");
        expect(strings).toEqual([]);
        expect(container.strings).toBe(strings);
        expect(ensureArray(container, "strings")).toBe(strings);
        expect(container.strings).toBe(strings);
        const objects = ensureArray(container, "objects");
        expect(objects).toEqual([]);
        expect(container.objects).toBe(objects);
        expect(ensureArray(container, "objects")).toBe(objects);
        expect(container.objects).toBe(objects);
    });

    test("defined", () => {
        const strings = ["alpha", "zeta"];
        const objects = [alphaTest, zetaTest];
        const container: Container = { strings, objects };
        expect(ensureArray(container, "strings")).toBe(strings);
        expect(container.strings).toBe(strings);
        expect(ensureArray(container, "objects")).toBe(objects);
        expect(container.objects).toBe(objects);
    });
});
