const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../src/models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());

  await User.init();
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Model", () => {
  test("should create a user", async () => {
    const user = await User.create({
      username: "Sandro",
      email: "sandro@gmail.com",
      password: "password123",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("sandro");
    expect(user.email).toBe("sandro@gmail.com");
  });

  test("should require username, email and password", async () => {
    const user = new User({});

    await expect(user.validate()).rejects.toThrow();
  });

  test("should reject invalid email", async () => {
    const user = new User({
      username: "Sandro",
      email: "invalid-email",
      password: "password123",
    });

    await expect(user.validate()).rejects.toThrow();
  });

  test("should reject invalid role", async () => {
    const user = new User({
      username: "Sandro",
      email: "sandro@gmail.com",
      password: "password123",
      role: "admin",
    });

    await expect(user.validate()).rejects.toThrow();
  });

  test("should set default values", async () => {
    const user = await User.create({
      username: "Sandro",
      email: "sandro@gmail.com",
      password: "password123",
    });

    expect(user.role).toBe("user");
    expect(user.isActive).toBe(true);
  });

  test("should hash password before saving", async () => {
    const user = await User.create({
      username: "Sandro",
      email: "sandro@gmail.com",
      password: "password123",
    });

    expect(user.password).not.toBe("password123");
  });

  test("should compare passwords correctly", async () => {
    const user = await User.create({
      username: "Sandro",
      email: "sandro@gmail.com",
      password: "password123",
    });

    expect(await user.comparePassword("password123")).toBe(true);
    expect(await user.comparePassword("wrongpassword")).toBe(false);
  });

  test("should reject duplicate emails", async () => {
    await User.create({
      username: "Sandro",
      email: "sandro@gmail.com",
      password: "password123",
    });

    await expect(
      User.create({
        username: "Another",
        email: "sandro@gmail.com",
        password: "password123",
      }),
    ).rejects.toMatchObject({
      code: 11000,
    });
  });
});
