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