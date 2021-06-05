import { arraySetAdd } from "./arraySetAdd";

class Test {
    constructor(public readonly value: string) { }
}

type Container = {
    strings?: string[],
    objects?: Test[],
};

const alphaTest = new Test("alpha");
const testTest = new Test("test");
const zetaTest = new Test("zeta");

describe("uncontained strings", () => {
    test("empty", () => {
        const container = [];
        expect(arraySetAdd(container, "test")).toBeTruthy();
        expect(container).toEqual(["test"]);
    });

    test("existing", () => {
        const container = ["zoo"];
        expect(arraySetAdd(container, "test")).toBeTruthy();
        expect(container).toEqual(["zoo", "test"]);
    });

    test("existing dupe", () => {
        const container = ["test"];
        expect(arraySetAdd(container, "test")).toBeFalsy();
        expect(container).toEqual(["test"]);
    });

    test("existing different plus dupe", () => {
        const container = ["zoo", "test"];
        expect(arraySetAdd(container, "test")).toBeFalsy();
        expect(container).toEqual(["zoo", "test"]);
        expect(arraySetAdd(container, "zoo")).toBeFalsy();
        expect(container).toEqual(["zoo", "test"]);
        expect(arraySetAdd(container, "alpha")).toBeTruthy();
        expect(container).toEqual(["zoo", "test", "alpha"]);
    });

    test("sorted (default)", () => {
        const container = ["alpha", "zeta"];
        expect(arraySetAdd(container, "test", true)).toBeTruthy();
        expect(container).toEqual(["alpha", "test", "zeta"]);
        expect(arraySetAdd(container, "test", true)).toBeFalsy();
        expect(container).toEqual(["alpha", "test", "zeta"]);
    });

    test("sorted (mru)", () => {
        const container = ["alpha", "zeta"];
        expect(arraySetAdd(container, "test", "mru")).toBeTruthy();
        expect(container).toEqual(["alpha", "zeta", "test"]);
        expect(arraySetAdd(container, "alpha", "mru")).toBeFalsy();
        expect(container).toEqual(["zeta", "test", "alpha"]);
    });

    test("sorted (comparer)", () => {
        const container = ["alpha", "zeta"];
        expect(arraySetAdd(container, "test", testToHead)).toBeTruthy();
        expect(container).toEqual(["test", "alpha", "zeta"]);
        expect(arraySetAdd(container, "alpha", testToHead)).toBeFalsy();
        expect(container).toEqual(["test", "alpha", "zeta"]);
    });

    // shouldn't compile
    // test("undefined", () => {
    //     expect(arraySetAdd(undefined, "test")).toBeFalsy();
    // });
});

describe("strings", () => {
    test("empty", () => {
        const container: Container = {
            strings: [],
        };
        expect(arraySetAdd(container, "strings", "test")).toBeTruthy();
        expect(container.strings).toEqual(["test"]);
    });

    test("existing", () => {
        const container: Container = {
            strings: ["zoo"],
        };
        expect(arraySetAdd(container, "strings", "test")).toBeTruthy();
        expect(container.strings).toEqual(["zoo", "test"]);
    });

    test("existing dupe", () => {
        const container: Container = {
            strings: ["test"],
        };
        expect(arraySetAdd(container, "strings", "test")).toBeFalsy();
        expect(container.strings).toEqual(["test"]);
    });

    test("existing different plus dupe", () => {
        const container: Container = {
            strings: ["zoo", "test"],
        };
        expect(arraySetAdd(container, "strings", "test")).toBeFalsy();
        expect(container.strings).toEqual(["zoo", "test"]);
        expect(arraySetAdd(container, "strings", "zoo")).toBeFalsy();
        expect(container.strings).toEqual(["zoo", "test"]);
        expect(arraySetAdd(container, "strings", "alpha")).toBeTruthy();
        expect(container.strings).toEqual(["zoo", "test", "alpha"]);
    });

    test("sorted (default)", () => {
        const container: Container = {
            strings: ["alpha", "zeta"],
        };
        expect(arraySetAdd(container, "strings", "test", true)).toBeTruthy();
        expect(container.strings).toEqual(["alpha", "test", "zeta"]);
        expect(arraySetAdd(container, "strings", "test", true)).toBeFalsy();
        expect(container.strings).toEqual(["alpha", "test", "zeta"]);
    });

    test("sorted (mru)", () => {
        const container: Container = {
            strings: ["alpha", "zeta"],
        };
        expect(arraySetAdd(container, "strings", "test", "mru")).toBeTruthy();
        expect(container.strings).toEqual(["alpha", "zeta", "test"]);
        expect(arraySetAdd(container, "strings", "alpha", "mru")).toBeFalsy();
        expect(container.strings).toEqual(["zeta", "test", "alpha"]);
    });

    test("sorted (comparer)", () => {
        const container: Container = {
            strings: ["alpha", "zeta"],
        };
        expect(arraySetAdd(container, "strings", "test", testToHead)).toBeTruthy();
        expect(container.strings).toEqual(["test", "alpha", "zeta"]);
        expect(arraySetAdd(container, "strings", "alpha", testToHead)).toBeFalsy();
        expect(container.strings).toEqual(["test", "alpha", "zeta"]);
    });

    test("undefined", () => {
        const container: Container = {};
        expect(arraySetAdd(container, "strings", "test")).toBeTruthy();
        expect(container.strings).toEqual(["test"]);
    });
});

