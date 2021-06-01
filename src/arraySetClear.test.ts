import { arraySetClear } from "./arraySetClear";

class Test {
    constructor(public readonly value: string) { }
}

type Container = {
    strings?: string[],
    objects?: Test[],
};

const alphaTest = new Test("alpha");
const zetaTest = new Test("zeta");

describe("arraySetClear", () => {
    test("undefined", () => {
        const container: Container = {};
        expect(arraySetClear(container, "strings")).toBeUndefined();
        expect(arraySetClear(container, "objects")).toBeUndefined();
    });

    test("empty", () => {
        const strings = [];
        const objects = [];
        const container: Container = {
            strings,
            objects,
        };
        expect(arraySetClear(container, "strings")).toBe(strings);
        expect(strings).toHaveProperty("length", 0);
        expect(arraySetClear(container, "objects")).toBe(objects);
        expect(objects).toHaveProperty("length", 0);
    });

    test("empty", () => {
        const strings = ["alpha", "zeta"];
        const objects = [alphaTest, zetaTest];
        const container: Container = {
            strings,
            objects,
        };
        expect(arraySetClear(container, "strings")).toBe(strings);
        expect(strings).toHaveProperty("length", 0);
        expect(arraySetClear(container, "objects")).toBe(objects);
        expect(objects).toHaveProperty("length", 0);
    });
});
