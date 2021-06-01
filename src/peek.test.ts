import { peek } from "./peek";
describe("peek", () => {
    test("undefined", () => {
        expect(peek(undefined)).toBeUndefined();
    });
    ["test", 1, true].forEach((value) => {
        test(`single ${typeof value}`, () => {
            expect(peek(value)).toBe(value);
        });
        test(`monad of ${typeof value}`, () => {
            expect(peek([value])).toBe(value);
        });
        test(`array of ${typeof value}`, () => {
            expect(peek([value, Math.random()])).toBe(value);
        });
    })
});
