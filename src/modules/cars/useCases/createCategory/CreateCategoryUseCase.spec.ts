describe("Create category", () => {
    it("Should be sum of 2 + 2 is equals to 4", () => {
        const sum = 2 + 2;
        const result = 4;

        expect(sum).toBe(result);
    });

    it("Should be sum of 2 + 2 not equals to 5", () => {
        const sum = 2 + 2;
        const result = 5;

        expect(sum).not.toBe(result);
    });
});
