import { spread } from "./spread";
describe("spread", () => {
    test("undefined", () => {
        expect(spread(undefined)).toEqual([]);
    });
    ["test", 1, true].forEach((value) => {
        test(`single ${typeof value}`, () => {
            expect(spread(value)).toEqual([value]);
        });
        test(`monad of ${typeof value}`, () => {
            const q = [value];
            expect(spread(q)).toBe(q);
        });
        test(`array of ${typeof value}`, () => {
            const q = [value, Math.random()];
            expect(spread(q)).toBe(q);
        });
    })
});
