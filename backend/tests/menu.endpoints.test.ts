import { test, describe, before, after } from "node:test";
import assert from "assert";
import request from "supertest";
import { prisma } from "@/config/prisma";
import { createApp } from "@/app";

const app = createApp();

let token: string;

before(async () => {
  await request(app).post("/api/v1/auth/sign-up/email").send({
    email: "test@test.com",
    password: "password123",
    name: "Test User",
    rememberMe: false,
  });

  const res = await request(app).post("/api/v1/auth/sign-in/email").send({
    email: "test@test.com",
    password: "password123",
    rememberMe: false,
  });

  token = res.body.token;
});

after(async () => {
  await prisma.$disconnect();
});

describe("Test categories", () => {
  let categoryId: string;

  after(async () => {
    await prisma.category.deleteMany({
      where: { name: { in: ["Coffee", "Coffee Updated"] } },
    });
  });

  test("POST /categories Create a new category", async () => {
    const res = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Coffee" });

    assert.equal(res.status, 201, res.text);
    assert.ok(res.body.id, "The response doesn't have id");

    categoryId = res.body.id;
  });

  test("GET /categories Get all categories", async () => {
    const res = await request(app).get("/api/v1/categories");

    assert.equal(res.status, 200);
  });

  test("PATCH /categories/:id Update category", async () => {
    const res = await request(app)
      .patch(`/api/v1/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Coffee Updated" });

    assert.equal(res.status, 200);
  });

  test("DELETE /categories/:id Delete category", async () => {
    const res = await request(app)
      .delete(`/api/v1/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);

    assert.equal(res.status, 204);
  });
});

describe("Test products", () => {
  let categoryId: string;
  let productId: string;

  before(async () => {
    const res = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Icecream" });

    categoryId = res.body.id;

    if (!categoryId) {
      throw new Error(
        `No se pudo crear la categoría de test: ${JSON.stringify(res.body)}`,
      );
    }
  });

  after(async () => {
    await prisma.product.deleteMany({
      where: { title: { in: ["Generic Icecream", "Icecream"] } },
    });

    await prisma.category.deleteMany({
      where: { name: "Icecream" },
    });
  });

  test("POST /products Create product", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        categoryId: categoryId,
        title: "Generic Icecream",
        description: "A delicious icecream",
        price: 4000,
      });

    assert.equal(res.status, 201, res.text);
    assert.ok(res.body.id, "The response doesn't have id");

    productId = res.body.id;
  });

  test("GET /products List products", async () => {
    const res = await request(app).get("/api/v1/products");
    assert.equal(res.status, 200);
  });

  test("PATCH /products/:id Update product", async () => {
    const res = await request(app)
      .patch(`/api/v1/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Icecream" });

    assert.equal(res.status, 200);
  });

  test("DELETE /products/:id Delete product", async () => {
    const res = await request(app)
      .delete(`/api/v1/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    assert.equal(res.status, 204);
  });
});
