import { last } from "./last";
describe("last", () => {
    test("undefined", () => {
        expect(last(undefined)).toBeUndefined();
    });
    ["test", 1, true].forEach((value) => {
        test(`single ${typeof value}`, () => {
            expect(last(value)).toBe(value);
        });
        test(`monad of ${typeof value}`, () => {
            expect(last([value])).toBe(value);
        });
        test(`array of ${typeof value}`, () => {
            expect(last([value, Math.random()])).toBe(value);
        });
    })
});
