import assert from "node:assert/strict";
import test from "node:test";
import { isRequestBody, isUuid } from "../src/utils/request.validation.js";

test("UUID validation accepts canonical UUIDs and rejects malformed IDs", () => {
  assert.equal(isUuid("550e8400-e29b-41d4-a716-446655440000"), true);
  assert.equal(isUuid("not-a-uuid"), false);
  assert.equal(isUuid(undefined), false);
});

test("request body validation accepts plain object payloads only", () => {
  assert.equal(isRequestBody({ name: "board" }), true);
  assert.equal(isRequestBody(null), false);
  assert.equal(isRequestBody(["board"]), false);
  assert.equal(isRequestBody("board"), false);
});
