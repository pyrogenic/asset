import { sync } from "./sync";

describe("sync", () => {
    it("works with empty arrays", () => {
        const from = [];
        const to = [];
        sync(from, to);
        expect(from).toEqual([]);
        expect(to).toEqual([]);
        expect(to.sort()).toEqual(from.sort());
    });

    it("copies to empty array", () => {
        const from = [4, 3, 2, 1];
        const to = [];
        sync(from, to);
        expect(from).toEqual([4, 3, 2, 1]);
        expect(to).toEqual(from);
        expect(to.sort()).toEqual(from.sort());
    });

    it("removes existing differences (that wouldn't leave anything behind)", () => {
        const from = [4, 3, 2, 1];
        const to = [6, 7];
        sync(from, to);
        expect(from).toEqual([4, 3, 2, 1]);
        expect(to).toEqual(from);
        expect(to.sort()).toEqual(from.sort());
    });

    it("doesn't touch already equal", () => {
        const from = [4, 3, 2, 1];
        const to = [1, 2, 3, 4];
        sync(from, to);
        expect(from).toEqual([4, 3, 2, 1]);
        expect(to).toEqual([1, 2, 3, 4]);
        expect(to.sort()).toEqual(from.sort());
    });

    it("snips extra (single)", () => {
        const from = [4, 3, 2, 1];
        const to = [1, 2, 6, 3, 4];
        sync(from, to);
        expect(from).toEqual([4, 3, 2, 1]);
        expect(to).toEqual([1, 2, 3, 4]);
        expect(to.sort()).toEqual(from.sort());
    });

    it("snips extra (multiple)", () => {
        const from = [4, 3, 2, 1];
        const to = [1, 2, 6, 7, 3, 8, 4, 9, 10];
        sync(from, to);
        expect(from).toEqual([4, 3, 2, 1]);
        expect(to).toEqual([1, 2, 3, 4]);
        expect(to.sort()).toEqual(from.sort());
    });

    it("adds new at end (single)", () => {
        const from = [4, 3, 2, 1];
        const to = [1, 2, 3];
        sync(from, to);
        expect(from).toEqual([4, 3, 2, 1]);
        expect(to).toEqual([1, 2, 3, 4]);
        expect(to.sort()).toEqual(from.sort());
    });

    it("adds new at end (multiple)", () => {
        const from = [4, 3, 2, 1];
        const to = [1, 3];
        sync(from, to);
        expect(from).toEqual([4, 3, 2, 1]);
        expect(to).toEqual([1, 3, 4, 2]);
        expect(to.sort()).toEqual(from.sort());
    });

    it("adds new at end (everything)", () => {
        const from = [4, 3, 2, 1];
        const to = [9, 1, 7, 8, 3, 5];
        sync(from, to);
        expect(from).toEqual([4, 3, 2, 1]);
        expect(to).toEqual([1, 3, 4, 2]);
        expect(to.sort()).toEqual(from.sort());
    });
});
