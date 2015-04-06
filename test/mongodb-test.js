var mesh    = require("mesh");
var mongodb = require("../");
var _       = require("highland");
var expect  = require("expect.js");

describe(__filename + "#", function() {

  var db;

  it("can be created", function(next) {
    db = mongodb("mongodb://localhost:27017/mesh-test");
    db.adapter.once("connect", next);
  });

  after(function() {
    db.adapter.target.dropDatabase();
  });

  it("returns an error if a collection is not provided", function(next) {
    db(mesh.op("insert")).on("error", function(err) {
      next();
    });
  });

  it("ignores operations that are not supported", function(next) {
    db(mesh.op("afdfsfsd", { collection: "people", data: { name: "a"}})).on("end", function() {
      next();
    });
  });

  it("can insert an item", function(next) {
    db(mesh.op("insert", { collection: "people", data: { name: "a"}})).on("data", function(data) {
      expect(data._id).not.to.be(void 0);
      expect(data.name).to.be("a");
      next();
    });
  });

  it("can insert multiple items", function(next) {
    db(mesh.op("insert", {
      collection: "people",
      data: [{ name: "a" }, { name: "b" }]
    })).
    pipe(_.pipeline(_.collect)).
    on("data", function(items) {
      expect(items[0]._id).not.to.be(void 0);
      expect(items[1]._id).not.to.be(void 0);
      next();
    });
  });

  describe("with data", function() {

    var cdb;

    beforeEach(function(next) {
      cdb = mesh.child(db, { collection: "people" });
      cdb(mesh.op("insert", {
        data: [{ name: "a" }, { name: "b"}]
      })).on("end", next);
    });

    it("can load one item", function(next) {
      cdb(mesh.op("load", {
        query: { name: "a" }
      })).on("data", function(data) {
        expect(data.name).to.be("a");
        expect(data._id).not.to.be(void 0);
        next();
      });
    });

    it("can load multiple items", function(next) {
      cdb(mesh.op("load", {
        query: { name: /a|b/ },
        multi: true
      })).
      pipe(_.pipeline(_.collect)).
      on("data", function(items) {
        expect(items.length).not.to.be(1);
        expect(items[0].name).to.be("a");
        next();
      });
    });

    it("can remove an item", function(next) {
      cdb(mesh.op("remove", {
        query: { name: "a" }
      })).on("end", function() {
        next();
      });
    });

    it("can remove many items item", function(next) {
      cdb(mesh.op("remove", {
        query: { name: "a" },
        multi: true
      })).on("end", function() {
        next();
      });
    });

    it("can update one item", function(next) {
      cdb(mesh.op("update", {
        query: { name: "a" },
        data: { name: "b" }
      })).on("end", function() {
        next();
      });
    });

    it("can update many items", function(next) {
      cdb(mesh.op("update", {
        query: { name: "a" },
        data: { name: "b" },
        multi: true
      })).on("end", function() {
        next();
      });
    });
  });
});
