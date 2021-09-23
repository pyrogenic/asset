import { first } from "./first";
describe("first", () => {
    test("undefined", () => {
        expect(first(undefined)).toBeUndefined();
    });
    ["test", 1, true].forEach((value) => {
        test(`single ${typeof value}`, () => {
            expect(first(value)).toBe(value);
        });
        test(`monad of ${typeof value}`, () => {
            expect(first([value])).toBe(value);
        });
        test(`array of ${typeof value}`, () => {
            expect(first([value, Math.random()])).toBe(value);
        });
    })
});
