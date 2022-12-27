import { OrderStore, Order, OrderProduct } from "../../models/orders";

describe("Model tests for orders", () => {
  const store = new OrderStore();

  describe("Check if all methods work as expected", () => {
    type CreatedOrder = {
      orders: Order[];
    };
    beforeAll(async function (this: CreatedOrder) {
      this.orders = [
        await store.create(
          [
            { id: 1, product_quantity: 3 },
            { id: 2, product_quantity: 5 },
            { id: 3, product_quantity: 6 },
          ],
          1,
          "active"
        ),
        await store.create(
          [
            { id: 5, product_quantity: 5 },
            { id: 4, product_quantity: 7 },
            { id: 3, product_quantity: 8 },
          ],
          1,
          "complete"
        ),
        await store.create(
          [
            { id: 4, product_quantity: 4 },
            { id: 3, product_quantity: 3 },
            { id: 2, product_quantity: 62 },
          ],
          1,
          "active"
        ),
      ];
    });
    it("Should create a new order", async function (this: CreatedOrder) {
      expect(this.orders[0].products[0]).toEqual({
        id: 1,
        order_id: 1,
        product_id: 1,
        product_quantity: 3,
      });
    });
    it("should return current orders", async function (this: CreatedOrder) {
      const currentOrders = await store.currentOrder(1);

      expect(currentOrders[0].status).toMatch("active");
      expect(currentOrders[1].status).toMatch("active");
    });
    it("should return current orders", async function (this: CreatedOrder) {
      const currentOrders = await store.completedOrders(1);

      expect(currentOrders[0].status).toMatch("complete");
    });
  });
});
