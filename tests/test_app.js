/**
 * Load test dependencies
 */
// Randomize port before requirements for all tests
process.env.ADDRESS = "127.0.0.1";
process.env.PORT = (Math.floor(Math.random() * 60000) + 1024);
process.env.MUTE_LOGGER = "true";
process.env.MESSAGE = "Testing";

// Load dependencies
const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const assert = require("assert");
const app = require("../app");

/**
 * Test routes
 */
let healthRoute = "/health";
describe("/health", function() {
  it("should return with a status 200", function() {
    return request(app)
      .get(healthRoute)
      .then(function(res) {
        assert.equal(res.status, 200);
      });
  });

  it("should return expected values", function() {
    return request(app)
      .get(healthRoute)
      .then(function(res) {
        expect(res.text).to.equal('{"status":"OK"}');
      });
  });
});

/**
 * Test error handling
 */
let route404 = "/404";
describe("error handling", function() {
  it("should respond with status 404 with a not found message", function() {
    return request(app)
      .get(route404)
      .then(function(res) {
        assert.equal(res.status, 404);
        expect(res.text).to.equal('{"message":"Not Found"}');
      });
  });
});

let routeIndex = "/";
describe("index", function() {
  it("should return with a status 200", function() {
    return request(app)
      .get(routeIndex)
      .then(function(res) {
        assert.equal(res.status, 200);
      });
  });

  it("should return expected values", function() {
    return request(app)
      .get(routeIndex)
      .then(function(res) {
        expect(res.text).to.equal(process.env.MESSAGE);
      });
  });

  let pathMessage = "foo";
  it("should echo the sent path with /foo", function() {
    return request(app)
      .get(routeIndex + pathMessage)
      .then(function(res) {
        expect(res.text).to.equal(pathMessage)
      });
  });

  let queryMessage = "bar";
  it("should echo the sent querystring with ?message=bar", function() {
    return request(app)
      .get(routeIndex + "?message=" + queryMessage)
      .then(function(res) {
        expect(res.text).to.equal(queryMessage)
      });
  });
});
