import { array } from "./array";

describe("array", () => {
    test("undefined", () => {
        expect(array(undefined)).toEqual(undefined);
    });

    test("primitives", () => {
        expect(array(false)).toEqual([false]);
        expect(array(true)).toEqual([true]);
        expect(array(1)).toEqual([1]);
        expect(array("foo")).toEqual(["foo"]);
    });

    test("primitive arrays", () => {
        expect(array([false])).toEqual([false]);
        expect(array([true])).toEqual([true]);
        expect(array([1])).toEqual([1]);
        expect(array(["foo"])).toEqual(["foo"]);
    });
});
