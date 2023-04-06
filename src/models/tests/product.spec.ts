import { ProductStore } from "../product.model";

const store = new ProductStore();

describe("Product  Model", () => {
  it("create method should add a product", async () => {
    const result = await store.create({
      name: "bimbim",
      price: 1000,
      category: "snack",
    });
    expect(result.name).toEqual("bimbim");
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result.length).toEqual(4);
  });

  it("show method should return the correct products", async () => {
    const result = await store.show(1);
    expect(result.name).toEqual("sua5");
  });
});
