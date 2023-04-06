import supertest from "supertest";
import app from "../../../server";

let token = "";
const request = supertest(app);

describe("Test order endpoint responses", () => {
  beforeAll(async () => {
    const responseToken = await request.post("/users").send({
      firstName: "tuan",
      lastName: "tuan",
      password: "suon",
    });
    token = responseToken.body;
    await request.post("/products").send({
      name: "sua5",
      price: "5000",
      category: "milk",
    }).set("Authorization", "Bearer " + token);
  });
  it("get /users/1/orders/current api endpoint", async () => {
    const response = await request
      .get("/users/1/orders/current")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("get /users/1/orders/complete api endpoint", async () => {
    const response = await request
      .get("/users/1/orders/complete")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("post /users/1/orders api endpoint", async () => {
    const response = await request
      .post("/users/1/orders")
      .send({
        status: "active",
      })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("delete /users/1/orders/2 api endpoint", async () => {
    const response = await request.delete("/users/1/orders/2").set(
      "Authorization",
      `Bearer ${token}`
    );
    expect(response.status).toBe(200);
  });

  it("post /users/1/orders/1/products api endpoint", async () => {
    const response = await request.post("/users/1/orders/1/products").send({
      productId: "1",
      quantity: 20,
    }).set(
      "Authorization",
      `Bearer ${token}`
    );
    expect(response.status).toBe(200);
  });
});
