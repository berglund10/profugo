import test from "node:test";
import { deepEqual } from "node:assert/strict";
import { isValidLuhn } from "../logic/luhnLogic";

test("empty string should return false", () => {
  const result = isValidLuhn("");
  deepEqual(result, false);
});

test("input can't contain letters", () => {
  const result = isValidLuhn("1992f1027-0196");
  deepEqual(result, false);
});

test("input can't contain more than 12 digits", () => {
  const result = isValidLuhn("199219921027-0196");
  deepEqual(result, false);
});

test("input can't contain less than 12 digits", () => {
  const result = isValidLuhn("9921027-0196");
  deepEqual(result, false);
});

test("input can contain - sign and be valid", () => {
  const result = isValidLuhn("19921027-0196");
  deepEqual(result, true);
});

test("input with multiple -- should return false", () => {
  const result = isValidLuhn("19921027--0196");
  deepEqual(result, false);
});

test("input can just contain 12 digits and be valid", () => {
  const result = isValidLuhn("199210270196");
  deepEqual(result, true);
});

test("test personalnumber after 2000", () => {
  const result = isValidLuhn("20040101-1234");
  deepEqual(result, true);
});

test("test personalnumber after 2000", () => {
  const result = isValidLuhn("20040101-1235");
  deepEqual(result, false);
});

test("input with invalid number should return false", () => {
  const result = isValidLuhn("19921027-0197");
  deepEqual(result, false);
});

test("input correct personalNumber shoud be true", () => {
  const result = isValidLuhn("196408233234");
  deepEqual(result, true);
});

test("input correct personalNumber shoud be true", () => {
  const result = isValidLuhn("196209186672");
  deepEqual(result, true);
});

test("input incorrect personalNumber should be false", () => {
  const result = isValidLuhn("199292920195");
  deepEqual(result, false);
});

test("input incorrect personalNumber should be false", () => {
  const result = isValidLuhn("11111111-1111");
  deepEqual(result, false);
});
