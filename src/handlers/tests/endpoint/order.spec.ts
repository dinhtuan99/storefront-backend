import supertest from "supertest";
import app from "../../../server";

const request = supertest(app);
describe("Test order endpoint responses", () => {
  it("post /users/1/orders/current api endpoint", async () => {
    const response = await request.get("/users/1/orders/current");
    expect(response.status).toBe(403);
  });

  it("get /users/1/orders/complete api endpoint", async () => {
    const response = await request.get("/users/1/orders/complete");
    expect(response.status).toBe(403);
  });

  it("post /users/1/orders api endpoint", async () => {
    const response = await request.post("/users/1/orders").send({
      status: "complete",
    });
    expect(response.status).toBe(403);
  });

  it("delete /users/:user_id/orders/:order_id api endpoint", async () => {
    const response = await request.delete("/users/1/orders/1");
    expect(response.status).toBe(403);
  });

  it("delete /users/:user_id/orders/:order_id/products api endpoint", async () => {
    const response = await request.post("/users/1/orders/1/products").send({
      productId: "2",
      quantity: 20,
    });
    expect(response.status).toBe(403);
  });
});
