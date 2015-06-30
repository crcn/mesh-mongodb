var mesh    = require("mesh");
var mongodb = require("../");
var _       = require("highland");
var expect  = require("expect.js");
var createTestCases = require("mesh/test/cases/database");

describe(__filename + "#", function() {

  var db;

  before(function() {
    db = mongodb("mongodb://localhost:27017/mesh-test");
  });

  afterEach(function() {
    db.adapter.target.dropDatabase();
  });

  var cases = createTestCases(function() {
    return db;
  });

  for (var name in cases) it(name, cases[name]);
});
