[![Build Status](https://travis-ci.org/mojo-js/mesh-mongodb.svg)](https://travis-ci.org/mojo-js/mesh-mongodb) [![Coverage Status](https://coveralls.io/repos/mojo-js/mesh-mongodb/badge.svg?branch=master)](https://coveralls.io/r/mojo-js/mesh-mongodb?branch=master) [![Dependency Status](https://david-dm.org/mojo-js/mesh-mongodb.svg)](https://david-dm.org/mojo-js/mesh-mongodb)


mesh-mongodb is a streamable interface for the [Mongodb](https://www.mongodb.org/) library. See additional operation documentation here: http://meshjs.herokuapp.com/docs/database-adapters.

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
```


#### db mongodb(host)

creates a local meshelt database

- `options` - options for the local db
  - `name` - name of db (optional)
  - `store` - store to use
