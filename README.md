[![Build Status](https://travis-ci.org/mojo-js/mesh-mongodb.svg)](https://travis-ci.org/mojo-js/mesh-mongodb) [![Coverage Status](https://coveralls.io/repos/mojo-js/mesh-mongodb/badge.svg?branch=master)](https://coveralls.io/r/mojo-js/mesh-mongodb?branch=master) [![Dependency Status](https://david-dm.org/mojo-js/mesh-mongodb.svg)](https://david-dm.org/mojo-js/mesh-mongodb)


mesh-mongodb is a streamable interface for the [Mongodb](https://www.mongodb.org/) library. Works well with [mesh](https://github.com/mojo-js/mesh.js), along with other libraries such as [mesh-socket.io](https://github.com/mojo-js/mesh-socket.io).

#### installation

```
npm install mesh-mongodb
```

Basic Example:

```javascript
var mesh = require("mesh");
var mongodb = require("mesh-mongodb");

var db = mongodb("mongodb://localhost:27017/mesh-test");
db(mesh.op("insert", { data: { name: "blarg"}})).on("data", function() {

});

// streaming operations
mesh.
open(db).
write(mesh.op("insert", { data: { name: "abba"}})).
end(mesh.op("remove", { query: { name: "abba"}}));


// load the entire collection
var stream = db(mesh.op("load", { multi: true }));

stream.on("data", function(data) {
  // handle cursor data
});

stream.on("end", function() {
  // end load
});

// pause the mongodb cursor
stream.pause();

```


#### db mongodb(host)

creates a local meshelt database

- `options` - options for the local db
  - `name` - name of db (optional)
  - `store` - store to use

#### stream db(operationName, options)

Runs a new operation.

> Note that `options.collection` *must* be present when performing operations. The easiest & probably best way to do this is to create a `child` mesh db.

```javascript
// remove all people where ages are greater than zero
db("remove", {
  collection: "people",
  query: {
    age: { $gt: 0 }
  }
}).on("data", function() {

});
```

#### insert

Insert operation.

```javascript
var peopleDb = mesh.child(db, { collection: "people" });

// insert multiple
peopleDb("insert", { data: [{ name: "john"}, { name: "matt" }]}).on("data", function() {
  // this is called twice.
});
```

#### update

Update operation.

```javascript
peopleDb("update", {
  query: { /* mongodb query here */ },
  data: { /* data to update*/ },
  multi: true // TRUE if you want to update multiple items
}).on("data", function() {
  // emits updated documents
});
```

#### remove

Removes a document

```javascript
peopleDb("remove", {
  query: { /* mongodb query here */ },
  data: { /* data to update*/ },
  multi: true, // TRUE if you want to remove multiple items
}).on("end", function() {

});
```

#### load

Loads a document.

```javascript
var stream = peopleDb("load", {
  query: { /* mongodb query here */ },
  multi: true, // TRUE if you want to load multiple items
}).on("data", function() {

});

// pause the cursor
stream.pause();
```
