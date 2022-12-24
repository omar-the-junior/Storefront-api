"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../models/products");
describe("Model tests for products", () => {
    const store = new products_1.ProductStore();
    describe("Products", function () {
        describe("Products methods functionality", function () {
            beforeAll(async function () {
                this.ProductArray = [
                    await store.create("Sugar", 32, "grocery"),
                    await store.create("Cheese", 30, "diary"),
                    await store.create("salt", 12, "grocery"),
                    await store.create("Milk", 50, "diary"),
                    await store.create("Butter", 60, "diary"),
                    await store.create("Cookies", 23, "sweets"),
                    await store.create("Cream", 42, "diary"),
                ];
            });
            it("Should create a new product", async function () {
                expect(this.ProductArray[0]).toEqual({
                    id: 1,
                    name: "Sugar",
                    price: 32,
                    category: "grocery",
                });
            });
            it("Should show all available products", async function () {
                const availableProducts = await store.index();
                expect(availableProducts).toEqual(this.ProductArray);
            });
            it("Should show a specific product", async function () {
                const availableProducts = await store.show(2);
                expect(availableProducts).toEqual(this.ProductArray[1]);
            });
            it("Should show products by category", async function () {
                const diaryProducts = this.ProductArray.filter((value) => {
                    return value.category === "diary";
                });
                const availableProducts = await store.showProductsByCategory("diary");
                expect(availableProducts).toEqual(diaryProducts);
            });
        });
    });
});
