[![Build Status](https://travis-ci.org/mojo-js/crudlet-mongodb.svg)](https://travis-ci.org/mojo-js/crudlet-mongodb) [![Coverage Status](https://coveralls.io/repos/mojo-js/crudlet-mongodb/badge.svg?branch=master)](https://coveralls.io/r/mojo-js/crudlet-mongodb?branch=master) [![Dependency Status](https://david-dm.org/mojo-js/crudlet-mongodb.svg)](https://david-dm.org/mojo-js/crudlet-mongodb)

Streamable interface for [Mongodb](https://www.mongodb.org/).  Works well with [crudlet](https://github.com/mojo-js/crudlet.js).

#### installation

```
npm install crudlet-mongodb
```

Basic Example:

```javascript
var crudlet = require("crudlet");
var mongodb = require("crudlet-mongodb");

var db = mongodb("mongodb://localhost:27017/crudlet-test");
db(crudlet.op("insert", { data: { name: "blarg"}})).on("data", function() {

});

// streaming operations
crudlet.
open(db).
write(crudlet.op("insert", { data: { name: "abba"}})).
end(crudlet.op("remove", { query: { name: "abba"}}));


// load the entire collection
var stream = db(crudlet.op("load", { multi: true }));

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

creates a local crudelt database

- `options` - options for the local db
  - `name` - name of db (optional)
  - `store` - store to use

#### stream db(operationName, options)

Runs a new operation.

> Note that `options.collection` *must* be present when performing operations. The easiest & probably best way to do this is to create a `child` crudlet db.

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
var peopleDb = crud.child(db, { collection: "people" });

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

Removes a document

```javascript
peopleDb("load", {
  query: { /* mongodb query here */ },
  multi: true, // TRUE if you want to load multiple items
}).on("data", function() {

});
```
