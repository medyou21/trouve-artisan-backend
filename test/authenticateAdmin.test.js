const test = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");
const authenticateAdmin = require("../src/middleware/authenticateAdmin");

process.env.JWT_SECRET = "test-secret-long-enough-for-unit-tests";

function responseRecorder() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
}

test("refuse une requête sans jeton", () => {
  const res = responseRecorder();
  authenticateAdmin({ get: () => "" }, res, () => assert.fail("next ne doit pas être appelé"));
  assert.equal(res.statusCode, 401);
});

test("refuse un utilisateur sans rôle admin", () => {
  const token = jwt.sign({ role: "user" }, process.env.JWT_SECRET);
  const res = responseRecorder();
  authenticateAdmin({ get: () => `Bearer ${token}` }, res, () => assert.fail("next ne doit pas être appelé"));
  assert.equal(res.statusCode, 403);
});

test("autorise un administrateur authentifié", () => {
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET);
  const req = { get: () => `Bearer ${token}` };
  const res = responseRecorder();
  let called = false;
  authenticateAdmin(req, res, () => { called = true; });
  assert.equal(called, true);
  assert.equal(req.user.role, "admin");
});
