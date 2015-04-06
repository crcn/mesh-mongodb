[![Build Status](https://travis-ci.org/mojo-js/crudlet-mongodb.svg)](https://travis-ci.org/mojo-js/crudlet-mongodb) [![Coverage Status](https://coveralls.io/repos/mojo-js/crudlet-mongodb/badge.svg?branch=master)](https://coveralls.io/r/mojo-js/crudlet-mongodb?branch=master) [![Dependency Status](https://david-dm.org/mojo-js/crudlet-mongodb.svg)](https://david-dm.org/mojo-js/crudlet-mongodb)

Streamable [Mongodb](https://www.mongodb.org/) library. Works well with [crudlet](https://github.com/mojo-js/crudlet.js).

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

runs an operation

- `operation` - operation to run can be: `insert`, `remove`, `update`, or `load`
- `options` - operation specific options

insert options:

- `data` - data to insert. Can be an object, or an array to insert multiple

remove options:

- `query` - mongodb search query
- `multi` - TRUE if you want to remove multiple items (false by default)

update options:

- `query` - mongodb search query
- `multi` - TRUE if you want to update multiple items (false by default)
- `data` - data to set - this is merged with existing data

load options:

- `query` - mongodb search query
- `multi` - TRUE if you want to load multiple items (one by default)
