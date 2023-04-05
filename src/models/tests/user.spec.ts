import { UserStore } from "../user.model";

const store = new UserStore();

describe("User Model", () => {
  it("create method should add a user", async () => {
    const result = await store.create({
      firstname: "vo",
      lastname: "dinh",
      password: "suon",
    });
    
    expect(result.firstname).toEqual("vo");
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result.length).toEqual(3);
  });

  it("show method should return the correct users", async () => {
    await store.create({
        firstname: "vo",
        lastname: "dinh",
        password: "suon",
      });
    const result = await store.show(1);
    expect(result.firstname).toEqual("vo");
  });
});
