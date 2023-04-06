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

  it("post /products api endpoint", async () => {
    const response = await request.post("/products").send({
      name: "sua5",
      price: "5000",
      category: "milk",
    }).set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJ2byIsImxhc3RuYW1lIjoiZGluaCIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCRycDl1cDVHTWpvZUN4cnBkSHlnZjdlaGRHN01mSmRVWnZqT2tJbm9mWDVCaDFJUTlrczVDSyJ9LCJpYXQiOjE2ODA3MTA1MjJ9.23qi-qPGZQldy9WhSKocBgrsZVIQbFhL4fpB4msU04Q"
    );
    expect(response.status).toBe(200);
  });
});
