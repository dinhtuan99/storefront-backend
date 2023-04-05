import { OrderStore } from "../order.model";
import { ProductStore } from "../product.model";
import { UserStore } from "../user.model";

const store = new OrderStore();

describe("Order Model", () => {
  beforeAll(async () => {
    const userStore = new UserStore();
    await userStore.create({
      firstname: "vo",
      lastname: "dinh",
      password: "suon",
    });

    const productStore = new ProductStore();
    await productStore.create({
      name: "bimbim",
      price: 1000,
      category: "snack",
    });
  });
  it("create method should add a order", async () => {
    const result = await store.createOrder({
      user_id: 1,
      status: "active",
    });

    expect(result.user_id).toEqual(1);
  });

  it("index method should return a list of order", async () => {
    const result = await store.getOrders();
    expect(result.length).toEqual(1);
  });

  it("index method should return a order by user id", async () => {
    const result = await store.getOrdersByUserId(1);
    expect(result.user_id).toEqual(1);
  });

  it("index method should return a current order by user id", async () => {
    const result = await store.getCurrentOrdersByUserId(1);
    expect(result.user_id).toEqual(1);
  });

  it("index method should return a complete order by user id", async () => {
    await store.createOrder({
      user_id: 1,
      status: "complete",
    });
    const result = await store.getCompleteOrdersByUserId(1);
    expect(result.length).toEqual(1);
  });

  it("index method should delete a order by id", async () => {
    const result = await store.deleteOrder(2);
    expect(result.status).toEqual("complete");
  });

  it("index method should add product to a order", async () => {
    const result = await store.addProduct(20, 1, 1);
    expect(result.quantity).toEqual(20);
  });
});
