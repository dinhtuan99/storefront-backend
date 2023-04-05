import supertest from "supertest";
import app from "../../../server";

const request = supertest(app);
describe("Test products endpoint responses", () => {
  it("get /products api endpoint", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("get /products/1 api endpoint", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });

  it("get /products api endpoint", async () => {
    const response = await request.post("/products").send({
      name: "sua5",
      price: "5000",
      category: "milk",
    });
    expect(response.status).toBe(403);
  });
});
