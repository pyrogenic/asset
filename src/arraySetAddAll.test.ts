import { arraySetAddAll } from "./arraySetAddAll";

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
        arraySetAddAll(container, "strings", undefined);
        expect(container.strings).toEqual([]);

        arraySetAddAll(container, "strings", []);
        expect(container.strings).toEqual([]);

        arraySetAddAll(container, "strings", ["test"]);
        expect(container.strings).toEqual(["test"]);
        arraySetAddAll(container, "strings", ["foo", "test", "bar"]);
        expect(container.strings).toEqual(["test", "foo", "bar"]);

    });

    test("existing", () => {
        const container: Container = {
            strings: ["zoo"],
        };
        arraySetAddAll(container, "strings", ["test"]);
        expect(container.strings).toEqual(["zoo", "test"]);
        arraySetAddAll(container, "strings", ["foo", "test", "bar"]);
        expect(container.strings).toEqual(["zoo", "test", "foo", "bar"]);
    });

    test("existing dupe", () => {
        const container: Container = {
            strings: ["test"],
        };
        arraySetAddAll(container, "strings", ["test"]);
        expect(container.strings).toEqual(["test"]);
        arraySetAddAll(container, "strings", ["test", "test"]);
        expect(container.strings).toEqual(["test"]);
    });

    test("existing different plus dupe", () => {
        const container: Container = {
            strings: ["zoo", "test"],
        };
        arraySetAddAll(container, "strings", ["test"]);
        expect(container.strings).toEqual(["zoo", "test"]);
        arraySetAddAll(container, "strings", ["zoo", "test"]);
        expect(container.strings).toEqual(["zoo", "test"]);
        arraySetAddAll(container, "strings", ["alpha", "zoo", "test"]);
        expect(container.strings).toEqual(["zoo", "test", "alpha"]);
    });

    test("sorted (default)", () => {
        const container: Container = {
            strings: ["alpha", "zeta"],
        };
        arraySetAddAll(container, "strings", ["test"], true);
        expect(container.strings).toEqual(["alpha", "test", "zeta"]);
        arraySetAddAll(container, "strings", ["test"], true);
        expect(container.strings).toEqual(["alpha", "test", "zeta"]);
        arraySetAddAll(container, "strings", ["alpha", "zoo", "test"], true);
        expect(container.strings).toEqual(["alpha", "test", "zeta", "zoo"]);
    });

    test("sorted (mru)", () => {
        const container: Container = {
            strings: ["alpha", "zeta"],
        };
        arraySetAddAll(container, "strings", ["test"], "mru");
        expect(container.strings).toEqual(["alpha", "zeta", "test"]);
        arraySetAddAll(container, "strings", ["alpha"], "mru");
        expect(container.strings).toEqual(["zeta", "test", "alpha"]);
        arraySetAddAll(container, "strings", ["alpha", "zoo", "test"], "mru");
        expect(container.strings).toEqual(["zeta", "alpha", "zoo", "test"]);
    });

    test("sorted (comparer)", () => {
        const container: Container = {
            strings: ["alpha", "zeta"],
        };
        arraySetAddAll(container, "strings", ["test"], testToHead);
        expect(container.strings).toEqual(["test", "alpha", "zeta"]);
        arraySetAddAll(container, "strings", ["alpha"], testToHead);
        expect(container.strings).toEqual(["test", "alpha", "zeta"]);
        arraySetAddAll(container, "strings", ["alpha", "zoo", "test"], testToHead);
        expect(container.strings).toEqual(["test", "alpha", "zeta", "zoo"]);
    });

    test("undefined", () => {
        const container: Container = {};
        arraySetAddAll(container, "strings", undefined);
        expect(container.strings).toEqual(undefined);

        arraySetAddAll(container, "strings", []);
        expect(container.strings).toEqual(undefined);

        arraySetAddAll(container, "strings", ["test"]);
        expect(container.strings).toEqual(["test"]);

        arraySetAddAll(container, "strings", ["test", "alpha"]);
        expect(container.strings).toEqual(["test", "alpha"]);
    });
});

