import { ensureMap } from "./ensureMap";
type Container = {
    map?: { [key: string]: string };
}

describe("ensureMap", () => {
    test("undefined", () => {
        const container: Container = {};
        const map = ensureMap(container, "map");
        expect(map).toEqual({});
        expect(container.map).toBe(map);
        expect(ensureMap(container, "map")).toBe(map);
    });
    test("defined", () => {
        const map = {};
        const container: Container = { map };
        expect(ensureMap(container, "map")).toBe(map);
        expect(container.map).toBe(map);
        expect(ensureMap(container, "map")).toBe(map);
    });
});