describe("objects", () => {
    test("empty", () => {
        const container: Container = {
            objects: [],
        };
        expect(arraySetAdd(container, "objects", testTest)).toBeTruthy();
        expect(container.objects).toEqual([testTest]);
    });

    test("existing", () => {
        const container: Container = {
            objects: [zetaTest],
        };
        expect(arraySetAdd(container, "objects", testTest)).toBeTruthy();
        expect(container.objects).toEqual([zetaTest, testTest]);
    });

    test("existing dupe", () => {
        const container: Container = {
            objects: [testTest],
        };
        expect(arraySetAdd(container, "objects", testTest)).toBeFalsy();
        expect(container.objects).toEqual([testTest]);
    });

    test("existing different plus dupe", () => {
        const container: Container = {
            objects: [zetaTest, testTest],
        };
        expect(arraySetAdd(container, "objects", testTest)).toBeFalsy();
        expect(container.objects).toEqual([zetaTest, testTest]);
        expect(arraySetAdd(container, "objects", zetaTest)).toBeFalsy();
        expect(container.objects).toEqual([zetaTest, testTest]);
        expect(arraySetAdd(container, "objects", alphaTest)).toBeTruthy();
        expect(container.objects).toEqual([zetaTest, testTest, alphaTest]);
    });

    // this correctly fails to compile (no default comparer for objects)
    // test("sorted (default)", () => {
    //     const container: Container = {
    //         objects: [alphaTest, zetaTest],
    //     };
    //     arraySetAdd(container, "objects", testTest, true);
    //     expect(container.objects).toEqual([alphaTest, testTest, zetaTest]);
    //     arraySetAdd(container, "objects", testTest, true);
    //     expect(container.objects).toEqual([alphaTest, testTest, zetaTest]);
    // });

    test("sorted (straight)", () => {
        const container: Container = {
            objects: [alphaTest, zetaTest],
        };
        expect(arraySetAdd(container, "objects", testTest, compareTests)).toBeTruthy();
        expect(container.objects).toEqual([alphaTest, testTest, zetaTest]);
        expect(arraySetAdd(container, "objects", testTest, compareTests)).toBeFalsy();
        expect(container.objects).toEqual([alphaTest, testTest, zetaTest]);
    });

    test("sorted (mru)", () => {
        const container: Container = {
            objects: [alphaTest, zetaTest],
        };
        expect(arraySetAdd(container, "objects", testTest, "mru")).toBeTruthy();
        expect(container.objects).toEqual([alphaTest, zetaTest, testTest]);
        expect(arraySetAdd(container, "objects", alphaTest, "mru")).toBeFalsy();
        expect(container.objects).toEqual([zetaTest, testTest, alphaTest]);
    });

    test("sorted (comparer)", () => {
        const container: Container = {
            objects: [alphaTest, zetaTest],
        };
        expect(arraySetAdd(container, "objects", testTest, compareTestsTestToHead)).toBeTruthy();
        expect(container.objects).toEqual([testTest, alphaTest, zetaTest]);
        expect(arraySetAdd(container, "objects", alphaTest, compareTestsTestToHead)).toBeFalsy();
        expect(container.objects).toEqual([testTest, alphaTest, zetaTest]);
    });

    test("undefined", () => {
        const container: Container = {};
        expect(arraySetAdd(container, "objects", testTest)).toBeTruthy();
        expect(container.objects).toEqual([testTest]);
    });
});

function testToHead(a: string, b: string) {
    return a === "test" ? -1 : b === "test" ? 1 : a.localeCompare(b);
}

function compareTests({ value: a }: Test, { value: b }: Test) {
    return a.localeCompare(b);
}

function compareTestsTestToHead({ value: a }: Test, { value: b }: Test) {
    return a === "test" ? -1 : b === "test" ? 1 : a.localeCompare(b);
}

