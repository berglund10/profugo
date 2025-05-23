import test from "node:test";
import request from "supertest";
import { createApp } from "../app";
import { deepEqual } from "node:assert/strict";

test("GET /status", async () => {
  const app = createApp();

  const result = await request(app).get("/status");

  deepEqual(result.status, 200);
  deepEqual(result.body, { message: "Ready" });
});

test("GET /api/v1/registration", async () => {
  const app = createApp();

  const result = await request(app).get("/api/v1/registration");

  deepEqual(result.status, 200);
});
test("POST /api/v1/registration", async () => {
  const app = createApp();

  const result = await request(app).post("/api/v1/registration").send({
    name: "Anton",
    personalNumber: "19921027-0196",
    city: "Stockholm",
  });

  deepEqual(result.status, 201);
});

test("POST /api/v1/registration", async () => {
  const app = createApp();

  const result = await request(app).post("/api/v1/registration").send({
    name: "Bosse",
    personalNumber: "19640823-3234",
    city: "Göteborg",
  });
  deepEqual(result.body.error, "Person already in database");
});
test("GET /api/v1/registration:id", async () => {
  const app = createApp();

  const result = await request(app).get("/api/v1/registration/1");

  deepEqual(result.status, 200);
});
test("DELETE /api/v1/registration", async () => {
  const app = createApp();

  const result = await request(app).delete("/api/v1/registration/1");

  deepEqual(result.status, 200);
});

test("PUT /api/v1/registration", async () => {
  const app = createApp();

  const result = await request(app)
    .put("/api/v1/registration/1")
    .send({ city: "Stockholm" });

  deepEqual(result.status, 200);
});