describe("uncontained ", () => {
    test("empty", () => {
        const container = [];
        arraySetAddAll(container, undefined);
        expect(container).toEqual([]);

        arraySetAddAll(container, []);
        expect(container).toEqual([]);

        arraySetAddAll(container, ["test"]);
        expect(container).toEqual(["test"]);
        arraySetAddAll(container, ["foo", "test", "bar"]);
        expect(container).toEqual(["test", "foo", "bar"]);

    });

    test("existing", () => {
        const container = ["zoo"];
        arraySetAddAll(container, ["test"]);
        expect(container).toEqual(["zoo", "test"]);
        arraySetAddAll(container, ["foo", "test", "bar"]);
        expect(container).toEqual(["zoo", "test", "foo", "bar"]);
    });

    test("existing dupe", () => {
        const container = ["test"];
        arraySetAddAll(container, ["test"]);
        expect(container).toEqual(["test"]);
        arraySetAddAll(container, ["test", "test"]);
        expect(container).toEqual(["test"]);
    });

    test("existing different plus dupe", () => {
        const container = ["zoo", "test"];
        arraySetAddAll(container, ["test"]);
        expect(container).toEqual(["zoo", "test"]);
        arraySetAddAll(container, ["zoo", "test"]);
        expect(container).toEqual(["zoo", "test"]);
        arraySetAddAll(container, ["alpha", "zoo", "test"]);
        expect(container).toEqual(["zoo", "test", "alpha"]);
    });

    test("sorted (default)", () => {
        const container = ["alpha", "zeta"];
        arraySetAddAll(container, ["test"], true);
        expect(container).toEqual(["alpha", "test", "zeta"]);
        arraySetAddAll(container, ["test"], true);
        expect(container).toEqual(["alpha", "test", "zeta"]);
        arraySetAddAll(container, ["alpha", "zoo", "test"], true);
        expect(container).toEqual(["alpha", "test", "zeta", "zoo"]);
    });

    test("sorted (mru)", () => {
        const container = ["alpha", "zeta"];
        arraySetAddAll(container, ["test"], "mru");
        expect(container).toEqual(["alpha", "zeta", "test"]);
        arraySetAddAll(container, ["alpha"], "mru");
        expect(container).toEqual(["zeta", "test", "alpha"]);
        arraySetAddAll(container, ["alpha", "zoo", "test"], "mru");
        expect(container).toEqual(["zeta", "alpha", "zoo", "test"]);
    });

    test("sorted (comparer)", () => {
        const container = ["alpha", "zeta"];
        arraySetAddAll(container, ["test"], testToHead);
        expect(container).toEqual(["test", "alpha", "zeta"]);
        arraySetAddAll(container, ["alpha"], testToHead);
        expect(container).toEqual(["test", "alpha", "zeta"]);
        arraySetAddAll(container, ["alpha", "zoo", "test"], testToHead);
        expect(container).toEqual(["test", "alpha", "zeta", "zoo"]);
    });
});

describe("objects", () => {
    test("empty", () => {
        const container: Container = {
            objects: [],
        };
        arraySetAddAll(container, "objects", [testTest]);
        expect(container.objects).toEqual([testTest]);
    });

    test("existing", () => {
        const container: Container = {
            objects: [zetaTest],
        };
        arraySetAddAll(container, "objects", [testTest]);
        expect(container.objects).toEqual([zetaTest, testTest]);
        arraySetAddAll(container, "objects", [testTest, testTest]);
        expect(container.objects).toEqual([zetaTest, testTest]);
    });

    test("existing dupe", () => {
        const container: Container = {
            objects: [testTest],
        };
        arraySetAddAll(container, "objects", [testTest]);
        expect(container.objects).toEqual([testTest]);
    });

    test("existing different plus dupe", () => {
        const container: Container = {
            objects: [zetaTest, testTest],
        };
        arraySetAddAll(container, "objects", [testTest]);
        expect(container.objects).toEqual([zetaTest, testTest]);
        arraySetAddAll(container, "objects", [zetaTest]);
        expect(container.objects).toEqual([zetaTest, testTest]);
        arraySetAddAll(container, "objects", [alphaTest, zetaTest]);
        expect(container.objects).toEqual([zetaTest, testTest, alphaTest]);
    });

    // this correctly fails to compile (no default comparer for objects)
    // test("sorted (default)", () => {
    //     const container: Container = {
    //         objects: [alphaTest, zetaTest],
    //     };
    //     arraySetAddAll(container, "objects", [testTest], true);
    //     expect(container.objects).toEqual([alphaTest, testTest, zetaTest]);
    //     arraySetAddAll(container, "objects", [testTest], true);
    //     expect(container.objects).toEqual([alphaTest, testTest, zetaTest]);
    // });

    test("sorted (straight)", () => {
        const container: Container = {
            objects: [alphaTest, zetaTest],
        };
        arraySetAddAll(container, "objects", [testTest], compareTests);
        expect(container.objects).toEqual([alphaTest, testTest, zetaTest]);
        arraySetAddAll(container, "objects", [testTest, testTest], compareTests);
        expect(container.objects).toEqual([alphaTest, testTest, zetaTest]);
        arraySetAddAll(container, "objects", [alphaTest, testTest], compareTests);
        expect(container.objects).toEqual([alphaTest, testTest, zetaTest]);
    });

    test("sorted (mru)", () => {
        const container: Container = {
            objects: [alphaTest, zetaTest],
        };
        arraySetAddAll(container, "objects", [testTest], "mru");
        expect(container.objects).toEqual([alphaTest, zetaTest, testTest]);
        arraySetAddAll(container, "objects", [alphaTest], "mru");
        expect(container.objects).toEqual([zetaTest, testTest, alphaTest]);
        arraySetAddAll(container, "objects", [alphaTest, testTest], "mru");
        expect(container.objects).toEqual([zetaTest, alphaTest, testTest]);
    });

    test("sorted (comparer)", () => {
        const container: Container = {
            objects: [alphaTest, zetaTest],
        };
        arraySetAddAll(container, "objects", [testTest], compareTestsTestToHead);
        expect(container.objects).toEqual([testTest, alphaTest, zetaTest]);
        arraySetAddAll(container, "objects", [alphaTest], compareTestsTestToHead);
        expect(container.objects).toEqual([testTest, alphaTest, zetaTest]);
    });

    test("undefined", () => {
        const container: Container = {};
        arraySetAddAll(container, "objects", [testTest]);
        expect(container.objects).toEqual([testTest]);

        delete container.objects;
        arraySetAddAll(container, "objects", [testTest, testTest]);
        expect(container.objects).toEqual([testTest]);

        delete container.objects;
        arraySetAddAll(container, "objects", [testTest, zetaTest]);
        expect(container.objects).toEqual([testTest, zetaTest]);
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

