import * as Asset from "./index";

describe("asset", () => {
    it("imports without error", () => {
        expect(Asset).toHaveProperty("array");
        expect(Asset).toHaveProperty("arraySetAdd");
        expect(Asset).toHaveProperty("arraySetHas");
        expect(Asset).toHaveProperty("arraySetRemove");
        expect(Asset).toHaveProperty("arraySetToggle");
        expect(Asset).toHaveProperty("ensure");
        expect(Asset).toHaveProperty("ensureArray");
        expect(Asset).toHaveProperty("ensureMap");
        expect(Asset).toHaveProperty("peek");
        expect(Asset).toHaveProperty("spread");
        expect(Asset).toHaveProperty("sync");
    })
})
