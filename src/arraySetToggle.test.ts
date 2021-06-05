import { arraySetToggle } from "./arraySetToggle";

class Test {
    constructor(public readonly value: string) { }
}

type Container = {
    strings?: string[],
    objects?: Test[],
};

const alphaTest = new Test("alpha");
const zetaTest = new Test("zeta");

describe("arraySetToggle", () => {
    test("undefined", () => {
        const container: Container = {};
        expect(arraySetToggle(container, "strings", "alpha")).toBeTruthy();
        expect(arraySetToggle(container, "objects", alphaTest)).toBeTruthy();
        expect(container).toHaveProperty("strings", ["alpha"]);
        expect(container).toHaveProperty("objects", [alphaTest]);
        expect(arraySetToggle(container.strings, "alpha")).toBeFalsy();
        expect(arraySetToggle(container.objects, alphaTest)).toBeFalsy();
        expect(container.strings).toEqual([]);
        expect(container.objects).toEqual([]);
        expect(arraySetToggle(container.strings, "alpha")).toBeTruthy();
        expect(arraySetToggle(container.objects, alphaTest)).toBeTruthy();
        expect(container.strings).toEqual(["alpha"]);
        expect(container.objects).toEqual([alphaTest]);
    });

    test("empty", () => {
        const strings: string[] = [];
        const objects: Test[] = [];
        const container: Container = { strings, objects };
        expect(arraySetToggle(container, "strings", "alpha")).toBeTruthy();
        expect(arraySetToggle(container, "objects", alphaTest)).toBeTruthy();
        expect(container).toHaveProperty("strings", ["alpha"]);
        expect(container).toHaveProperty("objects", [alphaTest]);
        expect(arraySetToggle(container, "strings", "alpha")).toBeFalsy();
        expect(arraySetToggle(container, "objects", alphaTest)).toBeFalsy();
        expect(container).toHaveProperty("strings", []);
        expect(container).toHaveProperty("objects", []);
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
    });

    test("not empty", () => {
        const strings: string[] = ["zeta"];
        const objects: Test[] = [zetaTest];
        const container: Container = { strings, objects };
        expect(arraySetToggle(container, "strings", "alpha")).toBeTruthy();
        expect(arraySetToggle(container, "objects", alphaTest)).toBeTruthy();
        expect(container).toHaveProperty("strings", ["zeta", "alpha"]);
        expect(container).toHaveProperty("objects", [zetaTest, alphaTest]);
        expect(arraySetToggle(container, "strings", "zeta")).toBeFalsy();
        expect(arraySetToggle(container, "objects", zetaTest)).toBeFalsy();
        expect(container).toHaveProperty("strings", ["alpha"]);
        expect(container).toHaveProperty("objects", [alphaTest]);
        expect(arraySetToggle(container, "strings", "zeta")).toBeTruthy();
        expect(arraySetToggle(container, "objects", zetaTest)).toBeTruthy();
        expect(container).toHaveProperty("strings", ["alpha", "zeta"]);
        expect(container).toHaveProperty("objects", [alphaTest, zetaTest]);
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
    });

    test("sorted", () => {
        const strings: string[] = ["zeta"];
        const objects: Test[] = [zetaTest];
        const container: Container = { strings, objects };
        expect(arraySetToggle(container, "strings", "alpha", true)).toBeTruthy();
        expect(arraySetToggle(container, "objects", alphaTest, sortByTestValue)).toBeTruthy();
        expect(container).toHaveProperty("strings", ["alpha", "zeta"]);
        expect(container).toHaveProperty("objects", [alphaTest, zetaTest]);
        expect(arraySetToggle(container, "strings", "zeta", true)).toBeFalsy();
        expect(arraySetToggle(container, "objects", zetaTest, sortByTestValue)).toBeFalsy();
        expect(container).toHaveProperty("strings", ["alpha"]);
        expect(container).toHaveProperty("objects", [alphaTest]);
        expect(arraySetToggle(container, "strings", "zeta", true)).toBeTruthy();
        expect(arraySetToggle(container, "objects", zetaTest, sortByTestValue)).toBeTruthy();
        expect(container).toHaveProperty("strings", ["alpha", "zeta"]);
        expect(container).toHaveProperty("objects", [alphaTest, zetaTest]);
        expect(container.strings).toBe(strings);
        expect(container.objects).toBe(objects);
        expect(arraySetToggle(strings, "zeta", true)).toBeFalsy();
        expect(arraySetToggle(objects, zetaTest, sortByTestValue)).toBeFalsy();
        expect(arraySetToggle(strings, "zeta", true)).toBeTruthy();
        expect(arraySetToggle(objects, zetaTest, sortByTestValue)).toBeTruthy();
    });
});

function sortByTestValue({ value: a }: Test, { value: b }: Test) {
    return a.localeCompare(b);
}
