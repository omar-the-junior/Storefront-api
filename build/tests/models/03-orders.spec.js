"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
describe("Model tests for orders", () => {
    const store = new orders_1.OrderStore();
    describe("Check if all methods work as expected", () => {
        beforeAll(async function () {
            this.orders = [
                await store.create([
                    { id: 1, product_quantity: 3 },
                    { id: 2, product_quantity: 5 },
                    { id: 3, product_quantity: 6 },
                ], 1, "active"),
                await store.create([
                    { id: 5, product_quantity: 5 },
                    { id: 4, product_quantity: 7 },
                    { id: 3, product_quantity: 8 },
                ], 1, "complete"),
                await store.create([
                    { id: 4, product_quantity: 4 },
                    { id: 3, product_quantity: 3 },
                    { id: 2, product_quantity: 62 },
                ], 1, "active"),
            ];
        });
        it("Should create a new order", async function () {
            console.log(this.orders[0].products[0]);
            expect(this.orders[0].products[0]).toEqual({
                id: 1,
                order_id: 1,
                product_id: 1,
                product_quantity: 3,
            });
        });
        it("should return current orders", async function () {
            const currentOrders = await store.currentOrder(1);
            expect(currentOrders[0].status).toMatch("active");
            expect(currentOrders[1].status).toMatch("active");
        });
        it("should return current orders", async function () {
            const currentOrders = await store.completedOrders(1);
            expect(currentOrders[0].status).toMatch("complete");
        });
    });
});
