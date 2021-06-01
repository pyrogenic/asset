import { arraySetRemove } from "./arraySetRemove";

class Test {
    constructor(public readonly value: string) { }
}

type Container = {
    strings?: string[],
    objects?: Test[],
};

const alphaTest = new Test("alpha");
const zetaTest = new Test("zeta");

describe("arraySetRemove", () => {
    test("undefined", () => {
        const container: Container = {};
        expect(arraySetRemove(container, "strings", "alpha")).toBeFalsy();
        expect(arraySetRemove(container, "objects", alphaTest)).toBeFalsy();
    });

    test("empty", () => {
        const strings: string[] = [];
        const objects: Test[] = [];
        const container: Container = { strings, objects };
        expect(arraySetRemove(container, "strings", "alpha")).toBeFalsy();
        expect(arraySetRemove(container, "objects", alphaTest)).toBeFalsy();
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
    });

    test("not empty", () => {
        const strings: string[] = ["zeta"];
        const objects: Test[] = [zetaTest];
        const container: Container = { strings, objects };
        expect(arraySetRemove(container, "strings", "alpha")).toBeFalsy();
        expect(arraySetRemove(container, "objects", alphaTest)).toBeFalsy();
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
        expect(arraySetRemove(container, "strings", "zeta")).toBeTruthy();
        expect(arraySetRemove(container, "objects", zetaTest)).toBeTruthy();
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
        expect(arraySetRemove(container, "strings", "zeta")).toBeFalsy();
        expect(arraySetRemove(container, "objects", zetaTest)).toBeFalsy();
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
    });
    test("predicate, undefined", () => {
        const container: Container = {};
        expect(arraySetRemove(container, "strings", startsWithA)).toBeFalsy();
        expect(arraySetRemove(container, "objects", testValueStartsWithA)).toBeFalsy();
    });

    test("predicate, empty", () => {
        const strings: string[] = [];
        const objects: Test[] = [];
        const container: Container = { strings, objects };
        expect(arraySetRemove(container, "strings", startsWithA)).toBeFalsy();
        expect(arraySetRemove(container, "objects", testValueStartsWithA)).toBeFalsy();
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
    });

    test("predicate, not empty", () => {
        const strings: string[] = ["zeta"];
        const objects: Test[] = [zetaTest];
        const container: Container = { strings, objects };
        expect(arraySetRemove(container, "strings", startsWithA)).toBeFalsy();
        expect(arraySetRemove(container, "objects", testValueStartsWithA)).toBeFalsy();
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
        expect(arraySetRemove(container, "strings", "zeta")).toBeTruthy();
        expect(arraySetRemove(container, "objects", testValueStartsWithZ)).toBeTruthy();
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
        expect(arraySetRemove(container, "strings", "zeta")).toBeFalsy();
        expect(arraySetRemove(container, "objects", testValueStartsWithZ)).toBeFalsy();
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
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
