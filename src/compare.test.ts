import { compare } from "./compare";
// function permutations<T>(array0: T[], n: number) {
//     if (array0.length < n) {
//         return [];
//     }
//     let recur = ((array: T[], n: number) => {
//         if (--n < 0) {
//             return [[]];
//         }
//         let permutations = [];
//         array.forEach((value, index, array) => {
//             array = array.slice();
//             array.splice(index, 1);
//             recur(array, n).forEach(permutation => {
//                 permutation.unshift(value);
//                 permutations.push(permutation);
//             });
//         });
//         return permutations;
//     });
//     return recur(array0, n);
// }
describe("compare", () => {
    test("undefined", () => {
        expect(compare(undefined, undefined)).toEqual(0);
    });
    describe("string", () => {
        const STRINGS = ["", "foo", "undefined"];
        STRINGS.forEach((a) => () => {

            test(`${a} =?= `, () => {
                expect(compare(a, undefined)).toEqual(1);
                expect(compare(a, undefined, { emptyLast: true })).toEqual(-1);
            });

            test(` =?= ${a}`, () => {
                expect(compare(undefined, a)).toEqual(-1);
                expect(compare(undefined, a, { emptyLast: true })).toEqual(1);
            });

            test(`${a} =?= []`, () => {
                expect(compare(a, [])).toEqual(1);
                expect(compare(a, [], { emptyLast: true })).toEqual(-1);
            });

            test(`${a} =?= []`, () => {
                expect(compare(a, [])).toEqual(1);
                expect(compare(a, [], { emptyLast: true })).toEqual(-1);
            });

            test(`[] =?= ${[a]}`, () => {
                expect(compare([], [a])).toEqual(-1);
                expect(compare([], [a], { emptyLast: true })).toEqual(1);
            });

            test(`[] =?= ${[a]}`, () => {
                expect(compare([], [a])).toEqual(-1);
                expect(compare([], [a], { emptyLast: true })).toEqual(1);
            });

            STRINGS.forEach((b) => {
                test(`${a} =?= ${b}`, () => {
                    expect(compare(a, b)).toEqual(a.localeCompare(b));
                });
                test(`[${a}] =?= ${b}`, () => {
                    expect(compare([a], b)).toEqual(a.localeCompare(b));
                });
                test(`${a} =?= [${b}]`, () => {
                    expect(compare([a], b)).toEqual(a.localeCompare(b));
                });
            });
        });
    });
    test("array[undefined]", () => {
        expect(compare([], [])).toEqual(0);
        expect(compare([undefined], [undefined])).toEqual(0);
    });
});
