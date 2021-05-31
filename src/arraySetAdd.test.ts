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

describe("strings", () => {
    test("empty", () => {
        const container: Container = {
            strings: [],
        };
        arraySetAdd(container, "strings", "test");
        expect(container.strings).toEqual(["test"]);
    });

    test("existing", () => {
        const container: Container = {
            strings: ["zoo"],
        };
        arraySetAdd(container, "strings", "test");
        expect(container.strings).toEqual(["zoo", "test"]);
    });

    test("existing dupe", () => {
        const container: Container = {
            strings: ["test"],
        };
        arraySetAdd(container, "strings", "test");
        expect(container.strings).toEqual(["test"]);
    });

    test("existing different plus dupe", () => {
        const container: Container = {
            strings: ["zoo", "test"],
        };
        arraySetAdd(container, "strings", "test");
        expect(container.strings).toEqual(["zoo", "test"]);
        arraySetAdd(container, "strings", "zoo");
        expect(container.strings).toEqual(["zoo", "test"]);
        arraySetAdd(container, "strings", "alpha");
        expect(container.strings).toEqual(["zoo", "test", "alpha"]);
    });

    test("sorted (default)", () => {
        const container: Container = {
            strings: ["alpha", "zeta"],
        };
        arraySetAdd(container, "strings", "test", true);
        expect(container.strings).toEqual(["alpha", "test", "zeta"]);
        arraySetAdd(container, "strings", "test", true);
        expect(container.strings).toEqual(["alpha", "test", "zeta"]);
    });

    test("sorted (mru)", () => {
        const container: Container = {
            strings: ["alpha", "zeta"],
        };
        arraySetAdd(container, "strings", "test", "mru");
        expect(container.strings).toEqual(["alpha", "zeta", "test"]);
        arraySetAdd(container, "strings", "alpha", "mru");
        expect(container.strings).toEqual(["zeta", "test", "alpha"]);
    });

    test("sorted (comparer)", () => {
        const container: Container = {
            strings: ["alpha", "zeta"],
        };
        arraySetAdd(container, "strings", "test", testToHead);
        expect(container.strings).toEqual(["test", "alpha", "zeta"]);
        arraySetAdd(container, "strings", "alpha", testToHead);
        expect(container.strings).toEqual(["test", "alpha", "zeta"]);
    });

    test("undefined", () => {
        const container: Container = {};
        arraySetAdd(container, "strings", "test");
        expect(container.strings).toEqual(["test"]);
    });
});

describe("objects", () => {
    test("empty", () => {
        const container: Container = {
            objects: [],
        };
        arraySetAdd(container, "objects", testTest);
        expect(container.objects).toEqual([testTest]);
    });

    test("existing", () => {
        const container: Container = {
            objects: [zetaTest],
        };
        arraySetAdd(container, "objects", testTest);
        expect(container.objects).toEqual([zetaTest, testTest]);
    });

    test("existing dupe", () => {
        const container: Container = {
            objects: [testTest],
        };
        arraySetAdd(container, "objects", testTest);
        expect(container.objects).toEqual([testTest]);
    });

    test("existing different plus dupe", () => {
        const container: Container = {
            objects: [zetaTest, testTest],
        };
        arraySetAdd(container, "objects", testTest);
        expect(container.objects).toEqual([zetaTest, testTest]);
        arraySetAdd(container, "objects", zetaTest);
        expect(container.objects).toEqual([zetaTest, testTest]);
        arraySetAdd(container, "objects", alphaTest);
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

    test("sorted (mru)", () => {
        const container: Container = {
            objects: [alphaTest, zetaTest],
        };
        arraySetAdd(container, "objects", testTest, "mru");
        expect(container.objects).toEqual([alphaTest, zetaTest, testTest]);
        arraySetAdd(container, "objects", alphaTest, "mru");
        expect(container.objects).toEqual([zetaTest, testTest, alphaTest]);
    });

    test("sorted (comparer)", () => {
        const container: Container = {
            objects: [alphaTest, zetaTest],
        };
        arraySetAdd(container, "objects", testTest, compareTestsTestToHead);
        expect(container.objects).toEqual([testTest, alphaTest, zetaTest]);
        arraySetAdd(container, "objects", alphaTest, compareTestsTestToHead);
        expect(container.objects).toEqual([testTest, alphaTest, zetaTest]);
    });

    test("undefined", () => {
        const container: Container = {};
        arraySetAdd(container, "objects", testTest);
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

