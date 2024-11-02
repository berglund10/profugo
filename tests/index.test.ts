import test from "node:test";
import request from "supertest";
import { createApp } from "../src/app";
import { deepEqual } from "node:assert/strict";

test("GET /status", async () => {

    const app = createApp();

    const result = await request(app).get("/status");

    deepEqual(result.status, 200)
    deepEqual(result.body, {message : "Ready"});
})

test("GET /api/v1/register", async () => {

    const app = createApp();

    const result = await request(app).get("/api/v1/register");

    deepEqual(result.status, 200)
    deepEqual(result.body, []);
})
test("POST /api/v1/register", async () => {

    const app = createApp();

    const result = await request(app).post("/api/v1/register").send({name: "Anton", personalNumber: "19921027", city: "Stockholm"});


    deepEqual(result.status, 201)
})
test("GET /api/v1/register/:id", async () => {

    const app = createApp();

    const result = await request(app).get("/api/v1/register/1");

    deepEqual(result.status, 200)
})
test("DELETE /api/v1/register", async () => {

    const app = createApp();

    const result = await request(app).delete("/api/v1/register/1");

    deepEqual(result.status, 200)
})

test("PATCH /api/v1/register", async () => {

    const app = createApp();

    const result = await request(app).patch("/api/v1/register/1").send({city: "Södertälje"});

    deepEqual(result.status, 200)
})