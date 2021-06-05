import { arraySetHas } from "./arraySetHas";
class Test {
    constructor(public readonly value: string) { }
}

type Container = {
    strings?: string[],
    objects?: Test[],
};

const alphaTest = new Test("alpha");
const zetaTest = new Test("zeta");

describe("arraySetHas", () => {
    test("undefined", () => {
        const container: Container = {};
        expect(arraySetHas(container, "strings", "alpha")).toBe(false);
        const arr = container.strings;
        expect(arraySetHas(arr, "alpha")).toBe(false);
        expect(arraySetHas(container, "objects", alphaTest)).toBe(false);
    });

    test("empty", () => {
        const strings = [];
        const objects = [];
        const container: Container = {
            strings,
            objects,
        };
        expect(arraySetHas(container, "strings", "alpha")).toBe(false);
        expect(arraySetHas(container.strings, "alpha")).toBe(false);
        expect(arraySetHas(container, "objects", alphaTest)).toBe(false);
    });

    test("not empty", () => {
        const strings = ["alpha"];
        const objects = [alphaTest];
        const container: Container = {
            strings,
            objects,
        };
        expect(arraySetHas(container, "strings", "alpha")).toBe(true);
        expect(arraySetHas(container.strings, "alpha")).toBe(true);
        expect(arraySetHas(container, "strings", "zeta")).toBe(false);
        expect(arraySetHas(container.strings, "zeta")).toBe(false);
        expect(arraySetHas(container, "objects", alphaTest)).toBe(true);
        expect(arraySetHas(container, "objects", zetaTest)).toBe(false);
    });

    test("pedicate, undefined", () => {
        const container: Container = {};
        expect(arraySetHas(container, "strings", startsWithA)).toBe(false);
        expect(arraySetHas(container.strings, startsWithA)).toBe(false);
        expect(arraySetHas(container, "objects", testValueStartsWithA)).toBe(false);
    });

    test("pedicate, empty", () => {
        const strings = [];
        const objects = [];
        const container: Container = {
            strings,
            objects,
        };
        expect(arraySetHas(container, "strings", startsWithA)).toBe(false);
        expect(arraySetHas(container.strings, startsWithA)).toBe(false);
        expect(arraySetHas(container, "objects", testValueStartsWithA)).toBe(false);
    });

    test("pedicate, not empty", () => {
        const strings = ["alpha"];
        const objects = [alphaTest];
        const container: Container = {
            strings,
            objects,
        };
        expect(arraySetHas(container, "strings", startsWithA)).toBe(true);
        expect(arraySetHas(container.strings, startsWithA)).toBe(true);
        expect(arraySetHas(container, "strings", startsWithZ)).toBe(false);
        expect(arraySetHas(container.strings, startsWithZ)).toBe(false);
        expect(arraySetHas(container, "objects", testValueStartsWithA)).toBe(true);
        expect(arraySetHas(container, "objects", testValueStartsWithZ)).toBe(false);
    });
});

function startsWithA(value: string) {
    return value.startsWith("a");
}

function testValueStartsWithA({ value }: Test) {
    return value.startsWith("a");
}

function startsWithZ(value: string) {
    return value.startsWith("z");
}

function testValueStartsWithZ({ value }: Test) {
    return value.startsWith("z");
}
