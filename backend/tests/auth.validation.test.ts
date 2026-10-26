import assert from "node:assert/strict";
import test from "node:test";
import {
  validateLoginInput,
  validateRegistrationInput,
} from "../src/utils/auth.validation.js";

test("registration trims and normalizes valid input", () => {
  assert.deepEqual(
    validateRegistrationInput({
      name: "  Ada Lovelace  ",
      email: " ADA@example.com ",
      password: "a-long-password",
    }),
    {
      valid: true,
      value: {
        name: "Ada Lovelace",
        email: "ada@example.com",
        password: "a-long-password",
      },
    },
  );
});

test("registration rejects invalid email and short passwords", () => {
  assert.equal(
    validateRegistrationInput({
      name: "Ada",
      email: "invalid",
      password: "a-long-password",
    }).valid,
    false,
  );
  assert.equal(
    validateRegistrationInput({
      name: "Ada",
      email: "ada@example.com",
      password: "short",
    }).valid,
    false,
  );
});

test("registration enforces the name limit by Unicode characters", () => {
  assert.equal(
    validateRegistrationInput({
      name: "é".repeat(100),
      email: "ada@example.com",
      password: "a-long-password",
    }).valid,
    true,
  );
  assert.equal(
    validateRegistrationInput({
      name: "é".repeat(101),
      email: "ada@example.com",
      password: "a-long-password",
    }).valid,
    false,
  );
});

test("login accepts existing passwords shorter than the registration minimum", () => {
  assert.deepEqual(validateLoginInput({ email: "ada@example.com", password: "old" }), {
    valid: true,
    value: { email: "ada@example.com", password: "old" },
  });
});

test("passwords exceeding bcrypt's byte limit are rejected", () => {
  assert.equal(
    validateRegistrationInput({
      name: "Ada",
      email: "ada@example.com",
      password: "é".repeat(37),
    }).valid,
    false,
  );
});
